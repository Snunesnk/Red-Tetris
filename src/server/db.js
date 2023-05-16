const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://red-tetris-db:27017/red-tetris";

const initDb = () => {
  console.log("Going to connect to db");
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Error while connecting to MongoDB: " + err);
      throw err;
    }
    console.log("MongoDB connected!");
  });
};

module.exports = initDb;
