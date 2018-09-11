<template>
  <div class="home flex-grow-1 d-flex flex-column">

    <div class="container flex-grow-1 d-flex flex-column justify-content-around">

      <div
        v-show="api.state === api.SUCCESS"
        class="alert alert-info"
      >
        <span v-if="nextShow">
          Następny seans: <strong>{{ nextShow.movie.title }}</strong> {{ timeToNextShow }}
          <strong v-show="nextShow.theater === 1">w Małym kinie</strong>
        </span>
      </div>
      <div
        v-show="api.state === api.PENDING"
        class="alert alert-info"
      >
        Trwa wczytywanie repertuaru kina... Przez ten czas będzie on niedostępny. Może to potrwać
        kilka sekund.
      </div>
      <div
        v-show="api.state === api.ERROR"
        class="alert alert-warning"
      >
        Przepraszamy, <strong>repertuar kina</strong> jest obecnie niedostępny. Zachęcamy do
        skorzystania z pozostałych funkcji kiosku np. <em>Aktualności</em>.
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
              <button
                :disabled="api.state !== api.SUCCESS"
                class="btn btn-lg btn-primary"
              >
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
        <div class="ml-5 flex-grow-1">
          <span class="mr-1"><font-awesome-icon icon="envelope"/></span>
          krystiancha@gmail.com
        </div>
        <div>{{ $headHash }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import api from '@/api';

export default {
  name: 'Home',
  data() {
    return {
      api,
    };
  },
  computed: {
    nextShow() {
      return this.api.shows.find(show => show.start > this.api.now);
    },
    isNextShowToday() {
      if (this.nextShow) {
        return moment(this.api.now).isSame(this.nextShow.start, 'day');
      }
      return false;
    },
    isNextShowTomorrow() {
      if (this.nextShow) {
        return moment(this.api.now).add(1, 'days').isSame(this.nextShow.start, 'day');
      }
      return false;
    },
    timeToNextShow() {
      if (this.nextShow) {
        if (this.isNextShowToday) {
          return `o ${moment(this.nextShow.start).format('H:mm')} (${moment(this.api.now).to(this.nextShow.start)})`;
        }
        if (this.isNextShowTomorrow) {
          return `jutro o ${moment(this.nextShow.start).format('H:mm')}`;
        }
        return moment(this.nextShow.start).format('Do MMM o H:mm');
      }
      return '';
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
.alert {
  height: 3rem;
}
</style>
