import dayjs from 'dayjs';
import axios from '@/axios';
import utilities from './utilities';

class Movie {
  static fromJson(obj) {
    const movie = new Movie();

    ['id', 'title', 'description', 'poster', 'production', 'genre']
      .forEach((field) => { movie[field] = obj[field]; });

    movie.duration = `${utilities.minutes(obj.duration)} min`;

    return movie;
  }
}

class Show {
  static fromJson(obj) {
    const show = new Show();

    ['id', 'movie', 'theater']
      .forEach((field) => { show[field] = obj[field]; });

    show.start = new Date(obj.start);
    show.end = new Date(obj.end);

    show.startf = Show.datef(show.start);

    return show;
  }

  static datef(date) {
    return {
      time: dayjs(date).format('H:mm'),
      date: dayjs(date).format('D. MMM'),
    };
  }
}

export default {
  PENDING: 0,
  SUCCESS: 1,
  ERROR: 2,
  UPDATE_ERROR: 3,
  errorMsg: '',
  Show,
  Movie,
  state: 0,
  movies: [],
  shows: [],
  now: new Date(),
  lastUpdate: new Date(0),
  updateTimes: [
    new Date(0, 0, 0, 8, 0),
    new Date(0, 0, 0, 12, 0),
    new Date(0, 0, 0, 16, 0),
  ],
  startClock() {
    setInterval(() => { this.now = new Date(); }, 60000);
  },
  isUpdateNeeded() {
    const lastTime = new Date(
      0, 0, 0,
      this.lastUpdate.getHours(), this.lastUpdate.getMinutes(), this.lastUpdate.getSeconds(),
    );
    const currentTime = new Date(
      0, 0, 0, this.now.getHours(), this.now.getMinutes(), this.now.getSeconds(),
    );

    let lastPosition = 0;
    let currentPosition = 0;

    this.updateTimes.forEach((time) => {
      if (lastTime >= time) {
        lastPosition += 1;
      }
      if (currentTime >= time) {
        currentPosition += 1;
      }
    });

    return lastPosition !== currentPosition;
  },
  conditionalFetch() {
    if (this.isUpdateNeeded() && this.state === this.SUCCESS) {
      this.fetch();
    }
  },
  fetch() {
    axios.get()
      .then((response) => {
        const oldState = this.state;
        this.state = this.SUCCESS;
        this.lastUpdate = new Date();
        this.movies = response.data.movies.map(movie => Movie.fromJson(movie));
        this.shows = response.data.shows.map(show => Show.fromJson(show));
        if (oldState === this.PENDING) {
          this.scheduleUpdates();
        }
      })
      .catch((error) => {
        if (this.state === this.PENDING) {
          this.state = this.ERROR;
        } else if (this.state === this.SUCCESS) {
          this.state = this.UPDATE_ERROR;
        }
        this.errorMsg = error.message;
        if (this.state === this.ERROR) {
          setTimeout(() => { this.fetch(); }, 10000);
        }
      });
  },
  update() {
    const now = new Date();

    let toRemove = 0;
    this.shows.some((show) => {
      if (show.end <= now) {
        toRemove += 1;
        return false;
      }
      return true;
    });
    this.shows.splice(0, toRemove);

    this.movies = this.movies.reduce((movies, movie) => {
      if (this.shows.find(show => show.movie.id === movie.id)) {
        movies.push(movie);
      }
      return movies;
    }, []);
  },
  scheduleUpdates() {
    if (this.shows.length === 0) {
      return;
    }
    this.update();
    setTimeout(() => { this.scheduleUpdates(); }, this.shows[0].end - (new Date()));
  },
};
