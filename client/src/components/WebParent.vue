<template lang="html">
  <div id="web-parent">
    <!-- <h1>{{ article }}</h1>
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul> -->
    <h1>{{ sourceActive }}</h1>
    <news-nav></news-nav>
    <select-article-form v-if="articleFormActive"  :articles="articles" />
     <source-select v-if="sourceActive"/>
    <!-- <reading-list /> -->
  </div>

</template>

<script>
import SelectArticleForm from './SelectArticleForm.vue'
import fetch_assistant from '../services/fetch_assistant'
import NewsNav from './NewsNav.vue'
import SourceSelect from './SourceSelect.vue'
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
      this.articleFormActive = false
    })

    eventBus.$on('toggle-select-article-form', articleFormActive => {
      this.articleFormActive = true
      this.sourceActive = false
      this.readingListActive = false
    })
    //
    // eventBus.$on('toggle-reading-list', readingListActive => {
    //   this.readingListActive = readingListActive
    // })

    eventBus.$on('add-articles-to-reading-list', selectedArticles => {

    })


  },
  methods: {
    handleClass() {

    }
  },
  components: {

    'news-nav': NewsNav,

    "select-article-form": SelectArticleForm,

    'source-select': SourceSelect

  }
}
</script>

<style lang="css" scoped>
</style>
