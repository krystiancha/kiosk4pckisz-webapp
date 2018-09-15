<template>
  <div class="repertoire d-flex">
    <div class="container-fluid d-flex">
      <div class="p-3 w-50 pt-4 column">
        <h3>Seanse</h3>
        <hr>
        <div class="input-group input-group-lg">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <span class="icon mr-2"><font-awesome-icon icon="search"/></span>
            </span>
          </div>
          <input
            v-model="showSearch"
            type="text"
            class="form-control mb-3"
            placeholder="Wpisz tytuł filmu"
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="clearShowSearch"
            >
              <span class="icon mr-1"><font-awesome-icon icon="times"/></span>
            </button>
          </div>
        </div>
        <h4
          v-show="showSearch"
          class="text-warning"
        >
          Wyniki wyszukiwania:
        </h4>
        <div
          v-show="showsToday.length > 0"
          class="card border-primary mb-3">
          <h4 class="card-header bg-primary text-white">Dziś:</h4>
          <div class="list-group list-group-flush">
            <show
              v-for="show in showsToday"
              :key="show.id"
              :show="show"
              :search-text="simplifiedShowSearch"
              :show-date="false"
              class="show list-group-item"
              @show-movie="showMovie" />
          </div>
        </div>
        <div class="card">
          <h5
            v-show="showsToday.length > 0"
            class="card-header">Kolejne dni:</h5>
          <div class="list-group list-group-flush">
            <show
              v-for="show in showsLater"
              :key="show.id"
              :show="show"
              :search-text="simplifiedShowSearch"
              class="show list-group-item"
              @show-movie="showMovie" />
          </div>
        </div>
      </div>
      <div class="p-3 w-50 pt-4 column">
        <h3>Filmy</h3>
        <hr>
        <div class="input-group input-group-lg">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <span class="icon mr-2"><font-awesome-icon icon="search"/></span>
            </span>
          </div>
          <input
            v-model="movieSearch"
            type="text"
            class="form-control mb-3"
            placeholder="Wpisz tytuł filmu"
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="clearMovieSearch"
            >
              <span class="icon mr-1"><font-awesome-icon icon="times"/></span>
            </button>
          </div>
        </div>
        <h4
          v-show="movieSearch"
          class="text-warning"
        >
          Wyniki wyszukiwania:
        </h4>
        <movie
          v-for="movie in api.movies"
          :key="movie.id"
          :movie="movie"
          :search-text="simplifiedMovieSearch"
          class="mb-3"
          @show-shows="showShows" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import NProgress from 'nprogress';
import api from '@/api';
import { simplify } from '@/utilities';
import Show from '../components/Show.vue';
import Movie from '../components/Movie.vue';

export default {
  name: 'Repertoire',
  components: { Movie, Show },
  data() {
    return {
      api,
      showSearch: '',
      movieSearch: '',
    };
  },
  computed: {
    lastShowTodayIndex() {
      let i = 0;
      this.api.shows.some((show) => {
        if (moment(this.api.now).isSame(show.start, 'day')) {
          i += 1;
          return false;
        }
        return true;
      });

      return i - 1;
    },
    showsToday() {
      return this.api.shows.slice(0, this.lastShowTodayIndex + 1);
    },
    showsLater() {
      return this.api.shows.slice(this.lastShowTodayIndex + 1);
    },
    simplifiedShowSearch() {
      return simplify(this.showSearch);
    },
    simplifiedMovieSearch() {
      return simplify(this.movieSearch);
    },
  },
  mounted() {
    NProgress.done();
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    next();
  },
  methods: {
    showMovie(movie) {
      this.movieSearch = movie.title;
      this.$ga.event('repertoire', 'showMovie', movie.title);
    },
    showShows(movie) {
      this.showSearch = movie.title;
      this.$ga.event('repertoire', 'showShows', movie.title);
    },
    clearMovieSearch() {
      this.movieSearch = '';
      this.$ga.event('repertoire', 'clearMovieSearch');
    },
    clearShowSearch() {
      this.showSearch = '';
      this.$ga.event('repertoire', 'clearShowSearch');
    },
  },
};
</script>

<style scoped lang="scss">
.repertoire, .container-fluid {
  overflow: hidden;
}
.column {
  overflow-y: scroll;
}
</style>
