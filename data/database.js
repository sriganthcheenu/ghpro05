import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

// Validate required environment variables
if (!dbUser || !dbPassword) {
  console.error('ERROR: MongoDB credentials are missing!');
  console.error('Please set MONGODB_USERNAME and MONGODB_PASSWORD environment variables.');
  process.exit(1);
}

if (!connectionProtocol || !clusterAddress || !dbName) {
  console.error('ERROR: MongoDB connection details are incomplete!');
  console.error('Required: MONGODB_CONNECTION_PROTOCOL, MONGODB_CLUSTER_ADDRESS, MONGODB_DB_NAME');
  process.exit(1);
}

const uri = `${connectionProtocol}://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
  process.exit(1);
}

const database = client.db(dbName);

export default database;
