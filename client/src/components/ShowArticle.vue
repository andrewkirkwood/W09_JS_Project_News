<template lang="html">
  <div v-if="articleToShow" class="">
    <h2> {{articleToShow.title}} </h2>
    <p v-html="articleToShow.fields.body"></p>
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
