const { MongoClient } = require('mongodb');

class MongoConnection {
  connect(serverUrl, dbName = '') {
    this.serverUrl = serverUrl;

    let url = serverUrl;
    if (dbName) {
      url = `${serverUrl}/${dbName}`;
    }

    return this.createConnection(serverUrl, dbName).then((dbConnectionAndDatabase) => {
      this.db = dbConnectionAndDatabase.db;
      this.connection = dbConnectionAndDatabase.connection;
      return Promise.resolve(this.db);
    });
  }
 
  createConnection(serverUrl, dbName) {
    let url = serverUrl;
    if (dbName) {
      url = `${serverUrl}/${dbName}`;
    }
    return new Promise((resolve, reject) => {
      MongoClient.connect(url)
        .then((connection) => {
          const db = connection.db(dbName);
          resolve({
            connection,
            db,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  collection(name) {
    return this.db.collection(name);
  }

  close() {
    this.connection.close();
  }
}

module.exports = new MongoConnection();
