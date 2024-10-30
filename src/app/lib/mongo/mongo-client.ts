import { MongoClient } from "mongodb"
import { DB_CONN_STRING, DB_NAME } from "../env/env";

const buildMongoClient = (connectionString: string) => async (dbName: string) => {
  const client: MongoClient = new MongoClient(connectionString);
  await client.connect();
  return client.db(dbName);
};

const mongo = buildMongoClient(DB_CONN_STRING!)

export {
  mongo,
  DB_NAME as InternalizeDbName
}