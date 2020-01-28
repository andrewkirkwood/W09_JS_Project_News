<template lang="html">
  <div id="news-nav">
    <div class="topnav">
      <form v-on:submit.prevent>
        <input class="search" type="text" v-model="search" placeholder="Search">
      </form>
      <button class="plus-button" type="button" name="button" v-on:click="handleRead"><img class="plus" src="../assets/book_icon.png">READ</button>
      <button class="plus-button" type="button" name="button" v-on:click="handleAdd"><img class="plus" src="../assets/plus.png">ADD</button>
    </div>
  </div>

</template>

<script>

import {eventBus} from '../main'
export default {
  name: 'news-nav',
  data(){
    return {
      search: ""
    }
  },
  methods: {
    handleAdd(){
      eventBus.$emit('toggle-select-source')
    },
    handleRead(){
      eventBus.$emit('reading-list-button-clicked', [])
    }
  },
  watch: {
    search: function() {
      eventBus.$emit("search-entered", this.search)
    }
  }
}
</script>

<style lang="css" scoped>

/* Add a black background color to the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #447EC0;
  height: 100px;
  border-radius: 15px;
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

button {
  height: 80px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
}

button:hover {
  background-color: #CDE1F9;
}

.plus:hover {
  background-color: #CDE1F9;
}

.plus {
  height: 60px;
  border-radius: 15px;
}

.plus-button {
  font-size: 60px;
  border: 4px solid black;
  border-radius: 15px;
  background-color: transparent;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-right: 16px;
  margin-left: 20px;
  border: 8px solid black;
}

.search {
  border-radius: 15px;
}


</style>
