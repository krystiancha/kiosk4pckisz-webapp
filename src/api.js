import moment from 'moment';
import axios from '@/axios';

export class Movie {
  static fromJson(obj) {
    const movie = new Movie();

    ['id', 'title', 'description', 'poster', 'production', 'genre']
      .forEach((field) => { movie[field] = obj[field]; });

    movie.duration = `${moment.duration(obj.duration).asMinutes()} min`;

    return movie;
  }
}

export class Show {
  static fromJson(obj) {
    const show = new Show();

    ['id', 'movie']
      .forEach((field) => { show[field] = obj[field]; });

    show.start = new Date(obj.start);
    show.end = new Date(obj.end);

    show.startf = Show.datef(show.start);

    return show;
  }

  static datef(date) {
    return {
      time: moment(date).format('H:mm'),
      date: moment(date).format('Do MMM'),
    };
  }
}

export default {
  PENDING: 0,
  SUCCESS: 1,
  ERROR: 2,
  state: 0,
  movies: [],
  shows: [],
  fetch() {
    axios.get()
      .then((response) => {
        this.state = this.SUCCESS;
        this.movies = response.data.movies.map(movie => Movie.fromJson(movie));
        this.shows = response.data.shows.map(show => Show.fromJson(show));
        this.scheduleUpdates();
      })
      .catch(() => {
        this.state = this.ERROR;
        setTimeout(() => { this.fetch(); }, 10000);
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
