<template lang="html">
  <div id="select-article-form">
    <!-- each card is a container for the articles of a section -->
    <!-- <pre>{{ JSON.stringify(articles, null, 2) }}</pre> -->
    <!-- <h2 v-if="articles.length > 0">{{ articles[0].sectionName }}</h2> -->
    <!-- <section class="card" v-for="articlesInCategory, category in articles" > -->

    <section class="card" v-for="section in localSections" >
      <!-- <div class="card--content" > -->
      <div class="card--content" v-for="article in localArticles[section]">
        <h3>{{ article.webTitle }}</h3>
        <label for="">Select:</label>
        <input type="checkbox" name="" :value="article" v-model="checkedArticles">
      </div>
    </section>
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
      localSections: this.sections
    }
  },
  props: ['articles', 'sections'],
  watch: {
    articles: function() {
      this.localArticles = this.articles
    },
    sections: function() {
      this.localSections = this.sections
    }
  },
  // computed: {
  //   categories() {
  //     // console.log("keys length", Object.keys(this.localArticles).length);
  //
  //     // if (Object.keys(this.localArticles).length > 0) {
  //       // console.log("how many time is that called inside if", Object.keys(this.localArticles));
  //        Object.keys(this.localArticles)
  //     // }
  //   }
  // },
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
  background-color: #fff;
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex
}

.card--content {
  background-color: #e74c3c;
  min-width: 200px;
  margin: 5px;
}

.inactive {
  display: none;
}

</style>
