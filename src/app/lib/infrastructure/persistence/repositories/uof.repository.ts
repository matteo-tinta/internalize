import { IUnitOfWorkRepository } from "@/app/lib/services/_interfaces/repositories/IUowRepository";
import { TransactionOptions } from "mongodb";
import { InternalizeMongoClient, InternalizeMongoSession } from "../mongo-client";

export class UnitOfWorkRepository implements IUnitOfWorkRepository {
  constructor(private mongo: InternalizeMongoClient) {
    this.session = this.mongo.startSession()
  }
  
  session: InternalizeMongoSession | undefined;
  
  public commitAsync = async (changes: () => Promise<void>) => {
    const transactionOptions: TransactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };
    
    const mongooseSession = await this.session
    try {
      mongooseSession?.startTransaction(transactionOptions)
      await changes()

      console.warn("committing transaction")
      await mongooseSession?.commitTransaction()
    } catch(error) {
      console.error({error})
      await mongooseSession?.abortTransaction()      
    } finally {
      await mongooseSession?.endSession()
    }
  };

}