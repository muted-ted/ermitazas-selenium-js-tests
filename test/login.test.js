const { By, until } = require('selenium-webdriver')
const { buildDriver } = require('../helpers/driver')
const assert = require('assert')

describe('User login', function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await buildDriver()
  })

  afterEach(async function () {
    if (driver) await driver.quit()
  })

  it('logs in successfully with valid credentials', async function () {
    await driver.get('https://www.ermitazas.lt/prisijungti')
    try {
      await driver.findElement(By.id('CybotCookiebotDialogBodyButtonDecline')).click()
    } catch (e) {}
    await driver.wait(until.elementLocated(By.id('input-login-form-email')), 10000)
    await driver.findElement(By.id('input-login-form-email')).sendKeys('puhalano@mailinator.com')
    await driver.findElement(By.id('input-login-form-password')).sendKeys('Pa$$w0rd!')
    await driver.sleep(500)
    await driver.findElement(By.xpath("//button[contains(text(),'Prisijungti')]")).click()
    await driver.sleep(1000)
    await driver.wait(async () => {
      const btns = await driver.findElements(By.css('[aria-label="Naudotojo mygtukas"]'))
      if (btns.length === 0) return false
      const text = await btns[0].getText()
      return text === 'Mano paskyra'
    }, 10000, 'Login did not complete')
  })

  it('shows an error with incorrect password', async function () {
    await driver.get('https://www.ermitazas.lt/prisijungti')
    try {
      await driver.findElement(By.id('CybotCookiebotDialogBodyButtonDecline')).click()
    } catch (e) {}
    await driver.wait(until.elementLocated(By.id('input-login-form-email')), 10000)
    await driver.findElement(By.id('input-login-form-email')).sendKeys('puhalano@mailinator.com')
    await driver.findElement(By.id('input-login-form-password')).sendKeys('WrongPassword123!')
    await driver.findElement(By.xpath("//button[contains(text(),'Prisijungti')]")).click()
    await driver.sleep(2000)
    const errorText = await driver.executeScript(`
      const alerts = document.querySelectorAll('[role="alert"]')
      for (const alert of alerts) {
        const text = alert.innerText.trim()
        if (text.length > 0) return text
      }
      return ''
    `)
    assert.ok(errorText.length > 0, 'Expected an error message to appear')
  })
})
