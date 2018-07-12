let loginPage = require('./LoginPage');

class NotesPage  {

    constructor() {
        this.notes_item = by.css('a[ui-sref=\'notes\'][class=\'active\']');
        this.objectives_header = by.css('#objectives>*:first-child');
        this.add_objective_button = by.css('button[ng-click=\'vm.openNewGoalModal()\']');
        this.dialog_window_objective = by.css('md-dialog[aria-label=\'Edit\']');
        this.dialog_window_objective_name = by.css('div>h2');
        this.dialog_window_objective_cancel_top = by.css('button[class=\'md-icon-button md-button md-ink-ripple\']');
        this.dialog_window_objective_title_field = by.css('input[name=\'title\']');
        this.dialog_window_objective_title_field_placeholder = by.css('md-input-container[class=\'editInput md-input-invalid\']>label');
        this.dialog_window_objective_comment_field = by.css('textarea[name=\'Comment by employee\']');
        this.dialog_window_objective_comment_field_placeholder = by.css('md-input-container[class=\'editCommentContainer ng-scope\']>label');
        this.dialog_window_objective_datapicker = by.css('input[class=\'md-datepicker-input md-input\']');
        this.dialog_window_objective_date_edit = by.css('div[class=\'dateEdit\']');
        this.dialog_window_objective_cansel_down = by.css('button[class=\'md-primary md-button md-ink-ripple\']');
        this.dialog_window_objective_cansel_down_text = by.css('button[class=\'md-primary md-button md-ink-ripple\']>span');
        this.dialog_window_objective_save = by.css('button[ng-click=\'vm.save()\']');
        this.dialog_window_objective_save_text = by.css('button[ng-click=\'vm.save()\']>span');
        this.dialog_window_objective_open_calendar_button = by.css('button[aria-label=\'Open calendar\']');
        this.dialog_window_objective_calendar = by.css('div[ng-switch=\'calendarCtrl.currentView\']');
        this.dialog_window_objective_default_date = by.css('td[aria-selected=\'true\']');


    }

    CheckNotesItem(elem,text) {
       return loginPage.CheckPrecenceOfTextInElement(elem,text);

    }

    CheckObjectiveWindow() {
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective);
        loginPage.CheckPrecenceOfTextInElement(this.dialog_window_objective_name, 'Objective');
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_cancel_top);
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_title_field);
        loginPage.Click(this.dialog_window_objective_comment_field);
        loginPage.CheckPrecenceOfTextInElement(this.dialog_window_objective_title_field_placeholder, 'Title');
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_comment_field);
        loginPage.Click(this.dialog_window_objective_title_field);
        loginPage.CheckPrecenceOfTextInElement(this.dialog_window_objective_comment_field_placeholder, 'Comment by employee');
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_datapicker);
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_date_edit);
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_cansel_down);
        loginPage.CheckPrecenceOfTextInElement(this.dialog_window_objective_cansel_down_text, 'Cancel');
        loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_save);
        return loginPage.WaitUntilElementIsVisible(this.dialog_window_objective_save_text, 'Save');
    }

    ChooseCurrentDeadlineFromCalendar(open_cal_button, calendar, current_deadline) {
        loginPage.Click(open_cal_button);
        loginPage.WaitUntilElementIsVisible(calendar);
        return loginPage.Click(current_deadline);
    }

    CheckJustAddedObjectiveTittle(title_text) {
        
      let title_scope = $$('.clearfix div[class=\'col-xs-2 goalTitle ng-binding\']').filter((elem) => {
            return elem.getText().then((result) => {
                return result === title_text;
            })
        });

      return title_scope.getText().then((result) =>{
          console.log(result);
      });
      /*
        return title_scope.count().then((value) => {
            if (value < 1 || value > 1) {
                console.log(value);
                throw Error('Check objectives list, filter find more than 1 objective with title - ' + title_text);
            }
        });
        */
    }

    CheckJustAddedObjectiveComment(comment_text) {
        let comment_scope = $$('.clearfix div[class=\'col-xs-4 goalComments\'] div:first-of-type').filter((elem) => {
            return elem.getText().then((result) => {
                return result === 'Employee: '+ comment_text;
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


}

module.exports = new NotesPage();
