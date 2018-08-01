let LoginPage = require('../сlasses/LoginPage');
const loginPage = new LoginPage();
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;
chai.use(chaiAsPromised);

class LoginSteps extends LoginPage {

    async loginCheck() {
        await expect(browser.getCurrentUrl()).to.become('http://ep-ubuntu.levi9.com/app_dev.php/login');
        await expect(loginPage.getTitle()).to.become('MyReview');
        await loginPage.checkPresenceOfTextInElement(loginPage.panel_info, "Log In");
    }

    async sendKeysLogin(login) {
        await loginPage.findElementAndSendKEys(loginPage.username, login);
    }

    async sendKeysPassword(password) {
        await loginPage.findElementAndSendKEys(loginPage.password, password);
    }

    async clickLogin() {
        await loginPage.click(loginPage.login_button);
    }

    async checkLoggedByUsername() {
        await expect(loginPage.checkIfUserISLogged(loginPage.username_logged)).to.eventually.oneOf(['eptester1', "epphp1", "eptesterdm", "phpdm"]);
    }

    async logOut() {
        await loginPage.checkLogOut(loginPage.log_out_button);
    }

    async navBarLogoCheck() {
        await loginPage.checkPresenceNavbar(loginPage.login_image_logo, loginPage.navigation_header);
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://ep-ubuntu.levi9.com/app_dev.php/login");
    }

    async checkLoginPanelText() {
        await loginPage.checkPresenceOfTextInElement(loginPage.panel_info, "Log In");
    }

    async checkPlaceholdersText() {
        await loginPage.checkPresenceUserPasPlaceholders("Username");
        await loginPage.checkPresenceUserPasPlaceholders("Password");
    }

    async checkIcons() {
        await loginPage.checkFieldsIcons(loginPage.username_icon, loginPage.password_icon);
    }

    async checkLoginButton() {
        await loginPage.checkValueElement(loginPage.login_button, "Login");
    }
}

module.exports = LoginSteps;