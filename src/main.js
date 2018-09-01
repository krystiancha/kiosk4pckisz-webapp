import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera, faFilm, faHandshake, faHourglassHalf, faInfoCircle, faNewspaper, faPaintBrush, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import App from './App.vue';
import './main.scss';
import router from './router';
import './registerServiceWorker';

library.add(faCamera, faFilm, faHandshake, faHourglassHalf, faInfoCircle, faNewspaper, faPaintBrush, faStar);

Vue.component('font-awesome-icon', FontAwesomeIcon);

moment.locale('pl');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
