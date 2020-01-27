<template lang="">
  <div id="reading-list">

    <div class="reading-list">


      <h2>Reading List</h2>

      <section class="card" >
        <div class="card--content" v-for="item in filteredArticles">
          <h3 v-on:click="handleShowArticle(item)" >{{ item.webTitle }}</h3>
          <h4>{{ item.sectionID }}</h4>
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
  props: ['filteredArticles'],
  methods: {
    handleDelete(item) {
      NewsService.deleteArticle(item._id)
      eventBus.$emit('remove-article', item)
    },
    handleShowArticle(item) {
      eventBus.$emit('toggle-show-article', item)
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
  border: 5px solid #9F9FED;
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 940px;
}

.card--content {
  border-radius: 25px;
  background-color: #F2DFD7;
  min-width: 200px;
  max-width: 200px;
  margin: 5px;
  padding: 10px;
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

</style>
