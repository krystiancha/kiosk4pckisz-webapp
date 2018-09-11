<template>
  <div
    v-if="show"
    v-show="isSearched"
    :class="{ 'list-group-item-secondary': isInProgress }"
  >
    <div class="d-flex flex-row">
      <div
        v-if="showDate"
        class="date align-self-center">
        <span class="icon text-muted"><font-awesome-icon icon="calendar"/></span>
        {{ show.startf.date }}
      </div>
      <div
        v-show="isInProgress"
        class="time align-self-center">
        trwa
      </div>
      <div
        v-show="!isInProgress"
        class="time align-self-center">
        <span class="icon text-muted"><font-awesome-icon icon="clock"/></span>
        {{ show.startf.time }}
      </div>
      <div class="title flex-grow-1 align-self-center">
        <strong class="mr-2">{{ show.movie.title }}</strong>
        <span
          v-show="show.theater === 1"
          class="badge badge-success mr-2">
          Małe kino
        </span>
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
import api from '@/api';
import { simplify } from '@/utilities';

export default {
  name: 'Show',
  props: {
    show: {
      type: api.Show,
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
  data() {
    return {
      api,
    };
  },
  computed: {
    isSearched() {
      if (this.searchText !== '') {
        return simplify(this.show.movie.title).indexOf(this.searchText) !== -1;
      }
      return true;
    },
    isInProgress() {
      return this.show.start <= this.api.now && this.api.now < this.show.end;
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
