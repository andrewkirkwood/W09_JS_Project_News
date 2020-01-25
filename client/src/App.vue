<template lang="html">
  <div id="id">
    <web-parent/>
  </div>
</template>

<script>
import WebParent from './components/WebParent.vue'
export default {
  name: 'app',
  components: {
    "web-parent": WebParent
  }
}
</script>

<style lang="css" scoped>
</style>
