const simplify = str => str
  .toLowerCase()
  .split('')
  .map((char) => {
    if (char === 'ą') {
      return 'a';
    } else if (char === 'ć') {
      return 'c';
    } else if (char === 'ę') {
      return 'e';
    } else if (char === 'ł') {
      return 'l';
    } else if (char === 'ń') {
      return 'n';
    } else if (char === 'ó') {
      return 'o';
    } else if (char === 'ś') {
      return 's';
    } else if (char === 'ź') {
      return 'z';
    } else if (char === 'ż') return 'z';
    return char;
  })
  .join('');

export default {
  simplify,
};
