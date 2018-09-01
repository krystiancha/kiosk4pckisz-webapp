<template>
  <div id="app">
    <router-view
      :movies="movies"
      :shows="shows" />
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
        .get('https://kiosk4pckisz-api.herokuapp.com/api')
        .then((response) => {
          this.movies = response.data.movies.map(movie => Movie.fromJson(movie));
          this.shows = response.data.screenings.map(show => Show.fromJson(show));
        });
    },
    updateData() {
      this.shows = this.shows;
    },
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
