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
<!-- <pre>{{ JSON.stringify(articles, null, 2) }}</pre> -->

<!-- <news-nav :allSections="allSections"></news-nav> -->
<news-nav :articleFormActive="articleFormActive" :readingListActive="readingListActive" :sourceActive="sourceActive" :showArticleActive="showArticleActive" ></news-nav>


<!-- <select-article-form v-if="articleFormActive"  :articles="articles" :sections="sections"/> -->

<!-- <select-article-form v-if="sections" :articles="articles" :sections="sections" :title='title'/> -->
<select-article-form v-if="articleFormActive" :sourceSelected="sourceSelected" :articles="articles" :sections="sections" :title='title'/>
<source-select v-if="sourceActive"/>
<reading-list v-if="readingListActive" :filteredArticles="filteredArticles" :allSections="allSections" :savedReadingListItems="savedReadingListItems" />
<show-article v-if="showArticleActive" :articleToShow="articleToShow"/>
</div>

</template>

<script>
import {eventBus} from '../main'
import NewsService from '../services/NewsService.js'

import fetch_assistant_guardian from '../services/fetch_assistant_guardian'
import fetch_assistant_nyt from '../services/fetch_assistant_nyt'

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
      articleToShow: null,

      searchTerm: "",
      selectedCategory: "allSections",

      sourceActive: false,
      articleFormActive: false,
      readingListActive: true,
      showArticleActive: false,
      allSections: ["business", "technology", "food", "world", "travel"],
      selectedHeader: "readingList",
      sections: null,
      sourceSelected: "guardian",
      title: ""
    }
  },
  computed: {
    filteredArticles: function(){
      if (this.searchTerm || this.selectedCategory ) {
        let filteredArticlesBySearchTerm = this.filterArticlesBySearchTerm(this.savedReadingListItems, this.searchTerm)
        let filteredArticlesBySearchTermAndSelectedCategory = this.filterArticlesByCategory(filteredArticlesBySearchTerm, this.selectedCategory)
        return filteredArticlesBySearchTermAndSelectedCategory
      }
      return this.savedReadingListItems
    }
  },
  mounted() {

    this.fetchReadingList()

    this.readingListClass()
    this.addArticleClass()

    eventBus.$on('search-entered', search => {
      this.searchTerm = search
    })

    eventBus.$on('category-filter-change', category => {
      this.selectedCategory = category
    })

    eventBus.$on('toggle-select-source', () => {
      this.toggleSelectSource()
      this.selectedHeader = "addNewArticle"
    })

    eventBus.$on('toggle-select-article-form', source => {
      this.sourceSelected = source
      this.fetchAllArticles(this.allSections, source)
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
      this.fetchArticleGuardian()
      this.toggleShowArticle()
      this.selectedHeader = "readingList"
    })
  },
  methods: {
    fetchAllArticles(arrayOfCategories, source) {
      const promises = arrayOfCategories.map(category => {
        // return this.fetchAssistant(source, category.toLowerCase())
        return this.fetchAssistant(source).getArticleBySection(category)
        .then(articlesToAdd => {
          this.articles[category] = articlesToAdd;
        })
        .then(res => {
          this.title = this.selectTitleProperty()
          console.log("is it logging?", this.title)
        })
        .catch(console.error)
      })
      Promise.all(promises)
      .then(sections => {
        this.sections = Object.keys(this.articles);
        console.log("line after section:", this.sections);
      });
    },
    fetchAssistant(source, category) {
      if (source === 'guardian') {
        this.sourceSelected = 'guardian'
        return fetch_assistant_guardian
      }
      else if (source === 'nyt') {
        this.sourceSelected = 'nyt'
        return  fetch_assistant_nyt
      }
    },
    fetchReadingList() {
      NewsService.getArticles()
      .then(res => this.savedReadingListItems = res)
    },
    fetchArticleGuardian() {
      if (this.selectedArticle) {
        this.fetchAssistant("guardian").getArticle(this.selectedArticle.apiUrl)
        // fetch_assistant_guardian.getArticle(this.selectedArticle.apiUrl)
        .then(res => this.articleToShow = res)
      }
    },
    // fetchSections() {
    //   fetch_assistant_guardian.getAllSections()
    //   .then(res => this.allSections = res.map(item => item.webTitle))
    // },
    filterArticlesByCategory(articles, category) {
      if (category === "allSections") {
        return articles
      }
      else {
        let filteredArticlesByCategory = articles.filter(article => {
          return article.section.toLowerCase() === category
        })
        return filteredArticlesByCategory
      }
    },
    filterArticlesBySearchTerm(articles, searchTerm) {
      const foundArticles = articles.filter(article => {
        const title = article.webTitle || article.title;
        return title.toLowerCase().includes(searchTerm)
      })
      return foundArticles
    },
    addNewArticles(payload) {
      // const mapOfTitles = payload.map(item => item.title || item.webTitle)
      const mapOfExistingTitles = this.savedReadingListItems.map(item => item.title)
      const newItems = payload.filter(item =>
        !mapOfExistingTitles.includes(item.title || item.webTitle))

      newItems.forEach(item => {
        NewsService.postArticles(item)
          .then(article => this.savedReadingListItems.push(article));
      });

      // newItems.forEach(item => this.savedReadingListItems.push(item) )
    },
    readingListClass() {
      return  this.selectedHeader === "readingList" ? "headerActive" : "headerInactive"
    },
    addArticleClass() {
      return  this.selectedHeader === "addNewArticle" ? "headerActive" : "headerInactive"
    },
    // getReadingList() {
    //
    // },
    toggleSelectSource() {
      this.sourceActive = true
      this.readingListActive = false
      this.articleFormActive = false
      this.showArticleActive = false

    },
    toggleSelectArticleForm() {
      this.articleFormActive = true
      this.sourceActive = false
      this.readingListActive = false
      this.showArticleActive = false

    },
    toggleReadingList() {
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = true
      this.showArticleActive = false

    },
    toggleShowArticle() {
      this.articleFormActive = false
      this.sourceActive = false
      this.readingListActive = false
      this.showArticleActive = true
    },
    selectTitleProperty() {
      if (this.sourceSelected === 'nyt') {
        return "title"
      }
      else if (this.sourceSelected === 'guardian'){
        return "webTitle"
      }
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
