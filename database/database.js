const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'

// connection URL
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = client;