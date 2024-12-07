import {test, describe} from "@tests/__fixtures/test.fixture"
import { IUserRepository } from '@/app/lib/services/_interfaces/repositories/IUserRepository'
import { RoleService } from '@/app/lib/services/roles/role.service'
import { UserService } from '@/app/lib/services/user/user.service'
import { MockedObject } from "vitest"
import { Role } from '@/app/lib/domain/role/role.domain'

vi.mock("@/app/lib/domain/role/role.domain")
const roleMocked = vi.mocked(Role)

describe("UserService", ({factory, mocks}) => {
  let userRepo: MockedObject<IUserRepository>
  let roleService: MockedObject<RoleService>
  
  beforeEach(() => {
    userRepo = factory.mock<IUserRepository>({
      getUserByIdAsync: vi.fn(),
      addUserAsync: vi.fn(async () => { })
    })    

    roleService = factory.mock<RoleService>({
      all: vi.fn()
    })

    roleMocked.insertMany.mockResolvedValue([])
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

    roleService.all.mockResolvedValueOnce(factory.dbRoleAsArray([
      { name: "role1" },
      { name: "role2" }
    ]))
    
    const service = buildService()
    //ACT

    await service.addUserAsync(userId, roles)

    //ASSERT
    expect(roleMocked.insertMany).toHaveBeenNthCalledWithMatch(1, [
      { name: "role3" }, { name: "role4" }
    ])
    
    const [dto] = userRepo.addUserAsync.mock.calls[0]

    expect(dto).toMatchObject(factory.dbUser({
      userId: userId
    }))

  })
})