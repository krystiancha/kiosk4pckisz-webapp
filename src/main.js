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
  faArrowRight,
  faCalendar,
  faClock,
  faEnvelope,
  faSearch,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import IdleVue from 'idle-vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import './main.scss';
import router from './router';

library.add(
  faCamera, faFilm, faHandshake, faHourglassHalf, faInfoCircle, faNewspaper, faPaintBrush, faStar,
  faGlobeAmericas, faList, faStopwatch,
  faArrowLeft, faArrowRight, faCalendar, faClock,
  faEnvelope, faSearch, faTimes, faUndo,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

moment.locale('pl');

Vue.use(IdleVue, {
  eventEmitter: new Vue(),
  idleTime: 3600 * 1000,
});

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
