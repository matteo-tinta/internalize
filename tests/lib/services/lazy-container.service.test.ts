import { buildMongoClient } from '@/app/lib/infrastructure/persistence/mongo-client'
import { LazyContainer } from '@/app/lib/services/lazy-container.service'
import {test, describe} from "@tests/__fixtures/test.fixture"
import { startSession } from 'mongoose'
import { Container } from 'postcss'

vi.mock('@/app/lib/infrastructure/persistence/mongo-client', () => ({
  buildMongoClient: vi.fn(async () => ({
    startSession: vi.fn()
  })),
  InternalizeMongoConnectionString: ""
}))

const buildMongoClientMock = vi.mocked(buildMongoClient)

describe("LazyContainer", () => {
  test("user service is lazy initialized", async () => {
    const container = new LazyContainer()

    expect(buildMongoClientMock).not.toHaveBeenCalled()

    const mongo = await container.mongo;
    const userService = await container.userService;
    const roleService = await container.roleService;
    const actionsService = await container.actionsService;

    [
      mongo,
      userService,
      roleService,
      actionsService
    ].forEach((obj) => expect(obj).toBeDefined())

    expect(buildMongoClientMock).toHaveBeenCalledOnce()
  })
})