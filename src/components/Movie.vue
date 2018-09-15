<template>
  <div
    v-if="movie"
    v-show="isSearched"
    class="card border-secondary">
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <img
            v-if="movie.poster"
            :src="movie.poster"
            class="w-100">
        </div>
        <div class="col-8">
          <h5 class="card-title">{{ movie.title }}</h5>
          <span class="mr-3 badge badge-info">
            <span class="icon"><font-awesome-icon icon="globe-americas"/></span>
            {{ movie.production }}
          </span>
          <span class="mr-3 badge badge-info">
            <span class="icon"><font-awesome-icon icon="list"/></span>
            {{ movie.genre }}
          </span>
          <span class="mr-3 badge badge-info">
            <span class="icon"><font-awesome-icon icon="stopwatch"/></span>
            {{ movie.duration }}
          </span>
          <p class="card-text my-3">{{ movie.description }}</p>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="$emit('show-shows', movie)">
            <span class="icon"><font-awesome-icon icon="arrow-left"/></span>
            Pokaż seanse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import utilities from '@/utilities';

export default {
  name: 'Movie',
  props: {
    movie: {
      type: api.Movie,
      default: null,
    },
    searchText: {
      type: String,
      default: '',
    },
  },
  computed: {
    isSearched() {
      if (this.searchText !== '') {
        return utilities.simplify(this.movie.title).indexOf(this.searchText) !== -1;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  margin-right: 0.25rem;
}
</style>
