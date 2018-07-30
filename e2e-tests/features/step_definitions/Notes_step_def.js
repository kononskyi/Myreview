"use strict";

let stepsPage = require('../steps/Login_steps');
let steps = new stepsPage;
let notesPage = require('../steps/Notes_steps');
let notes = new notesPage;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);

const {Given, When, Then, BeforeAll, AfterAll} = require('cucumber');
//browser.ignoreSynchronization = true;

BeforeAll('', async () => {
    await steps.GetUrl("http://ep-ubuntu.levi9.com/app_dev.php/login");
});

AfterAll('Br close', async () => {
    await steps.CloseTab();
});

Given(/^Logged as employee "([^"]*)" with "([^"]*)"$/, async (login, password) => {
    await notes.LoginAsUSer(login,password);
});

When(/^Notes item is opened$/, async () => {
    await notes.CheckNotesItem();
});

When(/^User press Add objective button$/, async () => {
    await notes.Click(this.add_objective_button);

});

Then(/^Objectives modal window is appeared$/, async () => {
    await notes.CheckObjectiveWindow();
});

When(/^Fill title, comment with valid data and choose deadline$/, async () => {
  await notes.CreateObjective();
});

When(/^Press Save button$/, async () => {
     await this.Click(this.dialog_window_objective_save);

});

Then(/^Just saved objective appears in the list of objectives$/, async () => {
   await this.CheckJustAddedObjectiveTittle("TitleTitleTitle");
});


When(/^User press delete button near the last objective$/, async () => {
 await this.Click(this.delete_last_notes_button);
});

When(/^Confirm the selection in Delete this Objective dialog window by clicking Delete button$/, async () => {
  await this.CheckDeleteObjectivesWindow();
});

Then(/^Objective removed from the list$/, async () => {
   await this.CheckJustDeletedObjective("123123123123");
});
