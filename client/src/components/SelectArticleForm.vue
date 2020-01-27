<template lang="html">
  <div id="select-article-form">
    <!-- each card is a container for the articles of a section -->
    <h2>{{ articles[0].sectionName }}</h2>
    <section class="card" >
      <div v-if="articles" class="card--content" v-for="item in articles">
        <h3>{{ item.webTitle }}</h3>
        <label for="">Select:</label>
        <input type="checkbox" name="" :value="item" v-model="checkedArticles">
      </div>
    </section>

    <input type="submit" name="button"  v-on:click="handleSubmit(checkedArticles)" ></input>
  </div>

</template>

<script>
import {eventBus} from '../main'
import NewsService from '../services/NewsService'

export default {
  name: "select-article-form",
  data() {
    return {
      checkedArticles: []
    }
  },
  props: ['articles'],
  methods: {
    handleSubmit(checkedArticles) {
      event.preventDefault()
      this.checkedArticles.forEach(item => NewsService.postArticles(item))
      eventBus.$emit('toggle-reading-list', this.checkedArticles)
      this.checkedArticles = []

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
</style>
