<template>
  <div class="bg-light">
    <div class="container">
      <div
        v-if="currentShow || nextShow"
        class="alert alert-info"
      >
        <span v-if="currentShow">
          Aktualny seans to <span class="alert-link">{{ currentShow.movieObj.title }}</span>.
        </span>
        <span v-if="nextShow">
          Następny <span v-if="!currentShow">seans</span> {{ nextShowTime }}
          ({{ timeToNextShow }}): <span class="alert-link">{{ nextShow.movieObj.title }}</span>.
        </span>
      </div>
      <img
        src="../assets/pckisz-logo.png"
        class="img-thumbnail bg-light rounded mx-auto d-block"
        alt="logo">
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <router-link to="/pckiszpl/pckisz,1">
            <button class="btn btn-lg btn-pyellow">
              <span class="icon"><font-awesome-icon icon="info-circle"/></span>
              <br>
              O Nas
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/pckiszpl/aktualnosci,4">
            <button class="btn btn-lg btn-pred">
              <span class="icon"><font-awesome-icon icon="newspaper"/></span>
              <br>
              Aktualności
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/">
            <button
              class="btn btn-lg btn-primary"
              disabled>
              <span class="icon"><font-awesome-icon icon="film"/></span>
              <br>
              Repertuar Kina
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/pckiszpl/kalendarium,58">
            <button class="btn btn-lg btn-pgreen">
              <span class="icon"><font-awesome-icon icon="handshake"/></span>
              <br>
              Imprezy
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-link to="/pckiszpl/galerie-sztuki,98">
            <button class="btn btn-lg btn-plyellow">
              <span class="icon"><font-awesome-icon icon="paint-brush"/></span>
              <br>
              Galerie Sztuki
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/pckiszpl/dzialaja-u-nas,29">
            <button class="btn btn-lg btn-plred">
              <span class="icon"><font-awesome-icon icon="hourglass-half"/></span>
              <br>
              Zajęcia
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/pckiszpl/festiwale-konkursy--przeglady--warsztaty,38">
            <button class="btn btn-lg btn-plblue">
              <span class="icon"><font-awesome-icon icon="star"/></span>
              <br>
              Festiwale i Konkursy
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/pckiszpl/galeria-zdjec,143">
            <button class="btn btn-lg btn-plgreen">
              <span class="icon"><font-awesome-icon icon="camera"/></span>
              <br>
              Galeria Zdjęć
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Home',
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
      currentShow: undefined,
      nextShow: undefined,
      timeToNextShow: '',
      nextShowTime: '',
    };
  },
  watch: {
    currentShow(val) {
      if (this.movies.length > 0 && val) {
        val.fillInMovie(this.movies);
      }
    },
    nextShow(val) {
      if (this.movies.length > 0 && val) {
        val.fillInMovie(this.movies);
        const format = moment().isSame(val.start, 'day') ? '[o] H:mm' : 'Do MMM [o] H:mm';
        this.nextShowTime = moment(val.start).format(format);
      }
    },
  },
  mounted() {
    this.tick();
    setInterval(this.tick, 1000);
  },
  methods: {
    tick() {
      if (this.movies.length > 0 && this.shows.length > 0) {
        this.currentShow = this.shows
          .find(show => show.start < new Date() && new Date() < show.end);
        this.nextShow = this.shows.find(show => show.start > new Date());
        this.timeToNextShow = moment(this.nextShow.start).fromNow();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.row {
  padding: 0.5rem 0;
}
.col {
  padding: 0 0.5rem;
}
button {
  width: 100%;
}
.icon {
  font-size: 2rem;
}
</style>
