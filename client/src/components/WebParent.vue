<template lang="html">
  <div id="web-parent">
    <!-- <h1>{{ article }}</h1>
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul> -->
    <nav></nav>
    <select-article-form :articles="articles"></select-article-form> 
  </div>

</template>

<script>
import fetch_assistant from '../services/fetch_assistant'
import Nav from './components/Nav.vue'
export default {
  name: "web-parent",
  data () {
    return {
      articles: [],
      article: {}
    }
  },
  mounted() {
    fetch_assistant.getArticleBySection("business")
      .then(res => this.articles = res)

      fetch_assistant.getArticle("https://content.guardianapis.com/business/2020/jan/24/greta-thunberg-davos-leaders-ignored-climate-activists-demands")
        .then(res => this.article = res)
  },
  components: {
    'nav': Nav
  }
}
</script>

<style lang="css" scoped>
</style>
