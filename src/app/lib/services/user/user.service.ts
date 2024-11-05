import { User, UserType } from "../../domain/user/user.domain"
import { BaseService } from "../base.service"
import { ServiceException } from "../exceptions/service.exception"
import { IUnitOfWorkRepository } from "../_interfaces/repositories/IUowRepository"
import { IUserRepository } from "../_interfaces/repositories/IUserRepository"

export class UserService extends BaseService {
  
  constructor(private repository: IUserRepository, protected uof: IUnitOfWorkRepository) {
    super(uof)
  }

  all = async (): Promise<UserType[]> => {
    return await this.repository.all();
  }

  addUserAsync = async (userId: string) => {
    const dbUser = await this.repository.getUserByIdAsync(userId)
    
    if(dbUser){
      throw new ServiceException(`User ${userId} already exist`)
    }

    const user = new User({
      userId: userId
    })

    await this.uof.commitAsync(async () => {
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
}