<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <router-link to="/pckiszpl/pckisz,1">
          <button class="btn btn-lg btn-pyellow">
            <span class="icon"><font-awesome-icon icon="info-circle" /></span>
            <br>
            O Nas
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="/pckiszpl/aktualnosci,4">
          <button class="btn btn-lg btn-pred">
            <span class="icon"><font-awesome-icon icon="newspaper" /></span>
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
            <span class="icon"><font-awesome-icon icon="film" /></span>
            <br>
            Repertuar Kina
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="/pckiszpl/kalendarium,58">
          <button class="btn btn-lg btn-pgreen">
            <span class="icon"><font-awesome-icon icon="handshake" /></span>
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
            <span class="icon"><font-awesome-icon icon="paint-brush" /></span>
            <br>
            Galerie Sztuki
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="/pckiszpl/dzialaja-u-nas,29">
          <button class="btn btn-lg btn-plred">
            <span class="icon"><font-awesome-icon icon="hourglass-half" /></span>
            <br>
            Zajęcia
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="/pckiszpl/festiwale-konkursy--przeglady--warsztaty,38">
          <button class="btn btn-lg btn-plblue">
            <span class="icon"><font-awesome-icon icon="star" /></span>
            <br>
            Festiwale i Konkursy
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="/pckiszpl/galeria-zdjec,143">
          <button class="btn btn-lg btn-plgreen">
            <span class="icon"><font-awesome-icon icon="camera" /></span>
            <br>
            Galeria Zdjęć
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
