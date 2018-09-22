import Vue from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faCamera,
  faClock,
  faEnvelope,
  faFilm,
  faGlobeAmericas,
  faHandshake,
  faHourglassHalf,
  faInfoCircle,
  faList,
  faNewspaper,
  faPaintBrush,
  faSearch,
  faStar,
  faStopwatch,
  faSync,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import IdleVue from 'idle-vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import './dayjsLocale';
import './main.scss';

dayjs.locale('pl');
dayjs.extend(relativeTime);

library.add(
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faCamera,
  faClock,
  faEnvelope,
  faFilm,
  faGlobeAmericas,
  faHandshake,
  faHourglassHalf,
  faInfoCircle,
  faList,
  faNewspaper,
  faPaintBrush,
  faSearch,
  faStar,
  faStopwatch,
  faSync,
  faTimes,
  faUndo,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(IdleVue, {
  eventEmitter: new Vue(),
  idleTime: 180000,
});

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_TRACKING_ID || 'UA-XXX-X',
  router,
});

Vue.prototype.$headHash = __COMMIT_HASH__;

Vue.config.performance = true;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
