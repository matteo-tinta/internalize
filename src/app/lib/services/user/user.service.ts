import { User, UserType } from "../../domain/user/user.domain"
import { BaseService } from "../base.service"
import { isRoleServiceRoleAlreadyExist, ServiceException } from "../exceptions/service.exception"
import { IUnitOfWorkRepository } from "../_interfaces/repositories/IUowRepository"
import { IUserRepository } from "../_interfaces/repositories/IUserRepository"
import { IRole, RoleType } from "../../domain/role/role.domain"
import { RoleService } from "../roles/role.service"

export class UserService extends BaseService {
  
  constructor(private repository: IUserRepository, 
      private roleService: RoleService,
      protected uof: IUnitOfWorkRepository) {
    super(uof)
  }

  all = async (): Promise<UserType[]> => {
    return await this.repository.all();
  }

  addUserAsync = async (userId: string, roles?: IRole[]) => {
    const dbUser = await this.repository.getUserByIdAsync(userId)
    
    if(dbUser){
      throw new ServiceException(`User ${userId} already exist`)
    }

    const user = new User({
      userId: userId
    })

    await this.uof.commitAsync(async () => {
      await this.repository.addUserAsync(user)

      if(!!roles?.length) {
        await Promise.all(roles.map(
          role => this.roleService.addRoleToUserAsync(userId, role.name)
          .catch((error) => { 
            if(!isRoleServiceRoleAlreadyExist(error)){
              throw error
            }

            //ignore if the role already exist
          })
        ))
      }
    })
  }

  deleteUserAsync = async (userId: string) => {
    const dbUser = await this.repository.getUserByIdAsync(userId)
    
    if(!dbUser){
      throw new ServiceException(`User ${userId} not exist`)
    }

    const user = new User({
      userId: userId
    })

    await this.uof.commitAsync(async () => {
      await this.repository.deleteAsync(user)
    })
  }
}