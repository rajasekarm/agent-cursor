import { test, expect } from '@playwright/test';

test.describe('AgentCursor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/index.html');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should initialize cursor and be visible', async ({ page }) => {
    // Check if cursor element exists
    const cursor = await page.locator('div[style*="position: fixed"]').first();
    await expect(cursor).toBeVisible();

    // Verify cursor contains SVG
    const svg = await cursor.locator('svg');
    await expect(svg).toBeVisible();
  });

  test('should move cursor to element', async ({ page }) => {
    const loginButton = page.locator('#run-login-demo');
    await loginButton.waitFor({ state: 'visible' });

    // Click the login demo button
    await loginButton.click();

    // Wait for the demo to start
    await page.waitForTimeout(500);

    // Check that login email input was filled
    const emailInput = page.locator('#login-email');
    await expect(emailInput).toHaveValue('user@example.com');
  });

  test('should type text into input field', async ({ page }) => {
    const loginDemo = page.locator('#run-login-demo');
    await loginDemo.click();

    // Wait for typing to complete
    await page.waitForTimeout(2000);

    // Verify email was typed
    const emailInput = page.locator('#login-email');
    await expect(emailInput).toHaveValue('user@example.com');

    // Verify password was typed
    const passwordInput = page.locator('#login-password');
    await expect(passwordInput).toHaveValue('password123');
  });

  test('should check checkbox', async ({ page }) => {
    const loginDemo = page.locator('#run-login-demo');
    await loginDemo.click();

    // Wait for demo to complete
    await page.waitForTimeout(4000);

    // Verify checkbox was checked
    const rememberMe = page.locator('#login-remember');
    await expect(rememberMe).toBeChecked();
  });

  test('should select dropdown option by index', async ({ page }) => {
    const registerDemo = page.locator('#run-register-demo');
    await registerDemo.click();

    // Wait for the event log to show country selection
    const logOutput = page.locator('#log-output');
    await expect(logOutput).toContainText('Selected: Australia', {
      timeout: 20000,
    });

    // Verify country dropdown value was set
    const countrySelect = page.locator('#register-country');
    await expect(countrySelect).toHaveValue('au');
  });

  test('should handle complete login form flow', async ({ page }) => {
    const loginDemo = page.locator('#run-login-demo');
    await loginDemo.click();

    // Wait for event log to show completion
    const logOutput = page.locator('#log-output');
    await expect(logOutput).toContainText('Login Demo Complete', {
      timeout: 10000,
    });

    // Verify all fields were filled
    await expect(page.locator('#login-email')).toHaveValue('user@example.com');
    await expect(page.locator('#login-password')).toHaveValue('password123');
    await expect(page.locator('#login-remember')).toBeChecked();
  });

  test('should handle complete registration form flow', async ({ page }) => {
    const registerDemo = page.locator('#run-register-demo');
    await registerDemo.click();

    // Wait for event log to show completion
    const logOutput = page.locator('#log-output');
    await expect(logOutput).toContainText('Register Demo Complete', {
      timeout: 15000,
    });

    // Verify all fields were filled
    await expect(page.locator('#register-name')).toHaveValue('John Doe');
    await expect(page.locator('#register-email')).toHaveValue(
      'john.doe@example.com'
    );
    await expect(page.locator('#register-password')).toHaveValue(
      'securepass123'
    );
    await expect(page.locator('#register-country')).toHaveValue('au');
    await expect(page.locator('#register-terms')).toBeChecked();
  });

  test('should destroy cursor when destroy button clicked', async ({
    page,
  }) => {
    // Cursor should exist initially
    const cursor = await page.locator('div[style*="position: fixed"]').first();
    await expect(cursor).toBeVisible();

    // Click destroy button
    const destroyButton = page.locator('#destroy-cursor');
    await destroyButton.click();

    // Wait a bit for destruction
    await page.waitForTimeout(500);

    // Verify event log shows cursor destroyed
    const logOutput = page.locator('#log-output');
    const logText = await logOutput.textContent();
    expect(logText).toContain('Cursor destroyed');
  });

  test('should log events to event log', async ({ page }) => {
    const loginDemo = page.locator('#run-login-demo');
    await loginDemo.click();

    // Wait for some events
    await page.waitForTimeout(1000);

    // Check event log has entries
    const logOutput = page.locator('#log-output');
    const logEntries = await logOutput.locator('div').count();
    expect(logEntries).toBeGreaterThan(0);

    // Verify it contains relevant log messages
    const logText = await logOutput.textContent();
    expect(logText).toContain('Login Demo');
  });

  test('should handle click events on buttons', async ({ page }) => {
    // Trigger login demo
    const loginDemo = page.locator('#run-login-demo');
    await loginDemo.click();

    // Wait for event log to show button click
    const logOutput = page.locator('#log-output');
    await expect(logOutput).toContainText('Clicking login button', {
      timeout: 10000,
    });
  });

  test('should move cursor smoothly with CSS transitions', async ({ page }) => {
    const cursor = page.locator('div[style*="position: fixed"]').first();

    // Get initial position
    const initialBox = await cursor.boundingBox();

    // Trigger movement by starting demo
    const loginDemo = page.locator('#run-login-demo');
    await loginDemo.click();

    // Wait for movement
    await page.waitForTimeout(1000);

    // Get new position
    const newBox = await cursor.boundingBox();

    // Verify cursor moved
    expect(initialBox?.x).not.toBe(newBox?.x);
  });
});
