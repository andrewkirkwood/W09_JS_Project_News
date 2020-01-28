<template lang="html">
  <div id="web-parent">
    <header>
      <!-- add an onclick after refactoring the eventBUs -->
      <!-- <div :class="readingListClass()" v-on:click="toggleReadingList">
      <p>Reading List</p>
    </div>
    <div :class="addArticleClass()" v-on:click="toggleSelectSource">
    <p>Add Article</p>
  </div> -->
</header>
<!-- <h1>{{ sourceActive }}</h1> -->
<!-- <p>{{egg}}</p> -->
<!-- <pre>{{ JSON.stringify(articles, null, 2) }}</pre> -->
<news-nav></news-nav>

<!-- <select-article-form v-if="articleFormActive"  :articles="articles" :sections="sections"/> -->

<select-article-form v-if="sections" :articles="articles" :sections="sections"/>
<source-select v-if="sourceActive"/>
<reading-list v-if="readingListActive" :filteredArticles="filteredArticles"/>
<show-article v-if="showArticleActive" :articleToShow="articleToShow"/>
</div>

</template>

<script>
import {eventBus} from '../main'
import NewsService from '../services/NewsService.js'
import fetch_assistant from '../services/fetch_assistant'
import fetch_assistant_NYT from '../services/fetch_assistant'

import SelectArticleForm from './SelectArticleForm.vue'
import NewsNav from './NewsNav.vue'
import SourceSelect from './SourceSelect.vue'
import ReadingList from './ReadingList.vue'
import ShowArticle from './ShowArticle.vue'

export default {
  name: "web-parent",
  data () {
    return {
      articles: {},
      savedReadingListItems: [],
      selectedArticle: null,
      articleToShow: {},
      searchTerm: "",
      sourceActive: false,
      articleFormActive: false,
      readingListActive: true,
      showArticleActive: false,
      allSections: ["business", "science"],
      selectedHeader: "readingList",
      egg: null,
      sections: null
    }
  },
  computed: {
    filteredArticles: function() {
      const foundArticles = this.savedReadingListItems.filter(article => {
        return article.webTitle.toLowerCase().includes(this.searchTerm)
      })
      return foundArticles
    },
    getSections: function() {
      return this.sections = Object.keys(this.articles)
    }
  },
  mounted() {

    fetch_assistant_NYT.getArticleBySection('science')
    .then(res => this.egg = res)

    this.fetchReadingList()

    // this.fetchSections()
    this.readingListClass()
    this.addArticleClass()

    eventBus.$on('search-entered', search => {
      this.searchTerm = search
    })
    // refactor eventbus, put the sets into function that can be called in the header
    eventBus.$on('toggle-select-source', () => {
      this.toggleSelectSource()
      this.selectedHeader = "addNewArticle"
    })

    eventBus.$on('toggle-select-article-form', articleFormActive => {
      this.fetchAllArticles(this.allSections)
      this.toggleSelectArticleForm()
      this.selectedHeader = "addNewArticle"

    })

    eventBus.$on('toggle-reading-list', payload => {
      this.addNewArticles(payload)
      this.toggleReadingList()
      this.selectedHeader = "readingList"

    })

    eventBus.$on('remove-article', item => {
      const indexOfDeleted = this.savedReadingListItems.indexOf(item)
      this.savedReadingListItems.splice(indexOfDeleted, 1)
    })

    eventBus.$on('toggle-show-article', item => {
      this.selectedArticle = item
      this.fetchArticle()
      this.toggleShowArticle()
      this.selectedHeader = "readingList"
    })


  },
  methods: {
    fetchAllArticles(arrayOfCategories) {
      const promises = arrayOfCategories.map(category => {
        return fetch_assistant.getArticleBySection(category.toLowerCase())
        .then(articlesToAdd => {
          this.articles[category] = articlesToAdd;
        })
      })

      Promise.all(promises)
        .then(sections => {
          this.sections = Object.keys(this.articles);
        });
    },
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
    // fetchSections() {
    //   fetch_assistant.getAllSections()
    //   .then(res => this.allSections = res.map(item => item.webTitle))
    // },
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

    },
    toggleSelectSource() {
      this.sourceActive = true
      this.readingListActive = false
      this.articleFormActive = false
    },
    toggleSelectArticleForm() {
      this.articleFormActive = true
      this.sourceActive = false
      this.readingListActive = false
    },
    toggleReadingList() {
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = true
    },
    toggleShowArticle() {
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = false
      this.showArticleActive = true
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
