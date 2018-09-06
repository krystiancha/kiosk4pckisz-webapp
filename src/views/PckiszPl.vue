<template>
  <iframe
    :src="`http://pckisz.pl/${$route.params.path}`"
    class="flex-grow-1"
  />
</template>

<script>
export default {
  name: 'PckiszPl',
};
</script>

<style scoped lang="scss">
iframe {
  border: none;
  background-color: #e8e8e8;
}
</style>
