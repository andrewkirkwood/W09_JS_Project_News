<template lang="html">
  <div id="select-article-form">
    <!-- each card is a container for the articles of a section -->
    <h1 class="heading" v-if="sourceSelected === 'guardian' " >Guardian</h1>
    <h1 class="heading" v-if="sourceSelected === 'nyt' " >New York Times</h1>
    <input type="submit" name="button" value="Save selected Articles" :class="isClickable()" v-on:click="handleSubmit()" ></input>

    <div class="sections" v-for="section in localSections" >
      <h2>{{ section }}</h2>
      <section class="card"  >
        <div  :class="contentCardClass(article)" v-for="(article, index) in localArticles[section]" @mouseover.self="cardMouseOver(section + index)" @mouseleave.self="cardMouseLeave">
          <h3 >{{ article[`${localTitle}`] }}</h3>

          <div class="hoveredNav" v-if="cardOver === section + index">
            <button  :value="article" v-on:click="addToCheckedArticles(article)" type="button" name="select" value="select">{{checkStatusOfArticle(article)}}</button>

            <button type="button" name="button" v-on:click="handleShowArticle(article)" :value="article">Read</button>
          </div>


        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main'
import NewsService from '../services/NewsService'

export default {
  name: "select-article-form",
  data() {
    return {
      checkedArticles: [],
      localArticles: this.articles,
      localSections: this.sections,
      localTitle: this.title,
      cardOver: false

    }
  },
  props: ['articles', 'sections', 'title', 'sourceSelected'],
  // computed: {
  //
  // },
  watch: {
    title: function() {
      this.localTitle = this.title
    },
    sections: function() {
      this.localSections = this.sections
    }
  },
  methods: {
    handleSubmit() {
      event.preventDefault()
      if (this.checkedArticles.length > 0) {
        eventBus.$emit('toggle-reading-list', this.checkedArticles)
        this.checkedArticles = []
      }
    },
    isClickable() {
      if (this.checkedArticles.length > 0) {
        return "clickable"
      }
      else {
        return "inactive"
      }
    },
    handleShowArticle(item){
      if (this.sourceSelected === "guardian") {
        eventBus.$emit('toggle-show-article', item)
      }
      else {
        window.open(item.url)
      }
    },
    cardMouseOver(index) {
      this.cardOver = index
    },
    cardMouseLeave() {
      this.cardOver = false
    },
    addToCheckedArticles(article) {
      if(this.checkedArticles.includes(article)) {
        let indexOfArticleIncluded = this.checkedArticles.indexOf(article)
        this.checkedArticles.splice(indexOfArticleIncluded, 1)
      }
      else {
        this.checkedArticles.push(article)
      }
    },
    contentCardClass(article) {
      if (this.checkedArticles.includes(article)) {
        return "card--content selected"
      }
      else {
        return "card--content"
      }
    },
    checkStatusOfArticle(article) {
      if (this.checkedArticles.includes(article)) {
        return "unselect"
      }
      else {
        return "select"
      }
    },

    handleRead(item) {
      if (this.sourceSelected === "guardian") {
        eventBus.$emit('toggle-show-article', item)
      }
      else {
        window.open(item.url)
      }
    }
  }
}
</script>

<style lang="css" scoped>

body {
  width: 100%;
  height: 100%;
  background-color: #8e44ad;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

#select-article-form {
  display: flex;
  flex-direction: column;
}

.heading {
  text-align: center;
  margin-bottom: 0;

}

button {
  flex-grow: 1;
  height: 30%;

}

.card {
  background-color: #A5A5A5;
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex
}

.card--content {
  padding: 5px;
  border-radius: 15px;
  background-color: #D1D2D5;
  min-width: 200px;
  margin: 5px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;

}

.card--content:hover {
  background-color: #CDE1F9;
}

h3 {
  padding: 0 5%;
  margin-bottom: 0;
}

.clickable {
  display: flex;
  font-size: 1.5em;
  align-self: center;
}
.inactive {
  display: none;
}

.hoveredNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
}


.selected {
  border: solid #65abff thick;
  background-color: #CDE1F9;

}
</style>
