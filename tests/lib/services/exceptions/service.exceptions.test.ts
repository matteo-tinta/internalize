import { isRoleServiceRoleAlreadyExist, isRoleServiceRoleAndUserDoNotExist, isRoleServiceRoleDoesNotExist, isRoleServiceUserDoesNotExist, RoleServiceRoleAlreadyExist, RoleServiceRoleOrUserDoesNotExist, RoleServiceUserDoesNotExist, ServiceExceptionErrorCodes } from "@/app/lib/services/exceptions/service.exception"
import { test, describe } from "@tests/__fixtures/test.fixture"

describe("RoleServiceUserDoesNotExist", () => {

  test("has correct message", () => {
    const error = RoleServiceUserDoesNotExist("userId")

    expect(error.code).toBe(ServiceExceptionErrorCodes.UserNotFound)
    expect(error.message).toBe(`001: user userId does not exist`)
  })

  test("isRoleServiceUserDoesNotExist matches RoleServiceUserDoesNotExist", () => {
    expect(isRoleServiceUserDoesNotExist(RoleServiceUserDoesNotExist("userId"))).toBeTruthy()
  })
})

describe("RoleServiceRoleOrUserDoesNotExist", ({factory}) => {

  test("without user has correct message", () => {
    const error = RoleServiceRoleOrUserDoesNotExist({
      actualRole: factory.dbRole({}),
      actualUser: undefined,
      role: "role",
      userId: "userId"
    })

    expect(error.code).toBe(ServiceExceptionErrorCodes.UserNotFound)
    expect(error.message).toBe(`001: user userId does not exist`)
    expect(isRoleServiceUserDoesNotExist(error)).toBeTruthy()
  })

  test("without role has correct message", () => {
    const error = RoleServiceRoleOrUserDoesNotExist({
      actualRole: undefined,
      actualUser: factory.dbUser({}),
      role: "role",
      userId: "userId"
    })

    expect(error.code).toBe(ServiceExceptionErrorCodes.RoleNotFound)
    expect(error.message).toBe(`100: role role does not exist`)
    expect(isRoleServiceRoleDoesNotExist(error)).toBeTruthy()
  })

  test("without role and user has correct message", () => {
    const error = RoleServiceRoleOrUserDoesNotExist({
      actualRole: undefined,
      actualUser: undefined,
      role: "role",
      userId: "userId"
    })

    expect(error.code).toBe(ServiceExceptionErrorCodes.RoleAndUserNotFound)
    expect(error.message).toBe(`101: role role and userId do not exist`)
    expect(isRoleServiceRoleAndUserDoNotExist(error)).toBeTruthy()
  })
})

describe("RoleServiceRoleAlreadyExist", () => {
  test("has correct message", () => {
    const error = RoleServiceRoleAlreadyExist("roleName")

    expect(error.code).toBe(ServiceExceptionErrorCodes.RoleAlreadyExist)
    expect(error.message).toMatch(`role roleName already exist`)
    expect(isRoleServiceRoleAlreadyExist(error)).toBeTruthy()
  })
})