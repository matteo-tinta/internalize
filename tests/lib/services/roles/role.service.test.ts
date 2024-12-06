import { RoleType } from "@app/lib/domain/role/role.domain"
import { UserType } from "@app/lib/domain/user/user.domain"
import { IUserRepository } from "@app/lib/services/_interfaces/repositories/IUserRepository"
import { RoleServiceUserDoesNotExist, ServiceException, ServiceExceptionErrorCodes } from "@app/lib/services/exceptions/service.exception"
import { test, describe } from "@fixtures/test.fixture"
import { IRoleRepository } from "@lib/services/_interfaces/repositories/IRoleRepository"
import { RoleService } from "@lib/services/roles/role.service"
import { MockedObject } from "vitest"

describe("RoleService", ({factory}) => {
  const repoReturns = factory.build<RoleType[]>([
    {
      name: "Mocked Role 1",
      actions: [{
        name: "action_type_1"
      }]
    }
  ])

  const buildService = () => factory.service(RoleService, roleRepo, userRepo)

  let roleRepo: MockedObject<IRoleRepository>
  let userRepo: MockedObject<IUserRepository>

  beforeEach(() => {
    roleRepo = factory.mock<IRoleRepository>({
      all: vi.fn(),
      getRoleByNameAsync: vi.fn(),

    })

    userRepo = factory.mock<IUserRepository>({
      getUserByIdAsync: vi.fn()
    })
  })

  test("all: should return repository content", async () => { 
    roleRepo.all.mockResolvedValueOnce(repoReturns)

    const service = buildService()

    const result = await service.all()

    expect(result).toMatchObject(repoReturns)
  })

  test("getRolesByUserId: throws '001' if user is not found", async () => {
    userRepo.getUserByIdAsync.mockResolvedValueOnce(undefined)

    const service = buildService()

    await expect(service.getRolesByUserId("askedUserId"))
      .rejects
      .toThrow(RoleServiceUserDoesNotExist("askedUserId"))
  })

  test(`addRoleToUserAsync: throws ${ServiceExceptionErrorCodes.RoleNotFound} when role is not found`, async () => {
    roleRepo.getRoleByNameAsync.mockResolvedValueOnce(null)
    userRepo.getUserByIdAsync.mockResolvedValue(factory.dbUser({
      userId: "userId"
    }))
    
    const service = buildService()

    await expect(service.addRoleToUserAsync("userId", "role"))
      .rejects
      .toThrow(new ServiceException(`role role does not exist`, ServiceExceptionErrorCodes.RoleNotFound))
  })
})