import {test} from '@playwright/test';
import HomePage from '../../page-objects/home-page';

test('remove favourite app', async ({page}) => {
    await page.goto('LINK_TO_HOME_PAGE', {waitUntil: 'networkidle'});

    const homePage = new HomePage(page);
    await homePage.removeFavouriteAppByIndex(1);
});