<template>
  <div
    id="app"
    class="d-flex flex-column w-100 h-100">

    <nav class="navbar navbar-dark bg-dark">
      <div
        :class="{ hidden: $router.currentRoute.name === 'home' }"
        class="navbar-text w-25">
        <router-link
          to="/"
          class="btn btn-secondary">
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

    <router-view/>
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
    };
  },
  computed: {
    currentTimeString() {
      return {
        date: moment(api.now)
          .format('Do MMM'),
        time: moment(api.now)
          .format('H:mm'),
      };
    },
  },
  mounted() {
    this.api.startClock();
    this.api.fetch();
    this.$ga.event('app', 'launch');
  },
  onIdle() {
    this.$router.push('/');
    this.$ga.event('app', 'idle');
  },
};
</script>

<style scoped lang="scss">
.navbar {
  min-height: 4.25rem;
  height: 4.25rem;
}
</style>
