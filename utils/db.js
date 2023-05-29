const mongo = require('mongodb');

class DBClient {
  constructor() {
    this.db = null;
    this.client = null;
    this.url = 'mongodb://localhost:27017';
    mongo.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
      if (err) console.log(err);
      this.client = client;
      this.db = client.db('files_manager');
    });
  }

  isAlive() {
    return !!this.client && !!this.db;
  }

  async nbUsers() {
    const users = await this.db.collection('users').find().toArray();
    return users.length;
  }

  async nbFiles() {
    const files = await this.db.collection('files').find().toArray();
    return files.length;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
