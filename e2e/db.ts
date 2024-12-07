import { MongoClient, ObjectId } from "mongodb";
const uri = "mongodb://root:root@127.0.0.1:27017/internalize?authSource=admin";
const db = "internalize"

type CollectionNames = "users" | "roles" | "actions"

// Replace the uri string with your connection string.

async function run(
  exec: (client: MongoClient) => Promise<void>
) {
  const client = new MongoClient(uri);
  try {
    await exec(client)
  } 
  catch(error) {
    console.error(error)
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/** SEEDING FUNCTIONS */
/** removes all the collections from the db */
const cleanup = () => run(
  async (client: MongoClient) => {
    const database = client.db(db);

    const collections: CollectionNames[] = [
      "users",
      "roles",
      "actions"
    ]

    await Promise.all(
      collections.map(collection => database.collection(collection).drop())
    )

    console.log("DB was cleaned")
  }
)

const seed = (collectionName: CollectionNames, records: object[]) => run(
  async (client: MongoClient) => {
    const database = client.db(db);
    const result = await database.collection(collectionName).insertMany(records)
    console.log(`[${collectionName}] ${result.insertedCount} documents were seeded`, result, records)
  }
)

const generateObjectId = () => {
  return new ObjectId()
}

const DB = {
  cleanup,
  seed,
  generateObjectId,
}

export default DB