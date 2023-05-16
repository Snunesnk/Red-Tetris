const { MongoClient } = require("mongodb");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    const client = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
    });
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectDB;
