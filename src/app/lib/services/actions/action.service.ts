import { Action } from "../../domain/action/action";
import { BaseService } from "../base.service";
import { ServiceException } from "../exceptions/service.exception";
import { IActionRepository } from "../_interfaces/repositories/IActionRepository";
import { IUnitOfWorkRepository } from "../_interfaces/repositories/IUowRepository";

export class ActionsService extends BaseService {
  

  
  constructor(private repository: IActionRepository, protected uof: IUnitOfWorkRepository) {
    super(uof);
    
  }
  
  async addActionAsync(name: string) {
    const actionName = name.toLowerCase()
    const actualDbAction = await this.repository.getActionByNameAsync(actionName)

    if(actualDbAction){
      throw new ServiceException(`action ${actionName} already exist`)
    }

    const action = new Action({
      name: actionName.toLowerCase()
    })

    await this.uof.commitAsync(async () => {
      await this.repository.addActionAsync(action)
    })
  }

  all = async () => {
    return await this.repository.all()
  }
  
  async deleteActionAsync(actionName: string) {
    const dbUser = await this.repository.getActionByNameAsync(actionName)
    
    if(!dbUser){
      throw new ServiceException(`action ${actionName} does not exist`)
    }

    const action = new Action({
      name: actionName
    })

    await this.uof.commitAsync(async () => {
      await this.repository.deleteAsync(action)
    })
  }
}