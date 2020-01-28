<template lang="html">
  <div id="id">
    <link href="https://fonts.googleapis.com/css?family=IM+Fell+English" rel="stylesheet">

    <h1>read://it</h1>


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

<style lang="css">

body {
  background-color: #F2F2F2;
}


</style>

<style lang="css" scoped>
h1 {
font-size: 100px;
text-align: center;
font-family: 'IM Fell English', serif;
margin: 0px 0px;
}
</style>
