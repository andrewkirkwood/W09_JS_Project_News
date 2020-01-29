<template lang="">
  <div id="reading-list">
    <link href="https://fonts.googleapis.com/css?family=IM+Fell+English" rel="stylesheet">

    <div class="reading-list">
      <div class="heading">
        <h2>reading list</h2>
        <!-- <select  v-on:change="handleCategorySelection"> -->

        <select v-model="selectedSection" v-on:change="handleCategorySelection">
          <option value="allSections" >All categories...</option>
          <option v-for="section in allSections" :value="section">{{section}}</option>
        </select>

        <form v-on:submit.prevent>
          <input  type="text" v-model="search" placeholder="Search">
        </form>
      </div>


      <section class="card" v-if="areThereArticles">
        <div class="card--content" v-for="item in filteredArticles">
          <h3 v-on:click="handleShowArticle(item)" >{{ item.title }}</h3>
          <h4>{{ item.section }}</h4>
          <h5>{{ item.source }}</h5>

          <button type="button" name="button" v-on:click="handleDelete(item)"><img class="cross" src="../assets/cross.png"></button>
          <!-- <a :href="fetchArticleAPI"></a> -->
          <!-- <p>news and possibly an image. There will almost certainly be a headline here but mayebe not an image. A plus button will most likely be present and that will be just awesome. cqcn eqfqfv vdwfv fqsfcsq feqfq fqfqfwq fwqdfwqf fwqfwq fwqfqw fqwfq</p> -->
        </div>
      </section>
    </div>

  </div>

</template>

<script>
import NewsService from '../services/NewsService.js'
import {eventBus} from '../main'

export default {
  name: "reading-list",
  props: ['filteredArticles', 'allSections'],
  data() {
    return {
      search: "",
      selectedSection: ""

    }
  },
  watch: {
    search: function() {
      eventBus.$emit("search-entered", this.search)
    // },
    // filteredArticles: function() {
    //   this.filteredArticles
    }
  },
  computed: {
    areThereArticles: function () {
        return this.filteredArticles.length !== 0
      console.log(this.filteredArticles.length !== 0);
    }
  },
  methods: {
    handleDelete(item) {
      NewsService.deleteArticle(item._id)
      eventBus.$emit('remove-article', item)
    },
    handleShowArticle(item) {
      eventBus.$emit('toggle-show-article', item)
    },
    handleCategorySelection() {
      if(this.selectedSection !== "" ){
        console.log(this.selectedSection);
        eventBus.$emit('category-filter-change', this.selectedSection)
      }
      else {
        eventBus.$emit('category-filter-change', "allSections")
      }
    }
  }
}
</script>

<style lang="css" scoped>
html,
body {
  width: 100%;
  height: 100%;
}

body {
  background-color: #D4C1EC;
}

h1 {
  text-align: center;
}

h2 {
  font-family: 'IM Fell English', serif;
  border: 2px solid black;
  border-radius: 15px;
  padding: 2px 5px 2px 5px;
}

p {
  max-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reading-list {
  border: 5px 5px 5px 5px solid black;
  /* size: 100%; */
  display: flex;
  align-items: center;
  flex-direction: column;
}

.card {
  background-color: #A5A5A5;
  border: 3px solid black;
  border-radius: 15px;
  padding: 10px 2px 10px 2px;
  /* this seems to cause an issue. Commented out and delete when sure */
  /* min-height: 500px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 940px;
}

.card--content {
  border-radius: 25px;
  background-color: #D1D2D5;
  border: 1px solid black;
  min-width: 200px;
  max-width: 200px;
  margin: 5px;
  padding: 10px;
}

.card--content:hover {
  background-color: #CDE1F9;
}

button {
  height: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.cross:hover {
background-color: #F79A9A;
filter: hue-rotate(180);
}

.cross {
  height: 20px;
  opacity: 0.4;
}

.heading {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  grid-gap: 1em;
}

form {
  display: flex;
  height: 2.3em;
}

select {
  height: 3em;
}
</style>
