import { MongoClient, Db } from 'mongodb';

// Ensure you set your MongoDB URI in environment variables
const uri = process.env.MONGODB_URI || '';

// Create a new MongoClient instance
const client = new MongoClient(uri);

let db: Db | null = null;

export async function connectToDatabase() {
  if (db) return { db, client };

  try {
    await client.connect();
    db = client.db(); // Get the default database
    console.log('Connected to MongoDB');
    return { db, client };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error; // Propagate the error
  }
}
