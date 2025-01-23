import {test} from '@playwright/test';
import SearchPage from '../../page-objects/search-page';
import {LINKS} from "../../../constants";

test('open action category', async ({page}) => {
    await page.goto(LINKS.LINK_TO_SEARCH_PAGE, {waitUntil: 'networkidle'});

    const searchPage = new SearchPage(page);
    await searchPage.navigateToActionCategory();
    await searchPage.verifyActionCategoryIsOpen();
});