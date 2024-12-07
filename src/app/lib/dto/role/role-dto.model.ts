import { IRole } from "../../domain/role/role.domain"

const roleToDto = (role: IRole): IRole => {
  return ({
    name: role.name,
    fixed: !!role.fixed,
    actions: []
  })
}

export {
  roleToDto
}