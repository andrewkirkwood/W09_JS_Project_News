import api_key from './api_key'


export default {

getArticleBySection(section) {
  fetch(`https://content.guardianapis.com/search?section=${section}&${api_key}`)
          .then(response => response.json())
}


}
