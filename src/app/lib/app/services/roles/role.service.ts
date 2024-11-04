import { Role } from "../../domain/role/role.domain";
import { BaseService } from "../base.service";
import { ServiceException } from "../exceptions/service.exception";
import { IRoleRepository } from "../interfaces/repositories/IRoleRepository";
import { IUnitOfWorkRepository } from "../interfaces/repositories/IUowRepository";

export class RoleService extends BaseService {
  constructor(
    private repository: IRoleRepository,
    protected uof: IUnitOfWorkRepository
  ) {
    super(uof);
  }

  all = async () => {
    return await this.repository.all();
  };

  addRoleAsync = async (name: string) => {
    const actualDbRole = await this.repository.getRoleByNameAsync(name);

    if (actualDbRole) {
      throw new ServiceException(`role ${name} already exist`);
    }

    const role: Role = {
      name: name,
    };

    await this.uof.commitAsync(async () => {
      await this.repository.addRoleAsync(role);
    });
  };
}
