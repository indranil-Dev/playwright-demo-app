import { Before, After } from '@cucumber/cucumber';
import { createPage, closeBrowser } from './page';

Before(async function () {
  await createPage();
});

After(async function () {
  await closeBrowser();
});
