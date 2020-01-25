<template lang="html">
  <div id="select-article-form">
    <!-- each card is a container for the articles of a section -->
    <h2>{{ articles[0].sectionName }}</h2>
    <section class="card" >
      <div class="card--content" v-for="item in articles"><h3>{{ item.webTitle }}</h3></div>
    </section>
  </div>

</template>

<script>
export default {
  name: "select-article-form",
  props: ['articles']
}
</script>

<style lang="css" scoped>
body {
  width: 100%;
  height: 100%;
}

body {
  background-color: #8e44ad;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

.card {
  background-color: #fff;
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex
}

.card--content {
  background-color: #e74c3c;
  min-width: 200px;
  margin: 5px;
}
</style>
