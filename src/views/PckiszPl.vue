<template>
  <div class="pckiszpl flex-grow-1 d-flex flex-column">
    <div
      v-if="$route.params.path === 'galeria-zdjec,143'"
      class="alert alert-warning border-warning mx-auto m-0"
      role="alert"
    >
      <strong>Wskazówka:</strong>
      Aby zamknąć zdjęcie otwarte w galerii, proszę dotknąć wyszarzonego pola poza zdjęciem.
    </div>
    <iframe
      :src="`http://pckisz.pl/${$route.params.path}#small`"
      class="flex-grow-1"
      sandbox="allow-scripts"
      @load="load"
    />
  </div>
</template>

<script>
import NProgress from 'nprogress';

export default {
  name: 'PckiszPl',
  data() {
    return {
      loaded: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    next();
  },
  methods: {
    load() {
      NProgress.done();
    },
  },
};
</script>

<style scoped lang="scss">
.pckiszpl {
  background-color: #e8e8e8;
}
.alert {
  position: absolute;
  top: 4rem;
  left: 12%;
  width: 75%;
  z-index: 3;
}
.loading {
  position: absolute;
  top: 25%;
  left: 50%;
  div {
    position: relative;
    left: -50%;
    font-size: 2rem;
    .icon {
      font-size: 10rem;
    }
  }
}
iframe {
  border: none;

  z-index: 2;
}
</style>
