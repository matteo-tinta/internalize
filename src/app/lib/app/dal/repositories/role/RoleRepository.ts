import { InternalizeDbName, InternalizeMongoClient } from "@/app/lib/mongo/mongo-client";
import { Role } from "../../../domain/role/role.domain";
import { IRoleRepository } from "../../../services/interfaces/repositories/IRoleRepository";

export class RoleRepository implements IRoleRepository {

  collectionName: string = "roles";
  constructor(private mongo: InternalizeMongoClient) {}

  all: () => Promise<Role[]> = async () => {
    const client = await this.mongo.db(InternalizeDbName!)

    const cursor = client.collection(this.collectionName).find()

    const roles: Role[] = []
    for await (const user of cursor){
      roles.push(user as unknown as Role)
    }

    return roles
  };
  
}