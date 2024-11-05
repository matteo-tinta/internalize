import { withTryCatchLogging } from "../app/helpers/logging.helpers";
import { DB_CONN_STRING } from "../env/env";
import mongoose from "mongoose";

export type InternalizeMongoClient = Awaited<
  ReturnType<typeof buildMongoClient>
>;
export type InternalizeMongoSession = ReturnType<
  InternalizeMongoClient["startSession"]
>;

const buildMongoClient = async (connectionString: string) => withTryCatchLogging(
  async () => {
    const client = await mongoose.connect(connectionString);
    const startSession = () => client.startSession();
    return {
      client,
      startSession: startSession,
    };
  }
);

export { buildMongoClient, DB_CONN_STRING as InternalizeMongoConnectionString };
