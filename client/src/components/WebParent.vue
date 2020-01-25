<template lang="html">
  <div id="web-parent">
    <!-- <h1>{{ article }}</h1>
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul> -->
    <h1>{{ sourceActive }}</h1>
    <news-nav></news-nav>
    <select-article-form v-if="sourceActive"  :articles="articles" />
    <!-- <source-select />
    <reading-list /> -->
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
      sourceActive: false,
      articleFormActive: false,
      readingListActive: true,
      selectArticleFormClass: ""
    }
  },
  mounted() {
    fetch_assistant.getArticleBySection("business")
      .then(res => this.articles = res)

      fetch_assistant.getArticle("https://content.guardianapis.com/business/2020/jan/24/greta-thunberg-davos-leaders-ignored-climate-activists-demands")
        .then(res => this.article = res)

    eventBus.$on('toggle-select-source', () => {
      this.sourceActive = true
      this.readingListActive = false
    })

    // eventBus.$on('toggle-select-article-form', articleFormActive => {
    //   this.articleFormActive = articleFormActive
    // })
    //
    // eventBus.$on('toggle-reading-list', readingListActive => {
    //   this.readingListActive = readingListActive
    // })


  },
  methods: {
    handleClass() {

    }
  },
  components: {
    'news-nav': NewsNav
  }
}
</script>

<style lang="css" scoped>
</style>
