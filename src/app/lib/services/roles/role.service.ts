import { Role } from "../../domain/role/role.domain";
import { BaseService } from "../base.service";
import { ServiceException } from "../exceptions/service.exception";
import { IRoleRepository } from "../_interfaces/repositories/IRoleRepository";
import { IUnitOfWorkRepository } from "../_interfaces/repositories/IUowRepository";
import { IUserRepository } from "../_interfaces/repositories/IUserRepository";

export class RoleService extends BaseService {
  
  
  constructor(
    private repository: IRoleRepository,
    private userRepository: IUserRepository,
    protected uof: IUnitOfWorkRepository
  ) {
    super(uof);
  }

  all = async () => {
    return await this.repository.all();
  };

  getRolesByUserId = async (userId: string) => {
    const user = await this.userRepository.getUserByIdAsync(userId)
    if(!user){
      throw new ServiceException(`user ${userId} does not exist`)
    }

    const {roles} = await user.populate("roles");
    
    return roles
  }

  addRoleAsync = async (name: string) => {
    const actualDbRole = await this.repository.getRoleByNameAsync(name);

    if (actualDbRole) {
      throw new ServiceException(`role ${name} already exist`);
    }

    const role = new Role({
      name: name,
    });

    await this.uof.commitAsync(async () => {
      await this.repository.addRoleAsync(role);
    });
  };

  async deleteRoleAsync(name: string) {
    const actualDbRole = await this.repository.getRoleByNameAsync(name);

    if(!actualDbRole){
      throw new ServiceException(`role ${name} does not exist`)
    }

    await this.uof.commitAsync(
      async () => this.repository.deleteRoleAsync(actualDbRole)
    )
  }
}
