<template lang="html">
  <div id="web-parent">
<<<<<<< HEAD
    <header>
      <div>
        <p>Reading List</p>
      </div>
      <div>
        <p>Add Article</p>
      </div>
    </header>
    <h1>{{ sourceActive }}</h1>
=======
    <!-- <h1>{{ article }}</h1>
    <ul>
      <li v-for="item in articles"> {{ item }}</li>
    </ul> -->
>>>>>>> develop
    <news-nav></news-nav>
    <select-article-form v-if="articleFormActive"  :articles="articles" />
    <source-select v-if="sourceActive"/>
    <reading-list v-if="readingListActive" :filteredArticles="filteredArticles"/>
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
      selectedArticle: null,
      articleToShow: {},
      searchTerm: "",
      sourceActive: false,
      articleFormActive: false,
      readingListActive: true,
      showArticleActive: false,
      allSections: []
    }
  },
  computed: {
    filteredArticles: function(){
      const foundArticles = this.savedReadingListItems.filter(article => {
        return article.webTitle.toLowerCase().includes(this.searchTerm)
      })
      return foundArticles
    }
  },
  mounted() {
    this.fetchReadingList()

    fetch_assistant.getArticleBySection("business")
      .then(res => this.articles = res)

    eventBus.$on('search-entered', search => {
      this.searchTerm = search
    })

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
      const mapOfIds = payload.map(item => item.id)
      const mapOfExistingIds = this.savedReadingListItems.map(item => item.id)
      console.log(mapOfExistingIds);
      const newItems = payload.filter(item =>
        !mapOfExistingIds.includes(item.id)
      )

      newItems.forEach(item => this.savedReadingListItems.push(item) )
      newItems.forEach(item => NewsService.postArticles(item))

      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = true
    })

    eventBus.$on('remove-article', item => {
      const indexOfDeleted = this.savedReadingListItems.indexOf(item)
      this.savedReadingListItems.splice(indexOfDeleted, 1)
    })

    eventBus.$on('toggle-show-article', item => {
      this.selectedArticle = item
      this.fetchArticle()
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = false
      this.showArticleActive = true

    })

    this.fetchSections()
  },
  methods: {
    fetchReadingList() {
    NewsService.getArticles()
    .then(res => this.savedReadingListItems = res)
  },
    fetchArticle() {
      if (this.selectedArticle) {
        fetch_assistant.getArticle(this.selectedArticle.apiUrl)
          .then(res => this.articleToShow = res)
      }
    },
    fetchSections() {
      fetch_assistant.getAllSections()
      .then(res => this.allSections = res.map(item => item.webTitle))
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
