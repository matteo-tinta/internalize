import test, {expect} from "@playwright/test"
import { testWithSeed } from '../../_fixtures/test.fixture';
import DB from '../../../db'

test.afterEach(() => {
  DB.cleanup()
})

test("Actions UI: can add an action", async ({page}) => {
  await page.goto("/actions")

  const actionNameField = page.getByPlaceholder("Action name")
  await expect(actionNameField).toBeVisible()

  await page.getByPlaceholder("Action name").fill("action_1")
  await page.locator("form", { has: actionNameField }).locator("button", { hasText: /create/i }).click()
  
  const actionCell = page.locator("table tr td", {hasText: "action_1"})
  await expect(actionCell).toBeVisible()

  await expect(page.locator('[data-alert="true"]', {hasText: "ok"})).toBeVisible()
})

testWithSeed("Actions UI: can delete an action", async ({page, seed}) => {
  await seed(async (db) => {
    await db.seed("actions", [{
      id: db.generateObjectId(), name: "actions_1"
    }])
  })

  await page.goto("/actions")
  
  await page.locator("table tr", {hasText: /actions_1/i}).locator("button").click()

  const modal = page.getByRole("presentation")
  
  const modalTitle = modal.getByText(/Are you sure you want to delete action actions_1\?/i)
  const modalContent = modal.getByText(/Deleting this action/i)
  const modalOkButton = modal.locator("button", { hasText: /ok/i })

  await expect(modalTitle).toBeVisible()
  await expect(modalContent).toBeVisible()
  
  await modalOkButton.click()

  await expect(page.locator("table tr", {hasText: /actions_1/i})).not.toBeVisible()
  await expect(page.locator('[data-alert="true"]', {hasText: /action actions_1 was deleted/i})).toBeVisible()
})