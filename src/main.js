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
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import IdleVue from 'idle-vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import './main.scss';
import router from './router';

library.add(
  faCamera, faFilm, faHandshake, faHourglassHalf, faInfoCircle, faNewspaper, faPaintBrush, faStar,
  faGlobeAmericas, faList, faStopwatch,
  faArrowLeft, faArrowRight, faCalendar, faClock,
  faEnvelope, faSearch, faTimes, faUndo, faSync,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

moment.locale('pl');

Vue.use(IdleVue, {
  eventEmitter: new Vue(),
  idleTime: 180000,
});

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_TRACKING_ID || 'UA-XXX-X',
  router,
  ignoreRoutes: ['home'],
});

Vue.prototype.$headHash = __COMMIT_HASH__;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
