use news;
db.dropDatabase();

db.articles.insertMany([
  {
    title: "",
    content: "",
    picture: "",
    url: ""
  }
])
