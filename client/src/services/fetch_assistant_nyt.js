import {NYT_API_KEY} from './api_key'

export default {

  getArticleBySection(section) {
    return fetch(`https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${NYT_API_KEY}`)
      .then(response => response.json())
      .then(data => data.results)
  }
}
