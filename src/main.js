import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCamera,
  faFilm,
  faHandshake,
  faHourglassHalf,
  faInfoCircle,
  faNewspaper,
  faPaintBrush,
  faStar,
  faGlobeAmericas,
  faList,
  faStopwatch,
  faArrowLeft,
  faCalendar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import IdleVue from 'idle-vue';
import App from './App.vue';
import './main.scss';
import router from './router';
import './registerServiceWorker';

library.add(
  faCamera, faFilm, faHandshake, faHourglassHalf, faInfoCircle, faNewspaper, faPaintBrush, faStar,
  faGlobeAmericas, faList, faStopwatch,
  faArrowLeft, faCalendar, faClock,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

moment.locale('pl');

const options = {
  eventEmitter: new Vue(),
  idleTime: 3600 * 1000,
};

Vue.use(IdleVue, options);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
