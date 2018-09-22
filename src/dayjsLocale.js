import dayjs from 'dayjs';

const locale = {
  name: 'pl',
  weekdays: 'Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota'.split('_'),
  weekdaysMin: 'Ni_Pn_Wt_Śr_Czw_Pt_Sb'.split('_'),
  months: 'Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień'.split('_'),
  ordinal: n => `${n}.`,
  relativeTime: {
    future: 'za %s',
    past: '%s temu',
    s: 'kilka sekund',
    m: 'minutę',
    mm: '%d minut',
    h: 'godzinę',
    hh: '%d godzin',
    d: 'jeden dzień',
    dd: '%d dni',
    M: 'miesiąc',
    MM: '%d miesięcy',
    y: 'rok',
    yy: '%d lat',
  },
};

dayjs.locale(locale, null, true);

export default locale;
