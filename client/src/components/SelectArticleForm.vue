<template lang="html">
  <div id="select-article-form">
    <!-- each card is a container for the articles of a section -->
    <div class="sections" v-for="section in localSections" >
      <h2>{{ section }}</h2>
      <section class="card" :style="cardStyle">
        <img class="left-arrow" src="../assets/Arrow-Left-icon.png" alt="arrow left" v-on:click="moveLeft">
        <div  :class="contentCardClass(article)" v-for="(article, index) in localArticles[section]" @mouseover.self="cardMouseOver(section + index)" @mouseleave.self="cardMouseLeave">
          <h3 v-on:click="handleShowArticle(article)">{{ article[`${localTitle}`] }}</h3>
          <button v-if="cardOver === section + index" :value="article" v-on:click="addToCheckedArticles" type="button" name="select">Select</button>
        </div>
        <img class="right-arrow" src="../assets/Arrow-Right-icon.png" alt="arrow right" v-on:click="moveRight">
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
      localTitle: this.title,
      cardOver: false,
      cardMarginLeft: 53
    }
  },
  props: ['articles', 'sections', 'title'],
  computed: {
    cardStyle: function(){
      return `margin-left: ${this.cardMarginLeft}px`
    }
  },
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
      eventBus.$emit('toggle-show-article', item)
    },
    cardMouseOver(index) {
      this.cardOver = index
    },
    cardMouseLeave() {
      this.cardOver = false
    },
    moveLeft(){
      this.cardMarginLeft -= 100
    },
    moveRight(){
      let newCardMarginLeft = this.cardMarginLeft + 100
      if (newCardMarginLeft > 53){
        newCardMarginLeft = 53
      }
      this.cardMarginLeft = newCardMarginLeft
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
  .inactive {
    display: none;
  }

  .selected {
    border: solid #65abff thick;
    background-color: #CDE1F9;
  }

  i {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .left-arrow {
    height: 200px;
    align-self: center;
    z-index: 3;
    position: absolute;
    left: 0px;
    background: #A5A5A5;
    opacity: 85%;
  }

  .right-arrow {
    height: 200px;
    align-self: center;
    z-index: 3;
    position: absolute;
    right: 0px;
    background: #A5A5A5;
    opacity: 85%;
  }

</style>
