const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db('african_nomad_safari');
    
    // Create indexes
    await db.collection('blogs').createIndex({ slug: 1 }, { unique: true });
    await db.collection('blogs').createIndex({ createdAt: -1 });
    await db.collection('blogs').createIndex({ category: 1 });
    
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}

module.exports = { connectDB, getDB };
