const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // Fallback to in-memory MongoDB if connecting to local fails or no URI
    if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
      try {
        const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/soliva', { serverSelectionTimeoutMS: 2000 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (err) {
        console.log(`Local MongoDB not found. Starting in-memory MongoDB...`);
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
      }
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;