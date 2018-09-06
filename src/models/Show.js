export default class Show {
  static fromJson(obj) {
    const show = new Show();

    ['id', 'movie']
      .forEach((field) => { show[field] = obj[field]; });

    show.start = new Date(obj.start);
    show.end = new Date(obj.end);

    show.timeleft = '';

    return show;
  }
}
