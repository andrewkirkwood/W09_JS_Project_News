<template lang="">
  <div id="reading-list">
    <div class="topnav">
      <select name="news-catagories">
        <option value="world">World News</option>
        <option value="uk">UK News</option>
        <option value="tech">Tech News</option>
        <option value="min-of-baz">Inside The Mind Of Baz</option>
      </select>

      <input type="text" placeholder="Search..">
    </div>
    <div class="reading-list">
      <h2>Reading List</h2>

      <section class="card" >
        <div class="card--content" v-for="item in savedReadingListItems">
          <h3>{{ item.webTitle }}</h3>
          <h4>{{ item.sectionID }}</h4>
          <!-- <a :href="fetchArticleAPI"></a> -->
          <!-- <p>news and possibly an image. There will almost certainly be a headline here but mayebe not an image. A plus button will most likely be present and that will be just awesome. cqcn eqfqfv vdwfv fqsfcsq feqfq fqfqfwq fwqdfwqf fwqfwq fwqfqw fqwfq</p> -->
        </div>
      </section>
    </div>

  </div>

</template>

<script>
import {eventBus} from '../main'
export default {
  name: "reading-list",
  props: ['savedReadingListItems'],
  // data() {
  //   return {
  //     readingListItems: []
  //   }
  // },

  // methods: {

    // fetchArticleAPI() {
      // should call fetch assistant -> find one article
    // }
  // }
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


/* Add a black background color to the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Style the "active" element to highlight the current page */
.topnav a.active {
  background-color: #2196F3;
  color: white;
}

/* Style the search box inside the navigation bar */
.topnav input[type=text] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

.card {
  border: 5px solid #9F9FED;
  min-height: 200px;
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
</style>
