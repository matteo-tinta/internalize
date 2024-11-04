import { BaseService } from "../base.service";
import { IRoleRepository } from "../interfaces/repositories/IRoleRepository";
import { IUnitOfWorkRepository } from "../interfaces/repositories/IUowRepository";

export class RoleService extends BaseService {
  constructor(private repository: IRoleRepository, protected uof: IUnitOfWorkRepository) {
    super(uof);
  }
  

  all = async () => {
    return await this.repository.all()
  }
}