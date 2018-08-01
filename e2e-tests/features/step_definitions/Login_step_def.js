"use strict";

let LoginPageSteps = require('../steps/Login_steps');
const loginPageSteps = new LoginPageSteps;

const {Given, When, Then, BeforeAll, AfterAll} = require('cucumber');

browser.ignoreSynchronization = true;

BeforeAll('', async () => {
    await loginPageSteps.getUrl("http://ep-ubuntu.levi9.com/app_dev.php/login");
});

AfterAll('Br close', async () => {
    await loginPageSteps.closeTab();
});

Given(/^Login page is opened$/, async () => {
    await loginPageSteps.loginCheck();
});

When(/^I type "([^"]*)" into username field$/, async (login) => {
    await loginPageSteps.sendKeysLogin(login);
});

When(/^I type "([^"]*)" into password field$/, async (password) => {
    await loginPageSteps.sendKeysPassword(password);
});

When(/^Click on login button$/, async () => {
    await loginPageSteps.clickLogin();
});

Then(/^I should be logged into the system$/, async () => {
    await loginPageSteps.checkLoggedByUsername();
});

Then(/^Log out from the system$/, async () => {
    await loginPageSteps.logOut();
});

Then(/^Navbar and logo are present$/, async () => {
    await loginPageSteps.navBarLogoCheck();
});

Then(/^Login panel is present$/, async () => {
    await loginPageSteps.checkLoginPanelText();
});

Then(/^Username and Password placeholders are present$/, async () => {
    await loginPageSteps.checkPlaceholdersText();
});

Then(/^Fields icons are present$/, async () => {
    await loginPageSteps.checkIcons();
});

Then(/^Login button text are present$/, async () => {
    await loginPageSteps.checkLoginButton();
});














