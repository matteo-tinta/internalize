import test, { expect } from "@playwright/test";
import DB from "../../db"

const seed = async (exec: (db: typeof DB) => Promise<void>) => await(exec(DB))

interface IPlaywrightTestFixture {
  seed: typeof seed,
  db: typeof DB
}

const testWithSeed = test.extend<IPlaywrightTestFixture>({
  db: async ({ }, use) => await use(DB),
  seed: async ({ }, use) => {
    
    await use(seed)


    return 
  }
})

export {
  testWithSeed
}