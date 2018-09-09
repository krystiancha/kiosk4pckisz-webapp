<template>
  <div
    v-if="show"
    v-show="isSearched"
  >
    <div class="d-flex flex-row">
      <div
        v-if="showDate"
        class="date">
        <span class="icon text-muted"><font-awesome-icon icon="calendar"/></span>
        {{ show.startf.date }}
      </div>
      <div class="time">
        <span class="icon text-muted"><font-awesome-icon icon="clock"/></span>
        {{ show.startf.time }}
      </div>
      <div class="title flex-grow-1">
        <strong>{{ show.movie.title }}</strong>
      </div>
      <button
        class="btn btn-outline-primary btn-sm align-self-center ml-1"
        @click="$emit('show-movie', show.movie)"
      >
        <font-awesome-icon icon="arrow-right"/>
      </button>
    </div>
  </div>
</template>

<script>
import { Show } from '@/api';
import { simplify } from '@/utilities';

export default {
  name: 'Show',
  props: {
    show: {
      type: Show,
      default: null,
    },
    searchText: {
      type: String,
      default: '',
    },
    showDate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isSearched() {
      if (this.searchText !== '') {
        return simplify(this.show.movie.title).indexOf(this.searchText) !== -1;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>
