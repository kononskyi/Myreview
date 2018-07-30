class Helpers {

    async WaitUntilElementIsVisible(elem) {
        return browser.wait(ExpectedConditions.visibilityOf(element(elem)), 5000, "Element is not visible");
    }

    async WaitUntilElementIsInvisible(elem) {
        return browser.wait(ExpectedConditions.invisibilityOf(element(elem)), 5000, "Element is visible");
    }

    async WaitUntilElementIsClickable(elem) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element(elem)), 5000, "Element is not clickable");
    }

    async Click(elem) {
        await this.WaitUntilElementIsVisible(elem);
        await this.WaitUntilElementIsClickable(elem);
        return element(elem).click();
    }

    async FindElementAndSendKEys(elem, key) {
        await this.WaitUntilElementIsVisible(elem);
        await this.ClearField(elem);
        return element(elem).sendKeys(key);
    }

    async ClearField(elem) {
        return element(elem).clear();
    }

    async GetUrl(elem) {
        return browser.get(elem);
    }

    async CloseTab() {
        return browser.close();
    }

    async GetTitle() {
        return browser.getTitle();
    }

    async CheckPresenceOfTextInElement(elem, text) {
        await this.WaitUntilElementIsVisible(elem);
        let textfromsel =  element(elem).getText();
        if (await textfromsel !== text) {
            throw Error(`Check text (${text}) please`);
        }
        return textfromsel;
    }

    async CheckValueElement(elem, text) {
        await this.WaitUntilElementIsVisible(elem);
        let atribute =  element(elem).getAttribute('value');
        if (await atribute !== text) {
            throw Error(`Check text (${text}) please`);
        }
        return atribute;
    }
}
module.exports = Helpers;