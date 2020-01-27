import {GUARDIAN_API_KEY} from './api_key'


export default {

  getArticleBySection(section) {
    return fetch(`https://content.guardianapis.com/search?section=${section}&api-key=${GUARDIAN_API_KEY}`)
      .then(response => response.json())
      .then(data => data.response.results)
    },

    getArticle(apiUrl){
      return fetch(`${apiUrl}?&show-fields=body&api-key=${GUARDIAN_API_KEY}`)
      // .then(console.log(`${apiUrl}`))
      .then(response => response.json())
      .then(data => data.response.content)
    },
    getAllSections() {
      return fetch(`https://content.guardianapis.com/sections?api-key=${GUARDIAN_API_KEY}`)
      .then(response => response.json())
      .then(data => data.response.results)
    }

  }
