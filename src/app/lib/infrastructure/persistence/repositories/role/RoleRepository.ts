import { RoleType, Role } from "@/app/lib/domain/role/role.domain";
import { IRoleRepository } from "@/app/lib/services/_interfaces/repositories/IRoleRepository";
import { InternalizeMongoClient } from "../../mongo-client";

export class RoleRepository implements IRoleRepository {
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