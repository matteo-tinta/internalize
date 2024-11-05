import { InternalizeDbName, InternalizeMongoClient } from "@/app/lib/mongo/mongo-client";
import { Role, RoleType } from "../../../domain/role/role.domain";
import { IRoleRepository } from "../../../services/interfaces/repositories/IRoleRepository";

export class RoleRepository implements IRoleRepository {

  collectionName: string = "roles";
  constructor(private mongo: InternalizeMongoClient) {}
  
  

  all: () => Promise<RoleType[]> = async () => {
    return await Role.find()
  };

  async addRoleAsync(role: RoleType) {
    await role.save()
  }

  async getRoleByNameAsync(name: string): Promise<RoleType | null> {
    return await Role.findOne({
      name: name
    })
  }
 
  async deleteRoleAsync(actualDbRole: RoleType) {
    await Role.findOneAndDelete({
      name: actualDbRole.name
    })
  }
}