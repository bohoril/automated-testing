/**
 * Represents a remote control that can simulate key presses on a page.
 */
class RemoteControl {
    constructor(page) {
        this.page = page;
    }

    async press(key) {
        await this.page.keyboard.press(key);
    }

    async pressUp() {
        await this.press('ArrowUp');
    }

    async pressDown() {
        await this.press('ArrowDown');
    }

    async pressLeft() {
        await this.press('ArrowLeft');
    }

    async pressRight() {
        await this.press('ArrowRight');
    }

    async pressOK() {
        await this.press('Enter');
    }

    async pressBack() {
        await this.press('Backspace');
    }

    async longPress(key, delay = 2000) {
        await this.page.keyboard.press(key, {delay: delay});
    }

    async longPressOK(delay = 2000) {
        await this.longPress('Enter', delay);
    }
}

module.exports = RemoteControl;