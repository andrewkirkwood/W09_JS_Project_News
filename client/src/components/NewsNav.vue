<template lang="html">
  <div id="news-nav">
    <div class="topnav">
      <select v-model="selectedSection" v-on:change="handleCategorySelection">
        <option disabled value="">Filter by category</option>
        <option v-for="section in allSections" :value="section">{{section}}</option>
      </select>
      <form v-on:submit.prevent>
        <input  type="text" v-model="search" placeholder="Search">
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
      search: "",
      selectedSection: ""
    }
  },
  props: ['allSections'],
  methods: {
    handleAdd(){
      eventBus.$emit('toggle-select-source')
    },
    handleRead(){
      eventBus.$emit('toggle-reading-list', [])
    },
    handleCategorySelection() {
      eventBus.$emit('category-filter-change', this.selectedSection)
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

button {
  height: 80px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
}

.plus:hover {
  background-color: #BBE8B3;

}

.plus {
  height: 60px;
  border-radius: 18px;
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


</style>
