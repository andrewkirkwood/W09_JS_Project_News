<template lang="html">
  <div id="web-parent">
    <select-article-form :articles="articles" />
    <!-- <h1>{{ article }}</h1>
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul> -->
  </div>

</template>

<script>
import SelectArticleForm from './SelectArticleForm.vue'
import fetch_assistant from '../services/fetch_assistant'
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
    "select-article-form": SelectArticleForm
  }
}
</script>

<style lang="css" scoped>
</style>
