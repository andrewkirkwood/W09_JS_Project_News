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
    <show-article v-if="showArticleActive" :articleToShow="articleToShow"/>
  </div>

</template>

<script>
import {eventBus} from '../main'
import NewsService from '../services/NewsService.js'
import fetch_assistant from '../services/fetch_assistant'

import SelectArticleForm from './SelectArticleForm.vue'
import NewsNav from './NewsNav.vue'
import SourceSelect from './SourceSelect.vue'
import ReadingList from './ReadingList.vue'
import ShowArticle from './ShowArticle.vue'

export default {
  name: "web-parent",
  data () {
    return {
      articles: [],
      savedReadingListItems: [],
      articleToShow: {},
      sourceActive: false,
      articleFormActive: false,
      readingListActive: true,
      showArticleActive: false
    }
  },
  mounted() {
    this.fetchReadingList()

    fetch_assistant.getArticleBySection("business")
      .then(res => this.articles = res)

      fetch_assistant.getArticle(articleToShow.apiUrl)
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

    eventBus.$on('remove-article', item => {
      const indexOfDeleted = this.savedReadingListItems.indexOf(item)
      this.savedReadingListItems.splice(indexOfDeleted, 1)
    })

    eventBus.$on('toggle-show-article', item => {
      this.articleToShow = item
      this.showArticleActive = true

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
    'reading-list': ReadingList,
    'show-article': ShowArticle
  }
}
</script>

<style lang="css" scoped>
</style>
