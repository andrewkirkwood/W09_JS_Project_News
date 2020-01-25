import api_key from './api_key'


export default {

getArticleBySection(section) {
  return fetch(`https://content.guardianapis.com/search?section=${section}&api-key=${api_key}`)
          .then(response => response.json())
}


}
