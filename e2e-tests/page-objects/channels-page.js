const RemoteControl = require("../utils/remote-control");
const {expect} = require("@playwright/test");

class ChannelsPage {
    constructor(page) {
        this.page = page;
        this.remoteControl = new RemoteControl(page);
        this.switcher = '[data-testid="channels-switcher"]';
        this.channelNumber = '[class^="_channelNumber"]';
    }

    /**
     * Verifies that the Channels page is open.
     */
    async verifyChannelsPageIsOpen() {
        await expect(this.page.locator(this.switcher)).toBeVisible();
    }


    /**
     * Navigates to the next channel using the remote control.
     */
    async nextChannel() {
        await expect(this.page.locator(this.channelNumber)).toBeVisible();
        const currentChannelNumber = await this.page.locator(this.channelNumber).textContent();

        await this.remoteControl.pressUp();

        await expect(this.page.locator(this.channelNumber)).toBeVisible();
        const nextChannelNumber = await this.page.locator(this.channelNumber).textContent();

        await expect(currentChannelNumber).not.toEqual(nextChannelNumber);
    }
}

module.exports = ChannelsPage;