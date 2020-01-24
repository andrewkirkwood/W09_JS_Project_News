const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')
const apiKey = require('./helpers/api_key')


app.use(bodyParser.json());


/// check api
MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('news');
    const newsCollection = db.collection('bookings');
    const newsRouter = createRouter(newsCollection);
    app.use(`https://content.guardianapis.com/${apiKey}`, newsRouter);
  })
  .catch(console.err);

  app.listen(3000, function () {
    console.log(`listening on port ${ this.address().port }`)
  })
