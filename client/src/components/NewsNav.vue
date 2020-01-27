<template lang="html">
  <div id="news-nav">

    <div class="topnav">
      <select name="news-catagories">
        <option value="world">World News</option>
        <option value="uk">UK News</option>
        <option value="tech">Tech News</option>
        <option value="min-of-baz">Inside The Mind Of Baz</option>
      </select>

      <input type="text" placeholder="Search..">
    </div>

    <button type="button" name="button" v-on:click="handleClick">New Articles</button>
  </div>

</template>

<script>

import {eventBus} from '../main'
export default {
  name: 'news-nav',

  methods: {
    handleClick(){
      eventBus.$emit('toggle-select-source')
    }
  }
}
</script>

<style lang="css" scoped>

h1 {
font-size: 80px;
text-align: center;
font-family: 'IM Fell English', serif;
padding: 0;
}

/* Add a black background color to the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #45B097;
  height: 100px;
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
  height: 70px;
  width: 350px;
  vertical-align: middle;
  border: none;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-right: 16px;
  font-size: 40px;
}

</style>
