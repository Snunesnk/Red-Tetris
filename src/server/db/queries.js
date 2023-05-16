const connectDB = require("./db");

const DB_NAME = process.env.DB_NAME || "red_tetris";

const saveScore = (user_score, username) => {
  connectDB()
    .then((client) => {
      const db = client.db(DB_NAME);
      const scoresCollection = db.collection("scores");

      const newScore = { username, user_score };

      scoresCollection
        .insertOne(newScore)
        .then(() => {
          console.log("Score saved successfully");
        })
        .catch((error) => {
          console.error("Error saving score:", error);
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

const getTopTenScores = (res) => {
  connectDB()
    .then((client) => {
      const db = client.db(DB_NAME);
      const scoresCollection = db.collection("scores");

      scoresCollection
        .find({})
        .sort({ user_score: -1 })
        .limit(10)
        .toArray()
        .then((scores) => {
          res.json(scores);
        })
        .catch((error) => {
          console.error("Error retrieving scores:", error);
          res.status(500).json({ error: "Internal Server Error" });
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  saveScore,
  getTopTenScores,
};
