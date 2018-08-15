import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AppComponentsPage, AppUpdatePage } from './app.page-object';

describe('App e2e test', () => {
    let navBarPage: NavBarPage;
    let appUpdatePage: AppUpdatePage;
    let appComponentsPage: AppComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Apps', () => {
        navBarPage.goToEntity('app');
        appComponentsPage = new AppComponentsPage();
        expect(appComponentsPage.getTitle()).toMatch(/srvwizApp.app.home.title/);
    });

    it('should load create App page', () => {
        appComponentsPage.clickOnCreateButton();
        appUpdatePage = new AppUpdatePage();
        expect(appUpdatePage.getPageTitle()).toMatch(/srvwizApp.app.home.createOrEditLabel/);
        appUpdatePage.cancel();
    });

    it('should create and save Apps', () => {
        appComponentsPage.clickOnCreateButton();
        appUpdatePage.setAppNameInput('appName');
        expect(appUpdatePage.getAppNameInput()).toMatch('appName');
        appUpdatePage.setDescriptionInput('description');
        expect(appUpdatePage.getDescriptionInput()).toMatch('description');
        appUpdatePage.setApiKeyInput('apiKey');
        expect(appUpdatePage.getApiKeyInput()).toMatch('apiKey');
        appUpdatePage
            .getActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    appUpdatePage.getActiveInput().click();
                    expect(appUpdatePage.getActiveInput().isSelected()).toBeFalsy();
                } else {
                    appUpdatePage.getActiveInput().click();
                    expect(appUpdatePage.getActiveInput().isSelected()).toBeTruthy();
                }
            });
        appUpdatePage.userSelectLastOption();
        appUpdatePage.roleSelectLastOption();
        appUpdatePage.save();
        expect(appUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
