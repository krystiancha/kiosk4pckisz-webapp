export default class Movie {
  static fromJson(obj) {
    const movie = new Movie();

    ['id', 'title', 'description', 'poster', 'production', 'genre']
      .forEach((field) => { movie[field] = obj[field]; });

    movie.duration = new Date(obj.duration);

    return movie;
  }
}
