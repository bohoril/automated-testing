const {expect} = require("@playwright/test");
const RemoteControl = require("../utils/remote-control");

const TabNames = Object.freeze({
    SEARCH: 'Search',
    HOME: 'Home',
    TV_GUIDE: 'TV Guide',
    CHANNELS: 'Channels',
    APPS: 'Apps',
    GAMES: 'Games'
});

class TopBar {
    constructor(page) {
        this.page = page;
        this.remoteControl = new RemoteControl(page);
        this.tabs = Object.values(TabNames); // Use enumeration to define tab order
        this.tabTestIdTemplate = 'main-menu-item-';
    }

    /**
     * Moves the focus to the top bar by sending an 'ArrowUp' key press with delay (long press).
     */
    async navigateToTopBar() {
        await this.remoteControl.pressUp();
        await this.remoteControl.pressUp();
    }

    /**
     * Navigate to a specific tab in the top bar.
     * @param {string} tabName - The name of the tab to navigate to (e.g., "Home", "Apps").
     */
    async navigateToTab(tabName) {
        if (!this.tabs.includes(tabName)) {
            throw new Error(`Invalid tab name: ${tabName}`);
        }

        // Find the currently focused tab
        const currentTabTestId = await this.page
            .locator(`[data-focused="focused"][data-testid^="${this.tabTestIdTemplate}"]`)
            .getAttribute('data-testid');
        const currentTabIndex = this.tabs.findIndex((tab) => `${this.tabTestIdTemplate}${tab}` === currentTabTestId);

        if (currentTabIndex === -1) {
            throw new Error('Unable to determine the currently focused tab.');
        }

        // Calculate the number of steps needed to navigate to the target tab
        const targetTabIndex = this.tabs.indexOf(tabName);
        const steps = targetTabIndex - currentTabIndex;

        // Navigate using ArrowRight or ArrowLeft
        const direction = steps > 0 ? 'Right' : 'Left';
        for (let i = 0; i < Math.abs(steps); i++) {
            await this.remoteControl.press(`Arrow${direction}`);
        }

        const targetTabSelector = `[data-testid="${this.tabTestIdTemplate}${tabName}"]`;

        // Verify the target tab is now focused
        const targetTabLocator = this.page.locator(targetTabSelector);
        await expect(targetTabLocator).toHaveAttribute('data-focused', 'focused');

        await this.remoteControl.pressOK();
    }
}

module.exports = {TopBar, TabNames};