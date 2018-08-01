"use strict";

let NotesPageSteps = require('../steps/Notes_steps');
let notesPageSteps = new NotesPageSteps;

const {Given, When, Then, BeforeAll, AfterAll} = require('cucumber');
browser.ignoreSynchronization = true;

BeforeAll('', async () => {
    await notesPageSteps.getUrl("http://ep-ubuntu.levi9.com/app_dev.php/login");
});

AfterAll('Br close', async () => {
    await notesPageSteps.closeTab();
});

Given(/^Logged as employee "([^"]*)" with "([^"]*)"$/, async (login, password) => {
    await notesPageSteps.loginAsUSer(login, password);
});

When(/^Notes item is opened$/, async () => {
    await notesPageSteps.checkNotesItem();
});

When(/^User press Add objective button$/, async () => {
    await notesPageSteps.click(this.add_objective_button);
});

Then(/^Objectives modal window is appeared$/, async () => {
    await this.checkObjectiveWindow();
});

When(/^Fill title, comment with valid data and choose deadline$/, async () => {
    await notesPageSteps.createObjective();
});

When(/^Press Save button$/, async () => {
    await this.click(this.dialog_window_objective_save);
});

Then(/^Just saved objective appears in the list of objectives$/, async () => {
    await this.checkJustAddedObjectiveTittle("TitleTitleTitle");
});


When(/^User press delete button near the last objective$/, async () => {
    await this.click(this.delete_last_notes_button);
});

When(/^Confirm the selection in Delete this Objective dialog window by clicking Delete button$/, async () => {
    await this.checkDeleteObjectivesWindow();
});

Then(/^Objective removed from the list$/, async () => {
    await this.checkJustDeletedObjective("123123123123");
});
