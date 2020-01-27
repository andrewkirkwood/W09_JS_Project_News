<template lang="html">
  <div id="web-parent">
    <header>
      <!-- add an onclick after refactoring the eventBUs -->
      <div :class="readingListClass()" v-on:click="">
        <p>Reading List</p>
      </div>
      <div :class="addArticleClass()" v-on:click="">
        <p>Add Article</p>
      </div>
    </header>
    <!-- <h1>{{ sourceActive }}</h1> -->
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
      allSections: [],
      selectedHeader: "readingList"
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
// refactor eventbus, put the sets into function that can be called in the header
    eventBus.$on('toggle-select-source', () => {
      this.sourceActive = true
      this.readingListActive = false
      this.articleFormActive = false
      this.selectedHeader = "addNewArticle"
    })

    eventBus.$on('toggle-select-article-form', articleFormActive => {
      this.articleFormActive = true
      this.sourceActive = false
      this.readingListActive = false
      this.selectedHeader = "addNewArticle"

    })

    eventBus.$on('toggle-reading-list', payload => {
      this.addNewArticles(payload)
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = true
      this.selectedHeader = "readingList"

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
      this.selectedHeader = "readingList"
    })

    this.fetchSections()

    this.readingListClass()
    this.addArticleClass()
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
    },
    addNewArticles(payload) {
      const mapOfIds = payload.map(item => item.id)
      const mapOfExistingIds = this.savedReadingListItems.map(item => item.id)
      const newItems = payload.filter(item =>
        !mapOfExistingIds.includes(item.id)
      )

      newItems.forEach(item => this.savedReadingListItems.push(item) )
      newItems.forEach(item => NewsService.postArticles(item))
    },
    readingListClass() {
      return  this.selectedHeader === "readingList" ? "headerActive" : "headerInactive"
    },
    addArticleClass() {
      return  this.selectedHeader === "addNewArticle" ? "headerActive" : "headerInactive"
    },
    getReadingList() {

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
header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: stretch;
  background-color: darkslategrey;
  color: white;
  text-align: center;
}
.headerActive {
  background-color: #a4dcc0;
  color: #2f4f4f;
  border: #45B097 solid;
  font-weight: bold;
}
.headerInactive:hover {
  background-color: #68a198 ;
  color: #2f4f4f;
  font-weight: bold;


}
</style>
