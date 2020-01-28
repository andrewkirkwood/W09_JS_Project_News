<template lang="html">
  <div id="source-select">
    <link href="https://fonts.googleapis.com/css?family=IM+Fell+English" rel="stylesheet">
    <h1>Select News Source</h1>
    <br>
    <ul>
      <li v-on:click="handleClick">Guardian</li>
    </ul>
  </div>

</template>

<script>
import {eventBus} from '../main'
export default {
  name: 'source-select',

  methods: {
    handleClick() {
      eventBus.$emit('toggle-select-article-form')
    }
  }
}
</script>

<style lang="css" scoped>

h1 {
  font-size: 50px;
  text-align: center;
  font-family: 'IM Fell English', serif;
}

li {
  font-size: 40px;
  text-align: center;
  font-family: 'IM Fell English', serif;
  list-style: none;
  cursor: pointer;
  border: 8px solid black;
  border-radius: 15px;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}

li:hover {
  background-color: #C7C8C9;
}

ul {
  margin-left: auto;
  margin-right: auto;
}

</style>
