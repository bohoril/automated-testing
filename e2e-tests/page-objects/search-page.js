const RemoteControl = require("../utils/remote-control");
const {expect} = require("@playwright/test");

class SearchPage {
    constructor(page) {
        this.page = page;
        this.remoteControl = new RemoteControl(page);
        this.searchInput = '[data-testid="search-input"]';
        this.actionCategory = '[data-testid="Action"]';
    }

    /**
     * Navigate to the "Action" category.
     */
    async navigateToActionCategory() {
        await this.remoteControl.pressDown();

        await expect(this.page.locator(this.actionCategory)).toHaveAttribute('data-focused', 'focused');

        await this.remoteControl.pressOK();
    }

    async verifyActionCategoryIsOpen() {
        await expect(this.page.locator(this.searchInput)).toHaveValue('Action');
    }
}

module.exports = SearchPage;