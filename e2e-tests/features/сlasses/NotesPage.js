let Helpers = require('../helpers/Helpers');

class NotesPage extends Helpers {

    constructor() {
        super();
        this.notes_item = by.css("a[ui-sref='notes'][class='active']");
        this.objectives_header = by.css("#objectives>*:first-child");
        this.add_objective_button = by.css("button[ng-click='vm.openNewGoalModal()']");
        this.dialog_window_objective = by.css("md-dialog[aria-label='Edit']");
        this.dialog_window_objective_name = by.css("div>h2");
        this.dialog_window_objective_cancel_top = by.css("button[class='md-icon-button md-button md-ink-ripple']");
        this.dialog_window_objective_title_field = by.css("input[name='title']");
        this.dialog_window_objective_title_field_placeholder = by.css("md-input-container[class='editInput md-input-invali']>label");
        this.dialog_window_objective_comment_field = by.css("textarea[name='Comment by employee']");
        this.dialog_window_objective_comment_field_placeholder = by.css("md-input-container[class='editCommentContainer ng-scope']>label");
        this.dialog_window_objective_datapicker = by.css("input[class='md-datepicker-input md-input']");
        this.dialog_window_objective_date_edit = by.css("div[class='dateEdit']");
        this.dialog_window_objective_cansel_down = by.css("button[class='md-primary md-button md-ink-ripple']");
        this.dialog_window_objective_cansel_down_text = by.css("button[class='md-primary md-button md-ink-ripple']>span");
        this.dialog_window_objective_save = by.css("button[ng-click='vm.save()']");
        this.dialog_window_objective_save_text = by.css("button[ng-click='vm.save()']>span");
        this.dialog_window_objective_open_calendar_button = by.css("button[aria-label='Open calendar']");
        this.dialog_window_objective_calendar = by.css("div[ng-switch='calendarCtrl.currentView']");
        this.dialog_window_objective_default_date = by.css("td[aria-selected='true']");
        this.objective_titles_scope = by.css(".clearfix div[class='col-xs-2 goalTitle ng-binding']");
        this.notes_delete_dialog_window = by.css("md-dialog[role='dialog']");
        this.notes_delete_dialog_bodytext1 = by.css("md-dialog-content[class='md-dialog-content']>h2");
        this.notes_delete_dialog_bodytext2 = by.css("md-dialog-content[class='md-dialog-content']>p");
        this.notes_delete_dialog_cancel_button = by.css("md-dialog-actions[class='layout-row'] button[ng-click='vm.cancel()']");
        this.notes_delete_dialog_cancel_button_text = by.css("md-dialog-actions[class='layout-row'] button[ng-click='vm.cancel()']>span");
        this.notes_delete_dialog_delete_button = by.css("md-dialog-actions[class='layout-row'] button[ng-click='vm.submit()']");
        this.notes_delete_dialog_delete_button_text = by.css("md-dialog-actions[class='layout-row'] button[ng-click='vm.submit()']>span");
        this.delete_last_notes_button = by.css(".paneContent[aria-hidden='false']>goal:last-of-type>div:last-of-type>div[class='col-xs-4 goalActions']>button[ng-click='vm.deleteGoal()']");
    }

    async CheckObjectiveWindow() {
        await this.WaitUntilElementIsVisible(this.dialog_window_objective);
        await this.CheckPresenceOfTextInElement(this.dialog_window_objective_name, 'Objective');
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_cancel_top);
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_title_field);
        await this.Click(this.dialog_window_objective_comment_field);
        await this.CheckPresenceOfTextInElement(this.dialog_window_objective_title_field_placeholder, 'Tittle');
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_comment_field);
        await this.Click(this.dialog_window_objective_title_field);
        await this.CheckPresenceOfTextInElement(this.dialog_window_objective_comment_field_placeholder, 'Comment by employee');
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_datapicker);
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_date_edit);
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_cansel_down);
        await this.CheckPresenceOfTextInElement(this.dialog_window_objective_cansel_down_text, 'Cancel');
        await this.WaitUntilElementIsVisible(this.dialog_window_objective_save);
        return this.WaitUntilElementIsVisible(this.dialog_window_objective_save_text, 'Save');
    }

    async ChooseCurrentDeadlineFromCalendar(open_cal_button, calendar, current_deadline) {
        await this.Click(open_cal_button);
        await this.WaitUntilElementIsVisible(calendar);
        return this.Click(current_deadline);

    }

    async CheckJustAddedObjectiveTittle(title_text) {
        let title_scope = element.all(this.objective_titles_scope).filter(async (elem) => {
            return await elem.getText() === title_text
        });
        let count = title_scope.count();
        if (count !== 1) {
            throw Error("Check just added objective title, please");
        } else {
            return title_scope;
        }
    }

    CheckJustAddedObjectiveComment(comment_text) {
        let comment_scope = $$('.clearfix div[class=\'col-xs-4 goalComments\'] div:first-of-type').filter((elem) => {
            return elem.getText().then((result) => {
                return result === 'Employee: ' + comment_text;
            })
        });

        comment_scope.count().then((value) => {
            console.log(value);
            if (value !== 1) {
                throw Error('Check objectives list, filter find more than 1 objective with comment - ' + comment_text);
            }
        });
        return comment_scope.getText().then((res) => {
            console.log(res);
        });
    }


    async CheckJustDeletedObjective(text) {
        let scope = element.all(this.objective_titles_scope).filter(async (elem) => {
            return await elem.getText() === text
        });
        let count = scope.count();
        if (count !== 0) {
            throw Error("Element isn't deleted!!!");
        } else
            return scope;
    }

    async CheckDeleteObjectivesWindow() {
        await this.WaitUntilElementIsVisible(this.notes_delete_dialog_window);
        await this.WaitUntilElementIsVisible(this.notes_delete_dialog_bodytext1);
        await this.WaitUntilElementIsVisible(this.notes_delete_dialog_bodytext2);
        await this.WaitUntilElementIsVisible(this.notes_delete_dialog_cancel_button);
        await this.CheckPresenceOfTextInElement(this.notes_delete_dialog_cancel_button_text, "Cancel");
        await this.WaitUntilElementIsVisible(this.notes_delete_dialog_delete_button);
        await this.CheckPresenceOfTextInElement(this.notes_delete_dialog_delete_button_text, "Delete");
        return this.Click(this.notes_delete_dialog_delete_button);
    }
}

module.exports = NotesPage;
