import { IUser } from "../../domain/user/user.domain";
import { roleToDto } from "../role/role-dto.model";

type UserDto = {
  roles: ReturnType<typeof roleToDto>[],
  userId: IUser["userId"]
}

const userToDto = (user: IUser): UserDto => {
  return {
    roles: user.roles.map(roleToDto),
    userId: user.userId
  }
}

export {
  userToDto
}