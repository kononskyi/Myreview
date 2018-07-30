let LoginPage = require('../сlasses/LoginPage');
let login_steps = new LoginPage();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);

class Login_steps extends LoginPage {

    async LoginCheck() {
        await expect(browser.getCurrentUrl()).to.become('http://ep-ubuntu.levi9.com/app_dev.php/login');
        await expect(login_steps.GetTitle()).to.become('MyReview');
        await login_steps.CheckPresenceOfTextInElement(login_steps.panel_info, "Log In");
    }

    async SendKeysLogin(login) {
        await login_steps.FindElementAndSendKEys(login_steps.username, login);
    }

    async SendKeysPassword(password) {
        await login_steps.FindElementAndSendKEys(login_steps.password, password);
    }

    async ClickLogin() {
        await login_steps.Click(login_steps.login_button);
    }

    async CheckLoggedByUsername() {
        await expect(login_steps.CheckIfUserISLogged(login_steps.username_logged)).to.eventually.oneOf(['eptester1', "epphp1", "eptesterdm", "phpdm"]);
    }

    async LogOut() {
        await login_steps.CheckLogOut(login_steps.log_out_button);
    }

    async NavBarLogoCheck() {
        await login_steps.CheckPresenceNavbar(login_steps.login_image_logo, login_steps.navigation_header);
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://ep-ubuntu.levi9.com/app_dev.php/login");
    }

    async CheckLoginPanelText() {
        await login_steps.CheckPresenceOfTextInElement(login_steps.panel_info, "Log In");
    }

    async CheckPlaceholdersText() {
        await login_steps.CheckPresenceUserPasPlaceholders("Username");
        await login_steps.CheckPresenceUserPasPlaceholders("Password");
    }

    async CheckIcons() {
        await login_steps.CheckFieldsIcons(login_steps.username_icon, login_steps.password_icon);
    }

    async CheckLoginButton() {
        await login_steps.CheckValueElement(login_steps.login_button, "Login");
    }
}

module.exports = Login_steps;