import { User, UserType } from "../../domain/user/user.domain"
import { BaseService } from "../base.service"
import { isRoleServiceRoleAlreadyExist, isRoleServiceRoleDoesNotExist, ServiceException } from "../exceptions/service.exception"
import { IUnitOfWorkRepository } from "../_interfaces/repositories/IUowRepository"
import { IUserRepository } from "../_interfaces/repositories/IUserRepository"
import { IRole, Role, RoleType } from "../../domain/role/role.domain"
import { RoleService } from "../roles/role.service"
import mongoose from "mongoose"

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

    const dbRoles = await this.getOrCreateAllRoles(roles)

    await this.uof.commitAsync(async () => {
      //add missing roles
      await Role.insertMany(dbRoles.filter(f => f.add))

      //create a user entity
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        roles: dbRoles
      })

      //store that user on DB
      await this.repository.addUserAsync(user)
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

  /** Given a list of roles, returns the ones that already on DB and create a role to be added the next save */
  private getOrCreateAllRoles = async (roles?: IRole[]): Promise<(IRole & {add?: boolean})[]> => {
    if(!roles?.length){
      return []
    }

    const dbRoleList = await this.roleService.all()
    return roles.reduce((prev, role) => {
        const actual = dbRoleList.find(f => f.name.toLowerCase() == role.name.toLowerCase())

        //if exist, return actual stored role
        if(actual){
          return [
            ...prev,
            actual
          ]
        }

        //if not add a new element that will be created on DB
        return [
          ...prev,
          {
            _id: new mongoose.Types.ObjectId(),
            name: role.name,
            add: true
          } as RoleType & {add?: boolean}
        ]

      }, [] as (IRole & {add?: boolean})[])
  }
}