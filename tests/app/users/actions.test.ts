import * as actions from "@/app/users/actions"

import { UserService } from '@/app/lib/services/user/user.service'
import {test, describe} from "@tests/__fixtures/test.fixture"
import { MockedObject } from 'vitest'
import { revalidate } from '@/app/lib/services/cache.service'
import { LazyContainer } from '@/app/lib/services/lazy-container.service'

vi.mock('@/app/lib/services/lazy-container.service')
const containerMocked = vi.mocked(LazyContainer)

describe("users actions", ({ factory }) => {
  let userServiceMock: MockedObject<UserService>
  let revalidateMock: MockedObject<typeof revalidate>

  beforeEach(() => {
    userServiceMock = factory.mock<UserService>({
      all: vi.fn(),
      deleteUserAsync: vi.fn(),
    })

    revalidateMock = factory.mock<typeof revalidate>({
      users: vi.fn()
    })

    containerMocked.mockImplementation(() => factory.mock<LazyContainer>({
      userService: Promise.resolve(userServiceMock),
      revalidate: revalidateMock,
      dispose: vi.fn()
    }))
  })


  test("loading users returns user services all users", async () => {
    const userServiceReturns = factory.dbUserAsArray([
      {
        userId: "userId1"
      },
      {
        userId: "userId2"
      }
    ])

    userServiceMock.all.mockResolvedValue(userServiceReturns)

    const action = await actions.loadUsers()

    expect(action).toMatchObject(userServiceReturns)
  })

  test("deleteUser", async () => {
    const action = await actions.deleteUser({userId: "userId"})

    expect(userServiceMock.deleteUserAsync).toHaveBeenNthCalledWith(1, "userId")
    expect(revalidateMock.users).toHaveBeenCalledOnce()

    expect(action).toMatchObject({
      message: `User userId was successfully deleted`
    })
  })
})