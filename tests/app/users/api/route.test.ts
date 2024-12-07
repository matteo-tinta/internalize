import { Container, ContainerExecuteDependencies } from "@/app/lib/services/container.service";
import { RoleService } from "@/app/lib/services/roles/role.service"
import { test, describe } from "@tests/__fixtures/test.fixture"
import { NextRequest } from "next/server";
import { MockedObject } from "vitest"
import {
  buildDecodeRequestAsync,
  encryptReponseForClient,
  parseDecodeResponseAsync,
} from "@/app/users/api/route.helpers";
import {GET} from "@/app/users/api/route"
import { RoleServiceUserDoesNotExist } from "@/app/lib/services/exceptions/service.exception";
import { UserService } from "@/app/lib/services/user/user.service";

vi.mock("@/app/users/api/route.helpers")
vi.mock("@/app/lib/services/container.service")

const buildDecodeRequestAsyncMocked = vi.mocked(buildDecodeRequestAsync)
const encryptReponseForClientMocked = vi.mocked(encryptReponseForClient)
const parseDecodeResponseAsyncMocked = vi.mocked(parseDecodeResponseAsync)
const containerMocked = vi.mocked(Container)

describe("GET", ({factory}) => {
  let roleService: MockedObject<RoleService>
  let userService: MockedObject<UserService>
  
  beforeEach(() => {
    containerMocked.mockImplementation(async (exec) => {
      await exec(factory.build<ContainerExecuteDependencies>({
        roleService: roleService,
        userService: userService
      }))
    })

    encryptReponseForClientMocked
      .mockImplementation(({response}) => {
        return {
          contentType: "application/json",
          value: JSON.stringify(response)
        }
      })

    buildDecodeRequestAsyncMocked.mockResolvedValue({
      execute: (async () => { }) as any,
      publicKey: ""
    })

    parseDecodeResponseAsyncMocked.mockResolvedValue({
      userId: "userId",
      roles: [
        "role1"
      ]
    })

    roleService = factory.mock<RoleService>({
      getRolesByUserId: vi.fn()
    })
    userService = factory.mock<UserService>({
      addUserAsync: vi.fn()
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test("does not throws when user id is found", async () => {
    const nextRequest = factory.build<NextRequest>({})

    roleService.getRolesByUserId.mockResolvedValueOnce(
      factory.dbRoleAsArray([
        {
          populate: vi.fn(async () => factory.dbRole({
            name: "role1",
            actions: []
          }))
        }
      ])
    )

    await GET(nextRequest)

    const [{response: generatedResponse}] = encryptReponseForClientMocked.mock.calls[0]
    expect(generatedResponse).toMatchObject({
      userId: "userId",
      roles: [
        {
          name: "role1",
          actions: []
        }
      ]
    })
  })

  test("does not throws when user id is not found, it creates the user in DB", async () => {
    //ASSERT
    const nextRequest = factory.build<NextRequest>({})

    userService.addUserAsync.mockResolvedValue(undefined)

    roleService.getRolesByUserId
      .mockRejectedValueOnce(RoleServiceUserDoesNotExist("userId"))
      .mockResolvedValueOnce(factory.dbRoleAsArray([
        {
          populate: vi.fn(async () => factory.dbRole({
            name: "role1",
            actions: []
          }))
        }
      ]))

    //ACT
    await GET(nextRequest)

    //ASSERT
    const [userId, roles] = userService.addUserAsync.mock.calls[0]
    expect(userId).toBe("userId")
    expect(roles).toMatchObject([{
      name: "role1",
    }])
    
    const [{response: generatedResponse}] = encryptReponseForClientMocked.mock.calls[0]
    expect(generatedResponse).toMatchObject({
      userId: "userId",
      roles: [{
        name: "role1",
        actions: []
      }]
    })
  })
})