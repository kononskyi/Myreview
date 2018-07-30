"use strict";

let stepsLoginPage = require('../steps/Login_steps');
let steps_login = new stepsLoginPage;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);

const {Given, When, Then, BeforeAll, AfterAll} = require('cucumber');

browser.ignoreSynchronization = true;

BeforeAll('', async () => {
    await steps_login.GetUrl("http://ep-ubuntu.levi9.com/app_dev.php/login");
});

AfterAll('Br close', async () => {
    await steps_login.CloseTab();
});

Given(/^Login page is opened$/, async () => {
    await steps_login.LoginCheck();
});

When(/^I type "([^"]*)" into username field$/, async (login) => {
    await steps_login.SendKeysLogin(login);
});

When(/^I type "([^"]*)" into password field$/, async (password) => {
    await steps_login.SendKeysPassword(password);
});

When(/^Click on login button$/, async () => {
    await steps_login.ClickLogin();
});

Then(/^I should be logged into the system$/, async () => {
    await steps_login.CheckLoggedByUsername();
});

Then(/^Log out from the system$/, async () => {
    await steps_login.LogOut();
});

Then(/^Navbar and logo are present$/, async () => {
    await steps_login.NavBarLogoCheck();
});

Then(/^Login panel is present$/, async () => {
    await steps_login.CheckLoginPanelText();
});

Then(/^Username and Password placeholders are present$/, async () => {
    await steps_login.CheckPlaceholdersText();
});

Then(/^Fields icons are present$/, async () => {
    await steps_login.CheckIcons();
});

Then(/^Login button text are present$/, async () => {
    await steps_login.CheckLoginButton();
});














