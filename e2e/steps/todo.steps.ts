import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { createPage } from '../support/page';

let page: Page;

// Ensure page is created before tests
Before(async () => {
  page = await createPage();
});

Given('I am on the todo application', async function() {
  await page.goto('http://localhost:4200');
  await expect(page.locator('h1')).toContainText('Todo App');
});

When('I add a todo item with text {string}', async function(text: string) {
  await page.locator('.todo-input').fill(text);
  await page.locator('.todo-button').click();
});

Then('I should see {string} in the todo list', async function(text: string) {
  const todoItem = page.locator('.todo-text', { hasText: text });
  await expect(todoItem).toBeVisible();
});

Given('I have added a todo item {string}', async function(text: string) {
  await page.locator('.todo-input').fill(text);
  await page.locator('.todo-button').click();
  const todoItem = page.locator('.todo-text', { hasText: text });
  await expect(todoItem).toBeVisible();
});

When('I mark the todo item {string} as complete', async function(text: string) {
  const todoItem = page.locator('.todo-item', { has: page.locator('.todo-text', { hasText: text }) });
  await todoItem.locator('.todo-checkbox').click();
});

Then('the todo item {string} should be marked as complete', async function(text: string) {
  const todoItem = page.locator('.todo-item', { has: page.locator('.todo-text', { hasText: text }) });
  await expect(todoItem.locator('.todo-text')).toHaveClass(/completed/);
});

When('I delete the todo item {string}', async function(text: string) {
  const todoItem = page.locator('.todo-item', { has: page.locator('.todo-text', { hasText: text }) });
  await todoItem.locator('.delete-button').click();
});

Then('I should not see {string} in the todo list', async function(text: string) {
  const todoItem = page.locator('.todo-text', { hasText: text });
  await expect(todoItem).not.toBeVisible();
});