<template lang="html">
  <div id="source-select">
    <h1>Select News Source</h1>
    <br>
    <ul>
      <li v-on:click="handleClick('guardian')">Guardian</li>
      <li v-on:click="handleClick('nyt')">New York Times</li>
    </ul>
  </div>

</template>

<script>
import {eventBus} from '../main'
export default {
  name: 'source-select',

  methods: {
    handleClick(source) {
      eventBus.$emit('toggle-select-article-form', source)
    }
  }
}
</script>

<style lang="css" scoped>

h1 {
  font-size: 50px;
  text-align: center;
}

li {
  font-size: 50px;
  text-align: center;
  font-family: 'IM Fell English', serif;
  list-style: none;
  cursor: pointer;
  border: 8px solid black;
  border-radius: 15px;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px
}

li:hover {
  background-color: #CDE1F9;
}

ul {
  margin-left: auto;
  margin-right: auto;
}


</style>
