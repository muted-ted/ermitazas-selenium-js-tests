const { By, until } = require('selenium-webdriver');
const { buildDriver } = require('../helpers/driver');
const assert = require('assert');

describe('User registration', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    driver = await buildDriver();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('registers a new user successfully', async function () {
    const email = `test${Date.now()}@gmail.com`;
    const password = 'Testing123!';

    await driver.get('https://www.ermitazas.lt/registruotis');

    try {
      const cookieBtn = await driver.findElement(
        By.id('CybotCookiebotDialogBodyButtonDecline')
      );
      await cookieBtn.click();
    } catch (e) {}

    await driver.findElement(By.id('input-register-form-firstName')).sendKeys('Testeris');
    await driver
      .findElement(By.id('input-register-form-lastName'))
      .sendKeys('Testauskas');
    await driver.findElement(By.id('input-register-form-email')).sendKeys(email);
    await driver
      .findElement(By.id('input-register-form-phoneNumber'))
      .sendKeys('+37061111111');
    await driver.findElement(By.id('input-register-form-password')).sendKeys(password);
    await driver
      .findElement(By.id('input-register-form-repeatPassword'))
      .sendKeys(password);

    const checkbox = await driver.findElement(By.id('checkbox-register-form-privacy'));
    await driver.executeScript('arguments[0].click()', checkbox);

    await driver.findElement(By.css('[form="register-form"]')).click();

    // Wait until the first user button's text changes to 'Mano paskyra'.
    // This is the Selenium equivalent of Cypress's `.should('have.text', ...)` —
    // it retries until the condition is true or the timeout expires.
    await driver.wait(
      async () => {
        const btns = await driver.findElements(
          By.css('[aria-label="Naudotojo mygtukas"]')
        );
        if (btns.length === 0) return false;
        const text = await btns[0].getText();
        return text === 'Mano paskyra';
      },
      10000,
      'User button never changed to "Mano paskyra" after registration'
    );
  });
});
