class LoginPage {

    constructor() {
        this.logo = by.css('a[class=\'navbar-brand\']:first-of-type');
        this.login_panel = by.css('div[class=\'panel-heading\']');
        this.username = by.css('#username');
        this.password = by.css('#password');
        this.login_button = by.css('input[value=\'Login\']');
        this.header = by.css('#header');
        this.login_image_logo = by.css('div[class=\'navbar-header\']>a');
        this.navigation_header = by.css('#bs-example-navbar-collapse-9');
        this.panel_info = by.css('div[class=\'panel-heading\']');
        this.username_icon = by.css('i[class=\'glyphicon glyphicon-user\']');
        this.password_icon = by.css('i[class=\'glyphicon glyphicon-lock\']');
        this.navigation_logged = by.css('ul[class=\'nav navbar-nav navbar-right ng-scope\']');
        this.username_logged = by.css('li[class=\'btn-group dropdown\']>*:first-child');
        this.user_dropdown_toggle = by.css('li[class=\'btn-group dropdown\']');
        this.log_out_button = by.css('a[ng-click=\'vm.logOut()\']');
    }

    GetURl(elem) {
        console.log('Before');
        return browser.get(elem);
    }

    CloseTab() {
        console.log("After");
        return browser.close();
    }

    GetTitle() {
        return browser.getTitle();
    }

    ClearField(elem) {
        element(elem).clear().then(() => {
        }, () => {
            return console.log("Error");
        });
    }

    FindElementAndSendKEys(elem, key) {
        this.WaitUntilElementIsVisible(elem);
        this.ClearField(elem);
        return element(elem).sendKeys(key);
    }

    FillLoginFields(key) {
        this.WaitUntilElementIsVisible(this.username);
        this.ClearField(this.username);
        return element(this.username).sendKeys(key);
    }

    FillPasswordFields(key) {
        this.WaitUntilElementIsVisible(this.password);
        this.ClearField(this.password);
        return element(this.password).sendKeys(key);
    }

    Click(elem) {
        this.WaitUntilElementIsVisible(elem);
        this.WaitUntilElementIsClickable(elem);
        return element(elem).click();
    }

    CheckPresenceNavbar(logo, navbar) {
        this.WaitUntilElementIsVisible(navbar);
        this.WaitUntilElementIsClickable(logo);
        this.WaitUntilElementIsClickable(logo);
        return this.Click(logo);
    }

    CheckPresenceUserPasPlaceholders(placeholder) {
        let scope = $$('input[class=\'form-control\']').filter((elem) => {
            return elem.getAttribute('placeholder').then((result) => {
                return result === placeholder;
            });
        });
        return scope.count().then((result) => {
            if (result !== 1) {
                throw Error('Wrong placeholder!!!');
            }
        });
    }

    CheckFieldsIcons(user_icon, pasw_icon) {
        this.WaitUntilElementIsVisible(user_icon);
        this.WaitUntilElementIsVisible(pasw_icon);
    }

    CheckPresenceOfTextInElement(elem, text) {
        this.WaitUntilElementIsVisible(elem);
        return element(elem).getText().then((result) => {
            if (result !== text) {
                throw Error(`Check text (${text}) please`);
            }
        });
    }

    CheckValueElement(elem, text) {
        this.WaitUntilElementIsVisible(elem);
        return element(elem).getAttribute('value').then((result) => {
            if (result !== text) {
                throw Error(`Check text (${text}) please`);
            }
        });
    }

    CheckIfUserISLogged(elem1) {
        this.WaitUntilElementIsVisible(elem1);
        this.WaitUntilElementIsVisible(this.navigation_logged);
        this.WaitUntilElementIsVisible(this.header);
        let array = [];
        let word = /Username:/g;
        array = element(elem1).getAttribute('aria-label').then((res) => {
            return res.split(' ').join('').replace(word, '');
        });
        return array;
    }

    LogOut(logout) {
        this.Click(this.user_dropdown_toggle);
        this.Click(logout);
        return this.WaitUntilElementIsVisible(this.login_button);
    }

    WaitUntilElementIsVisible(elem) {
        return browser.wait(ExpectedConditions.visibilityOf(element(elem)), 5000, "Element is not visible");
    }

    WaitUntilElementIsInvisible(elem) {
        return browser.wait(ExpectedConditions.invisibilityOf(element(elem)), 5000, "Element is visible");
    }

    WaitUntilElementIsClickable(elem) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element(elem)), 5000, "Element is not clickable");
    }
}
module.exports = LoginPage;




