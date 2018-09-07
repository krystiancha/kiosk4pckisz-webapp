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
            v-model="showsSearch"
            type="text"
            class="form-control mb-3"
            placeholder="Wpisz tytuł filmu"
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="showsSearch = ''"
            >
              <span class="icon mr-1"><font-awesome-icon icon="times"/></span>
            </button>
          </div>
        </div>
        <h4
          v-show="showsSearch"
          class="text-info"
        >
          Wyniki wyszukiwania:
        </h4>
        <div
          v-if="filteredShowsToday.length > 0"
          class="card border-primary mb-3">
          <h4 class="card-header bg-primary text-white">Dziś:</h4>
          <div class="list-group list-group-flush">
            <div
              v-for="show in filteredShowsToday"
              :key="show.id"
              class="show list-group-item d-flex flex-row"
            >

              <div class="date">
                {{ show.timeleft }}
              </div>
              <div class="time">
                <span class="icon text-muted"><font-awesome-icon icon="clock"/></span>
                {{ formatTime(show.start, 'H:mm') }}
              </div>
              <div class="title flex-grow-1">
                <strong>{{ show.movie.title }}</strong>
              </div>
              <button
                class="btn btn-outline-primary btn-sm align-self-center ml-1"
                @click="movieSearch = show.movie.title"
              >
                <font-awesome-icon icon="arrow-right"/>
              </button>
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
              class="show list-group-item d-flex flex-row"
            >
              <div class="date">
                <span class="icon text-muted"><font-awesome-icon icon="calendar"/></span>
                {{ formatTime(show.start, 'Do MMM') }}
              </div>
              <div class="time">
                <span class="icon text-muted"><font-awesome-icon icon="clock"/></span>
                {{ formatTime(show.start, 'H:mm') }}
              </div>
              <div class="title flex-grow-1">
                <strong>{{ show.movie.title }}</strong>
              </div>
              <button
                class="btn btn-outline-primary btn-sm align-self-center ml-1"
                @click="movieSearch = show.movie.title"
              >
                <font-awesome-icon icon="arrow-right"/>
              </button>
            </div>
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
              @click="movieSearch = ''"
            >
              <span class="icon mr-1"><font-awesome-icon icon="times"/></span>
            </button>
          </div>
        </div>
        <h4
          v-show="movieSearch"
          class="text-info"
        >
          Wyniki wyszukiwania:
        </h4>
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
                  @click="showsSearch = movie.title"
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
    apiError: {
      type: Boolean,
      default: false,
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
    if (this.apiError || this.shows.length === 0) {
      this.$router.push('/');
    }

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

<style scoped lang="scss">
.repertoire, .container-fluid {
  overflow: hidden;
}
.column {
  overflow-y: scroll;
}
.show {
  .date {
    min-width: 7rem;
    width: 7rem;
  }
  .time {
    min-width: 6rem;
    width: 6rem;
  }
  button {
    height: 2rem;
  }
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
.icon {
  margin-right: 0.25rem;
}
</style>
