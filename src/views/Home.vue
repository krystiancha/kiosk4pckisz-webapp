<template>
  <div class="home flex-grow-1 d-flex flex-column">

    <div class="container flex-grow-1 d-flex flex-column justify-content-around">

      <div
        :class="{ hidden: !(currentShow || nextShow) }"
        class="alert alert-info"
      >
        <span v-if="currentShow">
          Aktualny seans to <span class="alert-link">{{ currentShow.movie.title }}</span>.
        </span>
        <span v-if="nextShow">
          Następny <span v-if="!currentShow">seans</span> {{ nextShowTime }}
          ({{ timeToNextShow }}): <span class="alert-link">{{ nextShow.movie.title }}</span>.
        </span>
        <span v-if="!currentShow && !nextShow">PLACEHOLDER</span>
      </div>

      <div class="d-flex flex-row justify-content-center mt-5">
        <div class="mx-2">
          <img
            src="../assets/pckisz-logo.png"
            class="img-thumbnail bg-light rounded"
            alt="logo"
          >
        </div>
        <div class="align-self-center mx-2">
          <h4>Powiatowe Centrum</h4>
          <h3>Kultury i Sztuki</h3>
          <h5>im. Marii Konopnickiej</h5>
        </div>
      </div>

      <div class="mb-5">
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
            <router-link to="/repertoire">
              <button class="btn btn-lg btn-primary">
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

    <div class="footer bg-light text-muted">
      <div class="container d-flex flex-row">
        <div>
          Wykonanie: <strong>Krystian Chachuła</strong>
        </div>
        <div class="ml-5">
          <span class="mr-1"><font-awesome-icon icon="envelope"/></span>
          krystiancha@gmail.com
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
      tickInterval: -1,
    };
  },
  watch: {
    nextShow(val) {
      if (this.movies.length > 0 && val) {
        const format = moment().isSame(val.start, 'day') ? '[o] H:mm' : 'Do MMM [o] H:mm';
        this.nextShowTime = moment(val.start).format(format);
      }
    },
  },
  mounted() {
    this.tick();
    this.tickInterval = setInterval(this.tick, 1000);
  },
  deactivated() {
    clearInterval(this.tickInterval);
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
.hidden {
  visibility: hidden;
}
.footer {
  line-height: 3rem;
  font-size: 0.9rem;
}
</style>
