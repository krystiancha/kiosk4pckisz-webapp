<template>
  <div class="repertoire d-flex">
    <div class="container-fluid d-flex">
      <div class="p-3 w-50 pt-4 column">
        <h3>Seanse</h3>
        <hr>
        <input
          v-model="showsSearch"
          type="text"
          class="form-control mb-3"
          placeholder="Szukaj..."
        >
        <div
          v-if="filteredShowsToday.length > 0"
          class="card border-primary">
          <h4 class="card-header bg-primary text-white">Dziś:</h4>
          <div class="list-group list-group-flush">
            <div
              v-for="show in filteredShowsToday"
              :key="show.id"
              class="list-group-item"
            >
              <div class="row">
                <div class="col-3">
                  {{ show.timeleft }}
                </div>
                <div class="col-2">
                  <font-awesome-icon icon="clock"/>
                  {{ formatTime(show.start, 'H:mm') }}
                </div>
                <div class="col-7">
                  {{ show.movie.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <h5
            v-if="filteredShowsToday.length > 0"
            class="card-header">Kolejne dni:</h5>
          <div class="list-group list-group-flush">
            <div
              v-for="show in filteredShowsLater"
              :key="show.id"
              class="list-group-item">
              <div class="row">
                <div class="col-3">
                  <font-awesome-icon icon="calendar"/>
                  {{ formatTime(show.start, 'Do MMM') }}
                </div>
                <div class="col-2">
                  <font-awesome-icon icon="clock"/>
                  {{ formatTime(show.start, 'H:mm') }}
                </div>
                <div class="col-7">
                  {{ show.movie.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 w-50 pt-4 column">
        <h3>Filmy</h3>
        <hr>
        <input
          v-model="movieSearch"
          type="text"
          class="form-control mb-3"
          placeholder="Szukaj..."
        >
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="card mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-5">
                <img
                  v-if="movie.poster"
                  :src="movie.poster"
                  class="w-100"
                >
              </div>
              <div class="col-7">
                <h5 class="card-title">{{ movie.title }} </h5>
                <span class="mr-3 badge badge-secondary">
                  <span class="icon"><font-awesome-icon icon="globe-americas"/></span>
                  {{ movie.production }}
                </span>
                <span class="mr-3 badge badge-secondary">
                  <span class="icon"><font-awesome-icon icon="list"/></span>
                  {{ movie.genre }}
                </span>
                <span class="mr-3 badge badge-secondary">
                  <span class="icon"><font-awesome-icon icon="stopwatch"/></span>
                  {{ movie.duration }}
                </span>
                <p class="card-text my-3">{{ movie.description }}</p>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                >
                  <span class="icon"><font-awesome-icon icon="arrow-left"/></span>
                  Pokaż seanse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Repertoire',
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
    shows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showsSearch: '',
      movieSearch: '',
      showsToday: [],
      showsLater: [],
      updateTimeleftInterval: -1,
    };
  },
  computed: {
    filteredShowsToday() {
      if (this.showsSearch) {
        return this.showsToday.filter(show =>
          show.movie.title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .search(this.showsSearch
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()) !== -1);
      }
      return this.showsToday;
    },
    filteredShowsLater() {
      if (this.showsSearch) {
        return this.showsLater.filter(show =>
          show.movie.title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .search(this.showsSearch
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()) !== -1);
      }
      return this.showsLater;
    },
    filteredMovies() {
      if (this.movieSearch) {
        return this.movies.filter(movie =>
          movie.title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .search(this.movieSearch
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()) !== -1);
      }
      return this.movies;
    },
  },
  watch: {
    shows() {
      this.computeTodayLater();
    },
  },
  mounted() {
    this.computeTodayLater();

    this.updateTimeleft();
    this.updateTimeleftInterval = setInterval(this.updateTimeleft, 1000);
  },
  deactivated() {
    clearInterval(this.updateTimeleftInterval);
  },
  methods: {
    computeTodayLater() {
      let showsLaterStart = 0;
      this.shows.some((show) => {
        if (moment()
          .isSame(show.start, 'day')) {
          showsLaterStart += 1;
          return false;
        }
        return true;
      });
      this.showsToday = this.shows.slice(0, showsLaterStart);
      this.showsLater = this.shows.slice(showsLaterStart);
    },
    formatTime(time, format) {
      if (format) {
        return moment(time)
          .format(format);
      }
      if (time <= new Date()) {
        return 'trwa';
      }
      return moment(time)
        .fromNow();
    },
    updateTimeleft() {
      this.showsToday.forEach((show, idx) => {
        this.showsToday[idx].timeleft = this.formatTime(show.start);
      });
    },
  },
};
</script>

<style scoped>
.repertoire, .container-fluid {
  overflow: hidden;
}
.column {
  overflow-y: scroll;
}
/*.row, .col {*/
/*height: 100%;*/
/*}*/
/*.container-fluid > .row > .col {*/
/*overflow-y: scroll;*/
/*}*/
/*.card {*/
/*width: 100%;*/
/*margin: 1rem 0;*/
/*}*/
/*.icon {*/
/*margin-right: 0.25rem;*/
/*}*/
</style>
