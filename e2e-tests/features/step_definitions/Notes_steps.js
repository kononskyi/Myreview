"use strict";

let notesPage_Steps = require('./Classes/NotesPage');
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

Given(/^Logged as employee "([^"]*)" with "([^"]*)"$/, async (login, password) => {
    await expect(browser.getCurrentUrl()).to.eventually.equal('http://ep-ubuntu.levi9.com/app_dev.php/login');
    await expect(loginPage_Steps.GetTitle()).to.eventually.equal('MyReview');
    await loginPage_Steps.FillLoginFields(login);
    await loginPage_Steps.FillPasswordFields(password);
    await loginPage_Steps.Click(loginPage_Steps.login_button);
});

When(/^Notes item is opened$/, async () => {
    await notesPage_Steps.CheckNotesItem(notesPage_Steps.notes_item, "Notes");
    await notesPage_Steps.CheckNotesItem(notesPage_Steps.objectives_header, "Objectives");
});

When(/^User press Add objective button$/, async () => {
    await loginPage_Steps.Click(notesPage_Steps.add_objective_button);
});

Then(/^Objectives modal window is appeared$/, async () => {
    await notesPage_Steps.CheckObjectiveWindow();
});


When(/^Fill title, comment with valid data and choose deadline$/, async () => {
    await loginPage_Steps.FindElementAndSendKEys(notesPage_Steps.dialog_window_objective_title_field,"TitleTitleTitle");
    await loginPage_Steps.FindElementAndSendKEys(notesPage_Steps.dialog_window_objective_comment_field,"CommentComment");
    await notesPage_Steps.ChooseCurrentDeadlineFromCalendar(notesPage_Steps.dialog_window_objective_open_calendar_button,notesPage_Steps
        .dialog_window_objective_calendar,notesPage_Steps.dialog_window_objective_default_date);

});

When(/^Press Save button$/, async () => {
     await loginPage_Steps.Click(notesPage_Steps.dialog_window_objective_save);
     //await loginPage_Steps.WaitUntilElementIsInvisible(notesPage_Steps.dialog_window_objective);
     await browser.wait(() => { return loginPage_Steps.WaitUntilElementIsInvisible(notesPage_Steps.dialog_window_objective)},5*10000,"Check");
});


Then(/^Just saved objective appears in the list of objectives$/, async () => {
     await notesPage_Steps.CheckJustAddedObjectiveTittle("TitleTitleTitle");


   //  let comment_check = notesPage_Steps.CheckJustAddedObjectiveComment('CommentComment');
    // await browser.wait(comment_check,5000,"Wait for adding objective");
});