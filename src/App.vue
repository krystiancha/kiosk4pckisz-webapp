<template>
  <div
    id="app"
    class="d-flex flex-column w-100 h-100">

    <nav class="navbar navbar-dark bg-dark">
      <div
        :class="{ hidden: $router.currentRoute.name === 'home' }"
        class="navbar-text w-25"
      >
        <router-link
          to="/"
          class="btn btn-secondary"
        >
          <span class="icon mr-1"><font-awesome-icon icon="undo"/></span>
          Wróć
        </router-link>
      </div>

      <div
        :class="{ hidden: $router.currentRoute.name === 'home' }"
        class="navbar-text">
        Powiatowe Centrum Kultury i Sztuki im. Marii Konopnickiej w Ciechanowie
      </div>
      <div class="navbar-text w-25 text-right">
        <span class="mr-2">{{ currentTimeString.date }}</span>
        <strong>{{ currentTimeString.time }}</strong>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import moment from 'moment';
import api from '@/api';

export default {
  name: 'App',
  data() {
    return {
      api,
      currentTimeString: {
        date: '',
        time: '',
      },
      updateCurrentTimeStringInterval: -1,
      apiError: false,
      apiSuccess: false,
    };
  },
  mounted() {
    this.api.fetch();
    this.updateCurrentTimeString();
    this.updateCurrentTimeStringInterval = setInterval(this.updateCurrentTimeString, 1000);
  },
  deactivated() {
    clearInterval(this.updateCurrentTimeStringInterval);
  },
  onIdle() {
    this.$router.push('/');
  },
  methods: {
    updateCurrentTimeString() {
      this.currentTimeString.date = moment().format('Do MMM');
      this.currentTimeString.time = moment().format('H:mm');
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  min-height: 3.5rem;
  height: 3.5rem;
}
</style>
