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

export default {
  simplify,
};
