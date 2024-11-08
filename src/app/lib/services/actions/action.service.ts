import { Action } from "../../domain/action/action";
import { BaseService } from "../base.service";
import { ServiceException } from "../exceptions/service.exception";
import { IActionRepository } from "../_interfaces/repositories/IActionRepository";
import { IUnitOfWorkRepository } from "../_interfaces/repositories/IUowRepository";
import { IRoleRepository } from "../_interfaces/repositories/IRoleRepository";

export class ActionsService extends BaseService {
  
  
  constructor(private repository: IActionRepository, 
      private roleRepository: IRoleRepository,
      protected uof: IUnitOfWorkRepository) {
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

  async getActionsByRole(roleName: string) {
    const role = await this.roleRepository.getRoleByNameAsync(roleName)
    if(!role){
      throw new ServiceException(`${role} does not exist`)
    }

    const {actions} = await role.populate("actions");

    return actions
  }

  async addActionToRole(role: string, action: string) {
    const actualDbRole = await this.roleRepository.getRoleByNameAsync(role);
    const actualAction = await this.repository.getActionByNameAsync(action);

    if(!actualDbRole || !actualAction){
      throw new ServiceException(`role ${role} or ${action} does not exist`)
    }

    await actualDbRole.populate("actions")
    actualDbRole.actions = [
      ...actualDbRole.actions,
      actualAction
    ]

    await this.uof.commitAsync(async () => {
      await actualDbRole.save()
    })
  }

  async removeActionFromRole(role: string, action: string) {
    const actualDbRole = await this.roleRepository.getRoleByNameAsync(role);
    const actualAction = await this.repository.getActionByNameAsync(action);

    if(!actualDbRole || !actualAction){
      throw new ServiceException(`role ${role} or ${action} does not exist`)
    }

    await actualDbRole.populate("actions")
    actualDbRole.actions = actualDbRole.actions.filter(roleAction => roleAction._id.toString() != actualAction._id.toString())

    await this.uof.commitAsync(async () => {
      await actualDbRole.save()
    })
  }
}