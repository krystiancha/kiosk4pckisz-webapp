const simplify = str => str
  .toLowerCase()
  .split('')
  .map((char) => {
    if (char === 'ą') {
      return 'a';
    } if (char === 'ć') {
      return 'c';
    } if (char === 'ę') {
      return 'e';
    } if (char === 'ł') {
      return 'l';
    } if (char === 'ń') {
      return 'n';
    } if (char === 'ó') {
      return 'o';
    } if (char === 'ś') {
      return 's';
    } if (char === 'ź') {
      return 'z';
    } if (char === 'ż') return 'z';
    return char;
  })
  .join('');

const isSameDay = (a, b) => a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();

const minutes = (timeString) => {
  const time = timeString.split(':');
  if (time.length === 3 || time.length === 2) {
    return +time[0] * 60 + +time[1];
  }
  if (time.length === 1) {
    return +time[0];
  }
  return 0;
};

export default {
  simplify,
  isSameDay,
  minutes,
};
