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
    <reading-list v-if="readingListActive" :savedReadingListItems="savedReadingListItems"/>
  </div>

</template>

<script>
import NewsService from '../services/NewsService.js'
import SelectArticleForm from './SelectArticleForm.vue'
import fetch_assistant from '../services/fetch_assistant'
import NewsNav from './NewsNav.vue'
import SourceSelect from './SourceSelect.vue'
import ReadingList from './ReadingList.vue'
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
      savedReadingListItems: []
    }
  },
  mounted() {
    this.fetchReadingList()

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

    eventBus.$on('toggle-reading-list', payload => {
      this.savedReadingListItems.push(payload)
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = true
    })
  },
  methods: {
    fetchReadingList() {
    NewsService.getArticles()
    .then(res => this.savedReadingListItems = res)
    }
  },
  components: {

    'news-nav': NewsNav,

    "select-article-form": SelectArticleForm,

    'source-select': SourceSelect,

    'reading-list': ReadingList

  }
}
</script>

<style lang="css" scoped>
</style>
