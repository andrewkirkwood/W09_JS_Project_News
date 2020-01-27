<template lang="html">
  <div id="news-nav">
    <h1>test</h1>
    <button type="button" name="button" v-on:click="handleClick">New Articles</button>
    <form v-on:submit.prevent>
      <input type="text" v-model="search" placeholder="search for an article...">
    </form>
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
    handleClick(){
      eventBus.$emit('toggle-select-source')
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
</style>
