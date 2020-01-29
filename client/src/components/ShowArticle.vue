<template lang="html">
  <div v-if="articleToShow" class="">
    <article>
      <header>
      <h2>
        {{articleToShow.webTitle}}
      </h2>
    </header>
      <main v-html="articleToShow.fields.body">
      </main>
    </article>
  </div>
</template>

<script>
export default {
  name: "show-article",
  props: ['articleToShow']
}
</script>

<style lang="css" scoped>

article {
  font-family: 'Playfair Display', serif;
  font-size: 1.2em;

    margin: 2em;
    padding: 1em;
    text-align: justify;
    background-color: #F6C19877;
    border-radius: 15px;
}

article >>> figure   {
  border-left: 4px solid pink;
  font-size: 1em;
  padding-left: 1em;
}
</style>
