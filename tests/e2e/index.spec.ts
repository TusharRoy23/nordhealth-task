import { test, expect } from "@playwright/test";

test.describe("Sign Up Page", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API route before each test
    await page.route("**/api/signup", async (route) => {
      const requestData = route.request().postDataJSON();
      console.log("requestData: ", requestData);
      // Simulate successful response
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/");
  });

  test("should submit the form", async ({ page }) => {
    // Fill inputs using reliable selectors
    await page.fill('input[name="email"]', "valid@example.com");
    await page.fill('input[name="password"]', "ValidPass123!");
    await page.fill('input[name="confirmPassword"]', "ValidPass123!");

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();

    const form = page.locator("form");
    await form.evaluate((form) =>
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      ),
    );

    // Verify navigation
    await expect(page).toHaveURL("/thank-you");
  });

  test("should display validation errors for invalid inputs", async ({
    page,
  }) => {
    const form = page.locator("form");

    await page.fill('input[name="email"]', "valid@example.com");
    await form.evaluate((form) => form.dispatchEvent(new Event("submit")));

    await expect(
      page.getByText("Password is required", { exact: true }),
    ).toBeVisible();

    // Fill in invalid email and short password
    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "123");
    await page.fill('input[name="confirmPassword"]', "123");

    await expect(
      page.getByText("Please enter a valid email", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Password must be at least 6 characters", { exact: true }),
    ).toBeVisible();

    await page.fill('input[name="password"]', "123456");
    await expect(
      page.getByText("Password must contain at least one uppercase letter", {
        exact: true,
      }),
    ).toBeVisible();

    await page.fill('input[name="password"]', "123456A");
    await expect(
      page.getByText("Password must contain at least one lowercase letter", {
        exact: true,
      }),
    ).toBeVisible();

    await page.fill('input[name="password"]', "123456Aa");
    await expect(
      page.getByText("Password must contain at least one special character", {
        exact: true,
      }),
    ).toBeVisible();

    await page.fill('input[name="password"]', "123456@Aa😀");
    await expect(
      page.getByText("Password cannot contain emojis", { exact: true }),
    ).toBeVisible();

    await page.fill('input[name="password"]', "123456@Aa ");
    await expect(
      page.getByText("Password cannot contain spaces", { exact: true }),
    ).toBeVisible();

    // Fill in mismatched passwords
    await page.fill('input[name="password"]', "12345@Aa");
    await page.fill('input[name="confirmPassword"]', "12345@A");
    await expect(
      page.getByText("Passwords do not match", { exact: true }),
    ).toBeVisible();
  });
});
