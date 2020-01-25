<template lang="html">
  <div id="source-select">
    <h1>Source Select</h1>
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
</style>
