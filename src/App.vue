<template>
  <div
    id="app"
    class="d-flex flex-column w-100 h-100">

    <nav class="navbar navbar-dark bg-dark">
      <a
        class="navbar-brand"
        href="#">Navbar</a>
    </nav>

    <router-view
      :movies="movies"
      :shows="shows"/>
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';
import Movie from './models/Movie';
import Show from './models/Show';

export default {
  name: 'App',
  data() {
    return {
      movies: [],
      shows: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get('http://localhost:8000')
        .then((response) => {
          this.movies = response.data.movies.map(movie => Movie.fromJson(movie));
          this.shows = response.data.shows.map(show => Show.fromJson(show));
          this.scheduleRemovePastShows();
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

      this.scheduleRemovePastShows();
    },
  },
  onIdle() {
    this.$router.push('/');
  },
};
</script>

<style scoped lang="scss">
.navbar {
  min-height: 3rem;
  height: 3rem;
}
</style>
