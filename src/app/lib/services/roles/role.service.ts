import { Role } from "../../domain/role/role.domain";
import { BaseService } from "../base.service";
import { RoleServiceRoleOrUserDoesNotExist, RoleServiceUserDoesNotExist, ServiceException } from "../exceptions/service.exception";
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
      throw RoleServiceUserDoesNotExist(userId)
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

  addRoleToUserAsync = async (userId: string, role: string) => {
    const actualDbRole = await this.repository.getRoleByNameAsync(role);
    const actualUser = await this.userRepository.getUserByIdAsync(userId);

    if (!actualDbRole || !actualUser) {
      throw RoleServiceRoleOrUserDoesNotExist({
        actualRole: actualDbRole,
        actualUser: actualUser,
        role: role,
        userId: userId
      })
    }

    await actualUser.populate("roles")
    actualUser.roles = [
      ...actualUser.roles,
      actualDbRole
    ]

    await this.uof.commitAsync(async () => {
      await actualUser.save()
    });
  }

  async deleteRoleAsync(name: string) {
    const actualDbRole = await this.repository.getRoleByNameAsync(name);

    if(!actualDbRole){
      throw new ServiceException(`role ${name} does not exist`)
    }

    await this.uof.commitAsync(
      async () => this.repository.deleteRoleAsync(actualDbRole)
    )
  }

  async removeRoleFromUser(userId: string, role: string) {
    const actualDbRole = await this.repository.getRoleByNameAsync(role);
    const actualUser = await this.userRepository.getUserByIdAsync(userId);

    if (!actualDbRole || !actualUser) {
      throw new ServiceException(`role ${role} or user ${userId} does not exist`);
    }

    actualUser.roles = actualUser.roles.filter(f => f._id.toString() != actualDbRole._id.toString())

    console.log({
      actualUser
    })

    await this.uof.commitAsync(async () => {
      await actualUser.save()
    });
  }
}
