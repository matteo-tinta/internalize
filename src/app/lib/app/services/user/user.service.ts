import { User } from "../../domain/user/user.domain"
import { BaseService } from "../base.service"
import { ServiceException } from "../exceptions/service.exception"
import { IUnitOfWorkRepository } from "../interfaces/repositories/IUowRepository"
import { IUserRepository } from "../interfaces/repositories/IUserRepository"

export class UserService extends BaseService {
  
  constructor(private repository: IUserRepository, protected uof: IUnitOfWorkRepository) {
    super(uof)
  }

  all = async (): Promise<User[]> => {
    return await this.repository.all();
  }

  addUserAsync = async (userId: string) => {
    const dbUser = await this.repository.getUserByIdAsync(userId)
    
    if(dbUser){
      throw new ServiceException(`User ${userId} already exist`)
    }

    const user: User = {
      userId: userId
    }

    await this.uof.commitAsync(async () => {
      await this.repository.addUserAsync(user)
    })
  }
}