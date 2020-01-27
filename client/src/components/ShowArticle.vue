<template lang="html">
  <div class="">
    <h2> {{articleToShow.webTitle}} </h2>
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
