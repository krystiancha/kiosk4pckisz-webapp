export default class Show {
  static fromJson(obj) {
    const show = new Show();

    ['id', 'movie', 'meeting', 'premiere']
      .forEach((field) => { show[field] = obj[field]; });

    show.start = new Date(obj.start);
    show.end = new Date(obj.end);

    return show;
  }

  fillInMovie(movies) {
    this.movieObj = movies.find(movie => movie.id === this.movie);
  }
}
