import {expect, test} from '@playwright/test';
import AppsPage from '../../page-objects/apps-page';
import AppDetailsPage from '../../page-objects/app-details-page';
import HomePage from '../../page-objects/home-page';

test('add favourite app', async ({page}) => {
    await page.goto('LINK_TO_APPS_PAGE', {waitUntil: 'networkidle'});

    const appsPage = new AppsPage(page);
    const targetAppTestId = await appsPage.selectLifestyleAppByIndex(0);

    const appDetailsPage = new AppDetailsPage(page);
    await appDetailsPage.verifyAppDetailsPageIsOpen();
    await appDetailsPage.addToFavourites();

    const homePage = new HomePage(page);
    await expect(homePage.page.locator(homePage.favAppsRow)).toBeVisible();
    await expect(homePage.page.getByTestId(targetAppTestId)).toBeVisible();
});