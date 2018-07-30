let Helpers = require('../helpers/Helpers');

class LoginPage extends Helpers {

    constructor() {
        super();
        this.logo = by.css("a[class='navbar-brand']:first-of-type");
        this.login_panel = by.css("div[class='panel-heading']");
        this.username = by.css("#username");
        this.password = by.css("#password");
        this.login_button = by.css("input[value='Login']");
        this.login_image_logo = by.css("div[class='navbar-header']>a");
        this.navigation_header = by.css("#bs-example-navbar-collapse-9");
        this.panel_info = by.css("div[class='panel-heading']");
        this.username_icon = by.css("i[class='glyphicon glyphicon-user']");
        this.password_icon = by.css("i[class='glyphicon glyphicon-lock']");
        this.navigation_logged = by.css("ul[class='nav navbar-nav navbar-right ng-scope']");
        this.username_logged = by.css("li[class='btn-group dropdown']>*:first-child");
        this.user_dropdown_toggle = by.css("li[class='btn-group dropdown']");
        this.log_out_button = by.css("a[ng-click='vm.logOut()']");
    }

    async FillLoginFields(key) {
        await this.WaitUntilElementIsVisible(this.username);
        await this.ClearField(this.username);
        return element(this.username).sendKeys(key);
    }

    async FillPasswordFields(key) {
        await this.WaitUntilElementIsVisible(this.password);
        await this.ClearField(this.password);
        return element(this.password).sendKeys(key);
    }

    async CheckPresenceNavbar(logo, navbar) {
        await this.WaitUntilElementIsVisible(navbar);
        await this.WaitUntilElementIsClickable(logo);
        await this.WaitUntilElementIsClickable(logo);
        return this.Click(logo);
    }

    async CheckPresenceUserPasPlaceholders(placeholder) {
        let scope = $$('input[class=\'form-control\']').filter(async (elem) => {
            return (await elem.getAttribute('placeholder') === placeholder);
        });
        let count = scope.count();
        if (await count !== 1) {
            throw Error("Check Placeholder please");
        }
        else {
            return scope;
        }
    }

    async CheckFieldsIcons(user_icon, pasw_icon) {
        await this.WaitUntilElementIsVisible(user_icon);
        await this.WaitUntilElementIsVisible(pasw_icon);
    }

    async CheckIfUserISLogged(elem1) {
        await this.WaitUntilElementIsVisible(elem1);
        const word = /Username:/g;
        let array = [];
        let data = element(elem1).getAttribute('aria-label');
        array = (await data).split(' ').join('').replace(word, '');
        return array;
    }

    async CheckLogOut(logout) {
        await this.Click(this.user_dropdown_toggle);
        await this.Click(logout);
        return this.WaitUntilElementIsVisible(this.login_button);
    }

}

module.exports = LoginPage;




