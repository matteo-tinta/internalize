import { MongoClient } from "mongodb"
import { DB_CONN_STRING, DB_NAME } from "../env/env";

export type InternalizeMongoClient = Awaited<ReturnType<typeof buildMongoClient>>
export type InternalizeMongoSession = ReturnType<InternalizeMongoClient["startSession"]>

const buildMongoClient = async (connectionString: string) => {
  const client: MongoClient = new MongoClient(connectionString);
  await client.connect();

  const startSession = () => client.startSession()
  
  return {
    client,
    startSession: startSession,
    transation: startSession().withTransaction,
    db: async (dbName: string) => {
      return client.db(dbName);
    }  
  }
}

export {
  buildMongoClient,
  DB_CONN_STRING as InternalizeMongoConnectionString,
  DB_NAME as InternalizeDbName
}