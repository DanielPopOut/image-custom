import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DB_URL);

export async function getDb() {
  await client.connect();
  return client.db(process.env.DB_NAME);
}
