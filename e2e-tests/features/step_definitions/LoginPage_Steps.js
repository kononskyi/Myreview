"use strict";

let loginPage_Steps = require('./Classes/LoginPage');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);

const {Given, When, Then, BeforeAll, AfterAll} = require('cucumber');

browser.ignoreSynchronization = true;


BeforeAll('', async () => {

    await loginPage_Steps.GetURl("http://ep-ubuntu.levi9.com/app_dev.php/login");
});

AfterAll('Br close', async () => {
    await loginPage_Steps.CloseTab();
});

Given(/^Login page is opened$/, async () => {
    await expect(browser.getCurrentUrl()).to.eventually.equal('http://ep-ubuntu.levi9.com/app_dev.php/login');
    await expect(loginPage_Steps.GetTitle()).to.eventually.equal('MyReview');
});
When(/^I type "([^"]*)" into username field$/, async (login) => {
    await  loginPage_Steps.FindElementAndSendKEys(loginPage_Steps.username,login);
});
When(/^I type "([^"]*)" into password field$/, async (password) => {
    await loginPage_Steps.FindElementAndSendKEys(loginPage_Steps.password,password);
});
When(/^Click on login button$/, async () => {
    await loginPage_Steps.Click(loginPage_Steps.login_button);
});
Then(/^I should be logged into the system$/, async () => {
    // await loginPage_Steps.ElementComprisesOf(loginPage_Steps.header, 'Objectives');
    await expect(loginPage_Steps.CheckIfUserISLogged(loginPage_Steps.username_logged)).to.eventually.oneOf(['eptester1', "epphp1", "eptesterdm", "phpdm"]);
});

Then(/^Log out from the system$/, async () => {
    await loginPage_Steps.LogOut(loginPage_Steps.log_out_button);
});


Then(/^Navbar and logo are present$/, async () => {
    await loginPage_Steps.CheckPresenceNavbar(loginPage_Steps.login_image_logo, loginPage_Steps.navigation_header);
    expect(browser.getCurrentUrl()).to.eventually.equal("http://ep-ubuntu.levi9.com/app_dev.php/login");
});

Then(/^Login panel is present$/, async () => {
    await loginPage_Steps.CheckPrecenceOfTextInElement(loginPage_Steps.panel_info, "Log In");

});

Then(/^Username and Password placeholders are present$/, async () => {
    await loginPage_Steps.CheckPresenceUserPasPlaceholders("Username");
    await loginPage_Steps.CheckPresenceUserPasPlaceholders("Password");
});

Then(/^Fields icons are present$/, async () => {
    await loginPage_Steps.CheckFieldsIcons(loginPage_Steps.username_icon, loginPage_Steps.password_icon);
});

Then(/^Login button text are present$/, async () => {
    await loginPage_Steps.CheckPrecenceOfTextInElement(loginPage_Steps.login_button, "Login");
});














