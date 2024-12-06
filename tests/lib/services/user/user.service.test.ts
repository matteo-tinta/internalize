import { IUserRepository } from "@app/lib/services/_interfaces/repositories/IUserRepository"
import { RoleServiceRoleAlreadyExist, ServiceException } from "@app/lib/services/exceptions/service.exception"
import { RoleService } from "@app/lib/services/roles/role.service"
import { UserService } from "@app/lib/services/user/user.service"
import {test, describe} from "@fixtures/test.fixture"
import { MockedObject } from "vitest"

describe("UserService", ({factory, mocks}) => {
  let userRepo: MockedObject<IUserRepository>
  let roleService: MockedObject<RoleService>
  
  beforeEach(() => {
    userRepo = factory.mock<IUserRepository>({
      getUserByIdAsync: vi.fn(),
      addUserAsync: vi.fn(async () => { })
    })    

    roleService = factory.mock<RoleService>({
      addRoleToUserAsync: vi.fn()
    })
  })

  const buildService = () => factory.service(UserService, userRepo, roleService, mocks.uof)

  test("addUserAsync: add user with roles when given", async () => {
    //ARRANGE
    const userId = "userId"
    const roles = factory.dbRoleAsArray([
      { name: "role1" },
      { name: "role2" },
      { name: "role3" },
      { name: "role4" },
    ])

    roleService.addRoleToUserAsync
      .mockResolvedValueOnce()
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(RoleServiceRoleAlreadyExist("role3"))
      .mockRejectedValueOnce(new ServiceException("generic error should break"))
    
    const service = buildService()
    //ACT

    await expect(service.addUserAsync(userId, roles))
      .rejects
      .toThrowError(new ServiceException("generic error should break"))

    //ASSERT
    const [dto] = userRepo.addUserAsync.mock.calls[0]
    expect(dto).toMatchObject({
      userId: userId
    })

    expect(roleService.addRoleToUserAsync).toHaveBeenNthCalledWith(1, userId, "role1")
    expect(roleService.addRoleToUserAsync).toHaveBeenNthCalledWith(2, userId, "role2")
    expect(roleService.addRoleToUserAsync).toHaveBeenNthCalledWith(3, userId, "role3")
  })
})