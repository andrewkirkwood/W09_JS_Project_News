<template lang="html">
  <div id="news-nav">
    <h1>test</h1>
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
</style>
