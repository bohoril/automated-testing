import {test} from '@playwright/test';
import {TabNames, TopBar} from "../../page-objects/top-bar";
import ChannelsPage from "../../page-objects/channels-page";
import {LINKS} from "../../../constants";

test('navigate to channels page', async ({page}) => {
    await page.goto(LINKS.LINK_TO_HOME_PAGE, {waitUntil: 'networkidle'});

    const topBar = new TopBar(page);
    await topBar.navigateToTopBar();

    const context = await page.context();
    const pagePromise = context.waitForEvent('page');

    await topBar.navigateToTab(TabNames.CHANNELS);

    const secondPage = await pagePromise;
    const channelsPage = new ChannelsPage(secondPage);

    await channelsPage.verifyChannelsPageIsOpen();
});

test('perform actions on channels page', async ({page}) => {
    await page.goto(LINKS.LINK_TO_CHANNELS_PAGE, {waitUntil: 'load'});

    const channelsPage = new ChannelsPage(page);
    await channelsPage.verifyChannelsPageIsOpen();

    await channelsPage.nextChannel();
});