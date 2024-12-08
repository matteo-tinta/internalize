import DB from "../../../db";
import test, { expect } from "@playwright/test";
import { testWithSeed } from '../../_fixtures/test.fixture';

test.beforeEach(async () => {
  await DB.cleanup();
});

[
  { fixed: true },
  { fixed: false }
].forEach(async ({ fixed }) => {
  testWithSeed(`Roles UI: ${fixed ? '': 'not'} fixed roles cannot be removed`, async ({page, seed, db}) => {
    /** ARRANGE */
    const roles = [
      { _id: db.generateObjectId(), name: "role1", fixed: fixed },
    ]
    
    await seed(async (db) => {
        await db.seed("roles", roles);
    })
  
    await page.goto("/roles")
  
    const roleRow = page.locator("table tbody tr").filter({hasText: /role1/i})

    if(!fixed) {
      await expect(roleRow).not.toHaveClass(/disabled/i)
    }
    else {
      await expect(roleRow).toHaveClass(/disabled/i)
      await expect(roleRow.textContent()).resolves.toMatch(/system role/i)
  
      const removeButton = roleRow.locator("button")
      await expect(removeButton.isDisabled()).resolves.toBeTruthy()
    }
  });

  testWithSeed(`Roles UI: can add action to ${fixed ? '': 'not'} fixed role`, async ({page, db, seed}) => {
    /** ARRANGE */
    const actions = [
      { _id: db.generateObjectId(), name: "action_name" }
    ]
  
    const roles = [
      { _id: db.generateObjectId(), name: "role1", fixed: fixed },
    ]

    await seed(async (db) => {
      await db.seed("roles", roles);
      await db.seed("actions", actions);
    })
  
  
    await page.goto(`/roles`)
  
    await page
      .locator("table tbody tr")
      .filter({hasText: /role1/i})
      .click()
  
    await page.waitForURL(`/roles/${roles[0].name}`)
  
    const actionRow = page.locator("table tbody tr:nth-child(1)")
    await expect(actionRow).toBeVisible()
  
    await actionRow.locator(`input[id="action"]`).click()
    await page.getByText(actions[0].name).click()
    await page.locator("body").click()
  
  
    await expect(page.locator("table tbody tr td").filter({hasText: actions[0].name})).toHaveText(/action_name/i, {
      timeout: 10000
    })
    
    await expect(page.getByText(/Action action_name was added to role1 successfully/i)).toBeVisible()
  })
});
