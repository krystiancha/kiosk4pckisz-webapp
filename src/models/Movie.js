import moment from 'moment';

export default class Movie {
  static fromJson(obj) {
    const movie = new Movie();

    ['id', 'title', 'description', 'poster', 'production', 'genre']
      .forEach((field) => { movie[field] = obj[field]; });

    movie.duration = `${moment.duration(obj.duration).asMinutes()} min`;

    return movie;
  }
}
