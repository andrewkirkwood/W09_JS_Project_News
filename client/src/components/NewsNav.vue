<template lang="html">
  <div id="news-nav">
    <div class="topnav">
      <h1>read://it</h1>

      <button id="plus-button" :style='{"background-color" : (readingListActive || showArticleActive? "#CDE1F9" : "transparent")}' type="button" name="button" v-on:click="handleRead"><img class="plus" src="../assets/book_icon.png">READ</button>
      <button id="plus-button" :style='{"background-color" : (sourceActive || articleFormActive? "#CDE1F9" : "transparent")}' type="button" name="button" v-on:click="handleAdd"><img class="plus" src="../assets/plus.png">ADD</button>
    </div>
  </div>

</template>

<script>

import {eventBus} from '../main'
export default {
  name: 'news-nav',
  data(){
    return {
      // search: "",
    }
  },

  props: ['readingListActive', 'articleFormActive', 'sourceActive', 'showArticleActive'],
  methods: {
    handleAdd(){
      eventBus.$emit('toggle-select-source')
    },
    handleRead(){
      eventBus.$emit('toggle-reading-list', [])
    }
  }

}
</script>

<style lang="css" scoped>

/* Add a black background color to the top navigation bar */
.topnav {
  /* overflow: hidden; */
  background-color: #F4D7C1;
  height: 5em;
  border-radius: 3px;
  display: flex;
}

.topnav > h1 {
  font-size: 3em;
  align-self: center;
  margin: 0.5em;
}

/* Style the links inside the navigation bar */
/* .topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
} */

/* Style the "active" element to highlight the current page */
/* .topnav a.active {
  background-color: #2196F3;
  color: white;
} */

/* Style the search box inside the navigation bar */
/* .topnav input[type=text] {
  float: right;
  height: 70px;
  width: 350px;
  vertical-align: middle;
  border: none;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-right: 16px;
  font-size: 40px;
} */

button {
  height: 60px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  align-self: center;
}

#plus-button:hover {
  background-color: #CDE1F9;
}

.plus {
  height: 1.5em;
  /* border-radius: 10px; */
  background-color: transparent;
}

#plus-button {
  font-family: 'IM Fell English', serif;
  font-size: 2em;
  /* border-radius: 15px; */
  background-color: transparent;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-right: 16px;
  margin-left: 20px;
  /* border: 1px solid black; */
}

/* .search {
  border-radius: 15px;
} */


</style>
