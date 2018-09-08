<template>
  <div class="flex-grow-1 d-flex flex-column">
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
    />
  </div>
</template>

<script>
export default {
  name: 'PckiszPl',
};
</script>

<style scoped lang="scss">
.alert {
  position: absolute;
  top: 4rem;
  left: 12%;
  width: 75%;
}
iframe {
  border: none;
  background-color: #e8e8e8;
}
</style>
