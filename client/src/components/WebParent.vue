<template lang="html">
  <div id="web-parent">
    <!-- <h1>{{ article }}</h1>
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul> -->
    <h1>{{ number }}</h1>
    <news-nav></news-nav>
    <select-article-form :articles="articles"></select-article-form>
  </div>

</template>

<script>
import fetch_assistant from '../services/fetch_assistant'
import NewsNav from './NewsNav.vue'
import {eventBus} from '../main'
export default {
  name: "web-parent",
  data () {
    return {
      articles: [],
      article: {},
      number: 0
    }
  },
  mounted() {
    fetch_assistant.getArticleBySection("business")
      .then(res => this.articles = res)

      fetch_assistant.getArticle("https://content.guardianapis.com/business/2020/jan/24/greta-thunberg-davos-leaders-ignored-climate-activists-demands")
        .then(res => this.article = res)

    eventBus.$on('toggle-add-news', number => {
      this.number = number
    })
  },
  components: {
    'news-nav': NewsNav
  }
}
</script>

<style lang="css" scoped>
</style>
