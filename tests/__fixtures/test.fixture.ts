import { test as base, describe as baseDescribe, MockedObject, TestAPI } from "vitest"
import userEvent from '@testing-library/user-event'
import {render, renderHook} from '@testing-library/react'
import { factory } from "../__factory/factory"
import { IUnitOfWorkRepository } from "@app/lib/services/_interfaces/repositories/IUowRepository"

interface BaseTestFixture {
  user: ReturnType<typeof userEvent.setup>,
  render: typeof render,
  renderHook: typeof renderHook
}

const test = base.extend<BaseTestFixture>({
  user: async ({ }, use) => {
    const user = userEvent.setup()
    await use(user)
  },
  render: async ({ }, use) => await use(render),
  renderHook: async ({ }, use) => await use(renderHook)
})


const describe = (name: string, testFn: (
  api: TestAPI & { 
    factory: typeof factory,
    mocks: {
      uof:  MockedObject<IUnitOfWorkRepository>
    }
  }
) => void | Promise<void>) => {

  const baseUofMocked: MockedObject<IUnitOfWorkRepository> = factory.mock<IUnitOfWorkRepository>({
    commitAsync: vi.fn(async (fn) => await fn())
  })

  baseDescribe(name, (api) => testFn({
    ...api,
    factory: factory,
    mocks: {
      uof: baseUofMocked
    }
  } as any))

}


export {
  test,
  describe
}