let LoginPage = require('../сlasses/LoginPage');
const loginPage = new LoginPage;
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;
chai.use(chaiAsPromised);

class NotesSteps extends LoginPage {

    async loginAsUSer(login, password) {
        await expect(browser.getCurrentUrl()).to.eventually.equal('http://ep-ubuntu.levi9.com/app_dev.php/login');
        await expect(loginPage.getTitle()).to.eventually.equal('MyReview');
        await loginPage.fillLoginFields(login);
        await loginPage.fillPasswordFields(password);
        await this.click(loginPage.login_button);
    }

    async checkNotesItem() {
        await this.checkPresenceOfTextInElement(this.notes_item, "Notes");
        await this.checkPresenceOfTextInElement(this.objectives_header, "Objectives");
    }

    async createObjective() {
        await this.findElementAndSendKEys(this.dialog_window_objective_title_field, "TitleTitleTitle");
        await this.findElementAndSendKEys(this.dialog_window_objective_comment_field, "CommentComment");
        await this.chooseCurrentDeadlineFromCalendar(this.dialog_window_objective_open_calendar_button, this
            .dialog_window_objective_calendar, this.dialog_window_objective_default_date);
    }
}

module.exports = NotesSteps;