<template lang="">
  <div id="reading-list">
    <link href="https://fonts.googleapis.com/css?family=IM+Fell+English" rel="stylesheet">

    <div class="reading-list">


      <h2>reading list</h2>

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
  min-height: 500px;
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

</style>
