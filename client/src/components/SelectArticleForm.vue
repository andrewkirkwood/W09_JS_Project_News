<template lang="html">
  <div id="select-article-form">
    <!-- each card is a container for the articles of a section -->
    <!-- <pre>{{ JSON.stringify(articles, null, 2) }}</pre> -->
    <!-- <h2 v-if="articles.length > 0">{{ articles[0].sectionName }}</h2> -->
    <!-- <section class="card" v-for="articlesInCategory, category in articles" > -->

<div class="sections" v-for="section in localSections" >
    <h2>{{ section }}</h2>
    <section class="card"  >
      <div class="card--content" v-for="article in localArticles[section]">
        <h3 v-on:click="handleShowArticle(article)">{{ article[`${title}`] }}</h3>
        <label for="">Select:</label>
        <input type="checkbox" name="" :value="article" v-model="checkedArticles">
      </div>
    </section>
  </div>

    <input type="submit" name="button" :class="isClickable()" v-on:click="handleSubmit()" ></input>
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
      localTitle: this.title

    }
  },
  props: ['articles', 'sections', 'title'],
  computed: {

  },
  watch: {
    title: function() {
      this.localTitle = this.title
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
      eventBus.$emit('toggle-show-article', item)
    }
  }
}
</script>

<style lang="css" scoped>
body {
  width: 100%;
  height: 100%;
}

body {
  background-color: #8e44ad;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
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
}

.card--content:hover {
  background-color: #CDE1F9;
}

.inactive {
  display: none;
}

</style>
