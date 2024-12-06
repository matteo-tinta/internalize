/** SCHEME 
 * 0 = service, 00 = error
 * services:
 * 0. User
 * 1. Role
 * 2. Actions
*/

import { RoleType } from "../../domain/role/role.domain";
import { UserType } from "../../domain/user/user.domain";

export enum ServiceExceptionErrorCodes {
  Unknown = "000",

  //UserService
  UserNotFound = "001",

  //RoleService
  RoleNotFound = "100",
  RoleAndUserNotFound = "101",
  RoleAlreadyExist = "102",
}

export class ServiceException extends Error {
  constructor(message: string, public code: ServiceExceptionErrorCodes = ServiceExceptionErrorCodes.Unknown) {
    super(`${code}: ${message}`);
    console.trace({
      type: ServiceException.prototype.name,
      code, message
    })
  }
}

/** EXCEPTIONS */
export const RoleServiceUserDoesNotExist = (userId: string) => {
  return new ServiceException(`user ${userId} does not exist`, ServiceExceptionErrorCodes.UserNotFound)
}

export const RoleServiceRoleAlreadyExist = (role: string) => {
  return new ServiceException(`role ${role} already exist`, ServiceExceptionErrorCodes.RoleAlreadyExist)
}

export const RoleServiceRoleOrUserDoesNotExist = (deps: {
  role: string,
  userId: string,
  actualRole: RoleType | null | undefined,
  actualUser: UserType | null | undefined,
}) => {
  const {role, userId, actualRole, actualUser} = deps;

  if(!actualUser && actualRole){
    return RoleServiceUserDoesNotExist(userId)
  }

  if(!actualRole && actualUser) {
    return new ServiceException(`role ${role} does not exist`, ServiceExceptionErrorCodes.RoleNotFound)
  }

  return new ServiceException(
    `role ${role} and ${userId} do not exist`, 
    ServiceExceptionErrorCodes.RoleAndUserNotFound)
}

/** MATCHERS */
export const isRoleServiceUserDoesNotExist = (error: unknown): error is ServiceException => {
  return error instanceof ServiceException && error.code == ServiceExceptionErrorCodes.UserNotFound
}

export const isRoleServiceRoleDoesNotExist = (error: unknown): error is ServiceException => {
  return error instanceof ServiceException && error.code == ServiceExceptionErrorCodes.RoleNotFound
}

export const isRoleServiceRoleAndUserDoNotExist = (error: unknown): error is ServiceException => {
  return error instanceof ServiceException && error.code == ServiceExceptionErrorCodes.RoleAndUserNotFound
}

export const isRoleServiceRoleAlreadyExist = (error: unknown): error is ServiceException => {
  return error instanceof ServiceException && error.code == ServiceExceptionErrorCodes.RoleAlreadyExist
}