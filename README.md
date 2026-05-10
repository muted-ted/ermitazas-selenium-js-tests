# Ermitazas Selenium Tests

End-to-end UI tests for [ermitazas.lt](https://www.ermitazas.lt) written in Selenium WebDriver (JavaScript) with Mocha as the test runner.

This project covers the same features as the [Cypress test suite](https://github.com/muted-ted/ermitazas-cypress-tests), demonstrating the same scenarios in two different automation frameworks.

## What is tested

| Area | Scenario | Status |
| --- | --- | --- |
| Registration | Successful new user registration | OK |
| Login | Valid credentials sign the user in | OK |
| Login | Incorrect password is rejected | OK |

## Cypress vs Selenium

The key difference: Selenium requires explicit waiting. Cypress automatically retries assertions for up to 10 seconds. Selenium throws immediately if an element is not found — you must use driver.wait() with async conditions.

| | Cypress | Selenium |
| --- | --- | --- |
| Waiting | Automatic retry built in | Explicit waits required |
| Language | JavaScript only | JavaScript, Python, Java, C# |
| Architecture | Runs inside browser | Controls browser via WebDriver |

## Running locally

Requires Node.js 18 and Google Chrome.

    git clone https://github.com/muted-ted/ermitazas-selenium-js-tests.git
    cd ermitazas-selenium-js-tests
    npm install
    npm test

ChromeDriver is managed automatically by selenium-webdriver.

## About

Built alongside a Cypress suite to demonstrate experience with multiple browser automation frameworks. Part of my transition from logistics operations management into QA engineering.
