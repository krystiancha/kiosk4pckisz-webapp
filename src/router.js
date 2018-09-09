import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PckiszPl from './views/PckiszPl.vue';
import Repertoire from './views/Repertoire.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pckiszpl/:path',
      name: 'pckizpl',
      component: PckiszPl,
    },
    {
      path: '/repertoire',
      name: 'repertoire',
      component: Repertoire,
    },
  ],
});
