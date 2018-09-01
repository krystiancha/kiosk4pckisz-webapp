<template>
  <iframe :src="`http://pckisz.pl/${$route.params.path}`"/>
</template>

<script>
export default {
  name: 'PckiszPl',
};
</script>

<style scoped lang="scss">
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
