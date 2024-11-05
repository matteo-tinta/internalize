import mongoose from "mongoose";
import { DB_CONN_STRING } from "../../env";
import { withTryCatchLogging } from "../../helpers/logging.helpers";

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
