const baseURL = 'http://localhost:3000/api/articles/'


export default {
  getArticles() {
    return fetch(baseURL)
    .then(res => res.json())
  },
  postArticles(payload) {
    payload.title = payload.webTitle || payload.title;
    delete payload.webTitle;

    payload.section = payload.sectionId || payload.section;
    delete payload.sectionId;


    if (!payload.source) {
      payload.source = "guardian"
    }
    else if (payload.source) {
      payload.source = "nyt"
    }
    // payload.source = (!payload.source) ? "guardian" : "nyt";

    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },
  deleteArticle(id){
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  }
  // extension? for status read / not-read
  // updateArticle(id, payload) {
  //   return fetch(baseURL + id, {
  //     method: 'POST',
  //     body: JSON.stringify(payload),
  //     headers: { 'Content-Type': 'application/json'}
  //   })
  //   .then(res => res.json())
}
