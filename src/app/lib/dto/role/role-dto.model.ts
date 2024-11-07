import { IRole } from "../../domain/role/role.domain"

const roleToDto = (role: IRole): IRole => {
  return ({
    name: role.name
  })
}

export {
  roleToDto
}