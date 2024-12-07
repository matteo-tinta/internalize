import DB from "../../../db";
import test, { expect } from "@playwright/test";

test.beforeEach(async () => {
  await DB.cleanup();
});

test("User UI: add a user will show user and popup", async ({page}) => {
  const userId = "user id"
  await page.goto("/users")

  await page.getByPlaceholder(/user id or email/i)
    .fill(userId)

  await page.getByRole("button", {
    name: /Internalize!/i
  }).click()

  const alert = page.locator("[data-alert]")
  const firstTableRow = page.locator("table tbody tr:nth-child(1)")

  await alert.waitFor().then(async () => {
    const alertText = await alert.textContent()
    expect(alertText).toBe(`User ${userId} was internalized!`)
  })

  await firstTableRow.waitFor().then(async () => {
    const userIdText = await firstTableRow.locator("td:nth-child(2)").textContent()
    expect(userIdText).toBe(userId)
  })
})

test("User UI: add a role to a user show role and popup", async ({page}) => {
  const userId = "userId"
  const roles = [
    { _id: DB.generateObjectId(), name: "role1" },
    { _id: DB.generateObjectId(), name: "role2" }
  ]

  await DB.seed("users", [
    { _id: DB.generateObjectId(), userId: userId }
  ]);

  await DB.seed("roles", roles);

  await page.goto("/users")

  const firstTableRow = page.locator("table tbody tr:nth-child(1)")
  await page.locator("table tbody tr:nth-child(1)").waitFor().then(async () => {
    await firstTableRow.click()
  })

  await page.waitForURL('/users/**');

  const roleRow = page.locator("table tbody tr:nth-child(1)")
  await roleRow.waitFor()

  const id = roleRow.locator(`input[id="role"]`)
  await id.waitFor().then(async () => {
    await id.click()
    await page.getByText("role1").click()
    await page.locator("body").click()

    const text = await roleRow.getByText("role1").textContent()

    expect(text).toBe("role1")
    const alert = page.locator("[data-alert]")

    await alert.waitFor().then(async () => {
      const alertText = await alert.textContent()
      expect(alertText).toBe(`Role role1 was correctly added to userId`)
    })
  })
})

test("User UI: system roles can be deleted", async ({page}) => {
  /** ARRANGE */
  const userId = "userId"
  const roles = [
    { _id: DB.generateObjectId(), name: "role1", fixed: true },
    { _id: DB.generateObjectId(), name: "role2" }
  ]

  await DB.seed("users", [{ 
    _id: DB.generateObjectId(), 
    userId: userId, 
    roles: [
        roles[0]._id
      ] 
    }
  ]);

  await DB.seed("roles", roles);

  /** ACT */
  await page.goto(`users/${userId}`)

  const roleRow = page.locator("table tbody tr").filter({ hasText: /role1/i })
  await expect(roleRow).toHaveText(/role1/i)

  await roleRow.getByRole("button", { name: /delete role/i }).click()

  page.getByRole("presentation")
    .filter({hasText: /Are you sure.*/i})
    .locator("button")
    .filter({ hasText: /ok/i })
    .click()

  await expect(roleRow).not.toBeVisible()
    
  await expect(page.getByText(/^role role1 was removed.*/i)).toBeVisible()
})