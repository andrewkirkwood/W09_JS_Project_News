<template lang="html">
  <div class="">
    <h1>{{ articleToShow }}</h1>
  </div>
</template>

<script>
export default {
  name: "show-article",
  props: ['articleToShow']
}
</script>

<style lang="css" scoped>
</style>
