let Helpers = require('../helpers/Helpers');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;
chai.use(chaiAsPromised);

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

    async fillLoginFields(key) {
        await this.waitUntilElementIsVisible(this.username);
        await this.clearField(this.username);
        return element(this.username).sendKeys(key);
    }

    async fillPasswordFields(key) {
        await this.waitUntilElementIsVisible(this.password);
        await this.clearField(this.password);
        return element(this.password).sendKeys(key);
    }

    async checkPresenceNavbar(logo, navbar) {
        await this.waitUntilElementIsVisible(navbar);
        await this.waitUntilElementIsClickable(logo);
        await this.waitUntilElementIsClickable(logo);
        return this.click(logo);
    }

    async checkPresenceUserPasPlaceholders(placeholder) {
        let scope = $$('input[class=\'form-control\']').filter(async (elem) => {
            return (await elem.getAttribute('placeholder') === placeholder);
        });
        let count = scope.count();
        await expect(count).to.become(1);
        return scope;
    }

    async checkFieldsIcons(user_icon, pasw_icon) {
        await this.waitUntilElementIsVisible(user_icon);
        await this.waitUntilElementIsVisible(pasw_icon);
    }

    async checkIfUserISLogged(elem1) {
        await this.waitUntilElementIsVisible(elem1);
        const word = /Username:/g;
        let array = [];
        let data = element(elem1).getAttribute('aria-label');
        array = (await data).split(' ').join('').replace(word, '');
        return array;
    }

    async checkLogOut(logout) {
        await this.click(this.user_dropdown_toggle);
        await this.click(logout);
        return this.waitUntilElementIsVisible(this.login_button);
    }

}

module.exports = LoginPage;




