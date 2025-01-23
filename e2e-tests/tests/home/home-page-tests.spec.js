import {test} from '@playwright/test';
import HomePage from '../../page-objects/home-page';
import {LINKS} from "../../../constants";

test('remove favourite app', async ({page}) => {
    await page.goto(LINKS.LINK_TO_HOME_PAGE, {waitUntil: 'networkidle'});

    const homePage = new HomePage(page);
    await homePage.removeFavouriteAppByIndex(1);
});