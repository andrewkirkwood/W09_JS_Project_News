<template lang="">
  <div id="reading-list">

    <div class="reading-list">
      <div class="heading">

        <!-- <select  v-on:change="handleCategorySelection"> -->

        <select v-if="areThereArticles" v-model="selectedSection" v-on:change="handleCategorySelection">
          <option value="allSections" >All categories...</option>
          <option v-for="section in allSections" :value="section">{{section}}</option>
        </select>

        <h2>reading list</h2>

        <form v-if="areThereArticles" v-on:submit.prevent>
          <input  type="text" v-model="search" placeholder="Search">
        </form>
      </div>


      <section class="card" v-if="areThereArticles">
        <div @mouseover.self="cardMouseOver(index, item)" @mouseleave.self="cardMouseLeave()" :class="contentCardClass()" v-for="(item, index) in filteredArticles">
          <header>
            <h5>{{ itemSource(item) }}</h5>
            <h4 :class="item.section">{{ item.section }}</h4>
          </header>
          <h3>{{ item.title }}</h3>

          <div class="hoveredNav" v-if="cardOverIndex === index">
          <!-- <div class="hoveredNav" > -->
            <a  v-on:click="handleDelete(item)"><img class="cross" src="../assets/cross.png">Remove</a>
            <a  v-on:click="handleRead(item)"><img class="cross" src="../assets/view.svg"> {{readButtonText}}</a>

          </div>

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
  props: ['filteredArticles', 'allSections', 'savedReadingListItems'],
  data() {
    return {
      search: "",
      selectedSection: "",
      cardOverIndex: false,
      readButtonText: ""

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
      return this.savedReadingListItems.length !== 0
      // console.log(this.filteredArticles.length !== 0);
    }
  },
  methods: {
    handleDelete(item) {
      NewsService.deleteArticle(item._id)
      eventBus.$emit('remove-article', item)
    },
    handleCategorySelection() {
      if(this.selectedSection !== "" ){
        console.log(this.selectedSection);
        eventBus.$emit('category-filter-change', this.selectedSection)
      }
      else {
        eventBus.$emit('category-filter-change', "allSections")
      }
    },
    contentCardClass() {
      // if cardover = true --> class is hovered more things are shown
      // else
      if (this.cardover) {
        return "card--content selected"
      }
      else {
        return "card--content"
      }
    },
    cardMouseOver(index, item) {
      this.cardOverIndex = index
      if (item.source === "guardian") {
        return this.readButtonText = "Read"
      }
      else {
        return this.readButtonText = "Open"
      }
    },
    cardMouseLeave() {
      this.cardOverIndex = false
      this.readButtonText = ""

    },
    handleRead(item) {
      if (item.source === "guardian") {
        eventBus.$emit('toggle-show-article', item)
      }
      else {
        window.open(item.url)
      }
    },
    itemSource(item) {
      if (item.source === "guardian") {
        return "Guardian"
      }
      else {
        return "New York Times"
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
  border: 2px solid black;
  border-radius: 15px;
  padding: 2px 5px 2px 5px;
}

h3 {
  padding: 0 5%;
  margin-bottom: 0;
  grid-column: 1/3;
}

h4 {
  justify-self: self-start;
  font-size: 1.1em;
}

h5 {
  justify-self: self-end;

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
  background-color: #F6C198;
  /* border: 3px solid black; */
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
  background-color: ghostwhite;
  border: 1px solid black;
  min-width: 200px;
  max-width: 200px;
  margin: 5px;
  padding: 10px;
  min-height: 215px;
  max-height: 215px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px auto 1fr;
  justify-items: center;
}

.card--content:hover {
  background-color: #CDE1F9;
}

a {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

}

a:hover {
  background-color: #F6C198;

  }

.cross {
  box-sizing: border-box;
  height: 25px;
  opacity: 0.4;
  margin: 10%;

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


.hoveredNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  grid-column: 1/3;
  justify-items: stretch;
  align-items: center;
  align-self: end;
  margin-bottom: 10%;
}

header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-column: 1/3;
}

.technology {
  color: rgb(23, 148, 28)
}

.business{
  color: rgb(26, 22, 208)
}

.food {
  color: rgb(238, 29, 29)
}

.travel {
  color: rgb(172, 158, 34)
}

.world {
  color: rgb(237, 129, 17)
}

</style>
