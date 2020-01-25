<template lang="html">
  <div id="web-parent">
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul>
  </div>

</template>

<script>
import fetch_assistant from '../services/fetch_assistant'
export default {
  name: "web-parent",
  data () {
    return {
      articles: []
    }
  },
  mounted() {
    fetch_assistant.getArticleBySection("business")
      .then(res => this.articles = res)
  }
}
</script>

<style lang="css" scoped>
</style>
