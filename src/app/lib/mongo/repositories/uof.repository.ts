import { TransactionOptions } from "mongodb";
import { IUnitOfWorkRepository } from "../../services/interfaces/repositories/IUowRepository";
import { InternalizeMongoClient, InternalizeMongoSession } from "../mongo-client";

export class UnitOfWorkRepository implements IUnitOfWorkRepository {
  constructor(mongo: InternalizeMongoClient) {
    this.session = mongo.startSession()
  }
  
  session: InternalizeMongoSession;
  
  public commitAsync = async (changes: () => Promise<void>) => {
    const transactionOptions: TransactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };

    try {
        await this.session.withTransaction(changes, transactionOptions)

    } catch(error) {
      console.error({error})
    } finally {
      await this.session.endSession()      
    }

  };

}