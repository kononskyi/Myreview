let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;
chai.use(chaiAsPromised);


class Helpers {

    async waitUntilElementIsVisible(elem) {
        return browser.wait(ExpectedConditions.visibilityOf(element(elem)), 5000, "Element is not visible");
    }

    async waitUntilElementIsInvisible(elem) {
        return browser.wait(ExpectedConditions.invisibilityOf(element(elem)), 5000, "Element is visible");
    }

    async waitUntilElementIsClickable(elem) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element(elem)), 5000, "Element is not clickable");
    }

    async click(elem) {
        await this.waitUntilElementIsVisible(elem);
        await this.waitUntilElementIsClickable(elem);
        return element(elem).click();
    }

    async findElementAndSendKEys(elem, key) {
        await this.waitUntilElementIsVisible(elem);
        await this.clearField(elem);
        return element(elem).sendKeys(key);
    }

    async clearField(elem) {
        return element(elem).clear();
    }

    async getUrl(elem) {
        return browser.get(elem);
    }

    async closeTab() {
        return browser.close();
    }

    async getTitle() {
        return browser.getTitle();
    }

    async checkPresenceOfTextInElement(elem, text) {
        await this.waitUntilElementIsVisible(elem);
        let textFromEl = element(elem).getText();
        await expect(textFromEl).to.become(text);
        return textFromEl;
    }

    async checkValueElement(elem, text) {
        await this.waitUntilElementIsVisible(elem);
        let atributeText = element(elem).getAttribute('value');
        await expect(atributeText).to.become(text);
        return atributeText;
    }
}

module.exports = Helpers;