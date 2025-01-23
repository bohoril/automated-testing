const RemoteControl = require("../utils/remote-control");
const {expect} = require("@playwright/test");

class AppDetailsPage {
    constructor(page) {
        this.page = page;
        this.remoteControl = new RemoteControl(page);
        this.openButton = '#app-open-button'
        this.addToFavouritesButton = '#app-fav-button';
    }

    /**
     * Verifies that the application details page is open.
     */
    async verifyAppDetailsPageIsOpen() {
        await expect(this.page.locator(this.openButton)).toBeVisible();
        await expect(this.page.locator(this.openButton)).toHaveAttribute('data-focused', 'focused');
    }


    /**
     * Adds the application to favourites.
     */
    async addToFavourites() {
        await expect(this.page.locator(this.addToFavouritesButton)).toBeVisible();
        await this.remoteControl.pressRight();
        await expect(this.page.locator(this.addToFavouritesButton)).toHaveAttribute('data-focused', 'focused');

        await this.remoteControl.pressOK();
        await expect(this.page.locator(this.addToFavouritesButton)).not.toBeAttached();
    }
}
module.exports = AppDetailsPage;