const RemoteControl = require("../utils/remote-control");
const {expect} = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
        this.remoteControl = new RemoteControl(page);
        this.favAppsRow = '#favourite-apps';
        this.favAppsRowItem = '#favourite-apps > div';
    }

    /**
     * Removes a favourite app from the list based on the given index.
     *
     * @param {number} index - The index of the app to be removed within the favourite apps list.
     */
    async removeFavouriteAppByIndex(index) {
        const targetAppTestId = await this.page.locator(this.favAppsRowItem).nth(index).getAttribute('data-testid');
        await expect(this.page.getByTestId(targetAppTestId)).toBeAttached();

        for (let i = 0; i < index; i++) {
            await this.remoteControl.pressRight();
        }

        await expect(this.page.getByTestId(targetAppTestId)).toBeVisible();

        // Remove the target app
        await this.remoteControl.longPressOK();
        await this.remoteControl.pressDown();
        await this.remoteControl.pressOK();

        await expect(this.page.getByTestId(targetAppTestId)).toHaveAttribute('data-focused', 'na');
        await expect(await this.page.getByTestId(targetAppTestId).evaluate(el => getComputedStyle(el).opacity)).toBe('0');
    }
}

module.exports = HomePage;