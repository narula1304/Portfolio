import { test, expect } from "@playwright/test";

/**
 * Scoped to what exists after build step 1 (scaffold). Per the architecture
 * doc's build order, this gets extended into the full smoke test — nav →
 * project case study → contact form — once those organisms ship in steps
 * 4-7. Kept here now so CI has a real, passing e2e test from day one rather
 * than an empty tests/e2e directory.
 */
test("landing page renders the scaffold placeholder", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Prince Narula")).toBeVisible();
  await expect(page.getByText(/scaffold/i)).toBeVisible();
});
