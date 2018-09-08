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

    <router-view
      :movies="movies"
      :shows="shows"
      :api-error="apiError"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@/axios';
import moment from 'moment';
import Movie from './models/Movie';
import Show from './models/Show';

export default {
  name: 'App',
  data() {
    return {
      movies: [],
      shows: [],
      currentTimeString: {
        date: '',
        time: '',
      },
      updateCurrentTimeStringInterval: -1,
      apiError: false,
    };
  },
  mounted() {
    this.fetchData();
    this.updateCurrentTimeString();
    this.updateCurrentTimeStringInterval = setInterval(this.updateCurrentTimeString, 60000);
  },
  deactivated() {
    clearInterval(this.updateCurrentTimeStringInterval);
  },
  methods: {
    fetchData() {
      axios
        .get()
        .then((response) => {
          this.apiError = false;
          this.movies = response.data.movies.map(movie => Movie.fromJson(movie));
          this.shows = response.data.shows.map(show => Show.fromJson(show));
          this.scheduleRemovePastShows();
        }).catch(() => {
          this.apiError = true;
          setTimeout(this.fetchData, 10000);
        });
    },
    scheduleRemovePastShows() {
      if (this.shows.length > 0) {
        setTimeout(this.removePastShows, this.shows[0].end - new Date());
      }
    },
    removePastShows() {
      const now = new Date();
      let toRemove = 0;
      this.shows.some((show) => {
        if (show.end <= now) {
          toRemove += 1;
          return false;
        }
        return true;
      });
      this.shows.splice(0, toRemove);

      this.movies = this.movies.reduce((movies, movie) => {
        if (this.shows.find(show => show.movie.id === movie.id)) {
          movies.push(movie);
        }
        return movies;
      }, []);

      this.scheduleRemovePastShows();
    },
    updateCurrentTimeString() {
      this.currentTimeString.date = moment().format('Do MMM');
      this.currentTimeString.time = moment().format('H:mm');
    },
  },
  onIdle() {
    this.$router.push('/');
  },
};
</script>

<style scoped lang="scss">
.navbar {
  min-height: 3.5rem;
  height: 3.5rem;
}
</style>
