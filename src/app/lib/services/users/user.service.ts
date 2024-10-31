import { User } from "../../domain/user.domain"
import { BaseService } from "../base.service"
import { IUnitOfWorkRepository } from "../interfaces/repositories/IUowRepository"
import { IUserRepository } from "../interfaces/repositories/IUserRepository"

export class UserService extends BaseService {
  constructor(private repository: IUserRepository, protected uof: IUnitOfWorkRepository) {
    super(uof)
  }

  addUserAsync = async (userId: string) => {

    const user: User = {
      userId: userId
    }

    await this.uof.commitAsync(async () => {
      await this.repository.addUserAsync(user)
    })
  }
}