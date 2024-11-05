import { TransactionOptions } from "mongodb";
import { IUnitOfWorkRepository } from "../../services/interfaces/repositories/IUowRepository";
import { InternalizeMongoClient, InternalizeMongoSession } from "../../../mongo/mongo-client";

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