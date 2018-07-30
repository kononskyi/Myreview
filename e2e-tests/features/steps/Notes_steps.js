
let loginPage = require('../сlasses/LoginPage');
let login_steps = new loginPage;
let NotesPage = require('../сlasses/NotesPage');
let notes_steps = new NotesPage;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);

class Notes_steps extends NotesPage{

    async LoginAsUSer(login,password) {
        await expect(browser.getCurrentUrl()).to.eventually.equal('http://ep-ubuntu.levi9.com/app_dev.php/login');
        await expect(login_steps.GetTitle()).to.eventually.equal('MyReview');
        await login_steps.FillLoginFields(login);
        await login_steps.FillPasswordFields(password);
        await login_steps.Click(login_steps.login_button);

    }

   async CheckNotesItem () {
        await notes_steps.CheckPresenceOfTextInElement(notes_steps.notes_item, "Notes");
        await notes_steps.CheckPresenceOfTextInElement(notes_steps.objectives_header, "Objectives");
    }

    async CreateObjective () {
        await this.FindElementAndSendKEys(this.dialog_window_objective_title_field,"TitleTitleTitle");
        await this.FindElementAndSendKEys(this.dialog_window_objective_comment_field,"CommentComment");
        await this.ChooseCurrentDeadlineFromCalendar(this.dialog_window_objective_open_calendar_button,this
            .dialog_window_objective_calendar,this.dialog_window_objective_default_date);
    }
}
module.exports = Notes_steps;