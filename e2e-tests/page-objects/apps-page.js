const RemoteControl = require("../utils/remote-control");
const {expect} = require("@playwright/test");

class AppsPage {
    constructor(page) {
        this.page = page;
        this.remoteControl = new RemoteControl(page);
        this.lifestyleRowItem = '[data-testid="list-item-app_list-3"] > div > div';
    }

    /**
     * Navigates to the lifestyle row.
     */
    async navigateToLifeStyleRow() {
        await this.remoteControl.pressDown();
        await this.remoteControl.pressDown();
        await this.remoteControl.pressDown();
        await this.remoteControl.pressDown();
        await this.remoteControl.pressDown();
    }

    /**
     * Selects an application by its index in the lifestyle row.
     *
     * @param {number} index - The index of the lifestyle application to select.
     * @return {Promise<string>} - Target application `data-testid` attribute.
     */
    async selectLifestyleAppByIndex(index) {
        await this.navigateToLifeStyleRow();

        const targetAppTestId = await this.page.locator(this.lifestyleRowItem).nth(index).getAttribute('data-testid');
        await expect(this.page.getByTestId(targetAppTestId)).toBeAttached();

        for (let i = 0; i < index; i++) {
            await this.remoteControl.pressRight();
        }

        await expect(this.page.getByTestId(targetAppTestId)).toBeVisible();

        await this.remoteControl.pressOK();

        return targetAppTestId;
    }
}

module.exports = AppsPage;