import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { WebserviceComponentsPage, WebserviceUpdatePage } from './webservice.page-object';

describe('Webservice e2e test', () => {
    let navBarPage: NavBarPage;
    let webserviceUpdatePage: WebserviceUpdatePage;
    let webserviceComponentsPage: WebserviceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Webservices', () => {
        navBarPage.goToEntity('webservice');
        webserviceComponentsPage = new WebserviceComponentsPage();
        expect(webserviceComponentsPage.getTitle()).toMatch(/srvwizApp.webservice.home.title/);
    });

    it('should load create Webservice page', () => {
        webserviceComponentsPage.clickOnCreateButton();
        webserviceUpdatePage = new WebserviceUpdatePage();
        expect(webserviceUpdatePage.getPageTitle()).toMatch(/srvwizApp.webservice.home.createOrEditLabel/);
        webserviceUpdatePage.cancel();
    });

    it('should create and save Webservices', () => {
        webserviceComponentsPage.clickOnCreateButton();
        webserviceUpdatePage.setWebserviceNameInput('webserviceName');
        expect(webserviceUpdatePage.getWebserviceNameInput()).toMatch('webserviceName');
        webserviceUpdatePage.setDescriptionInput('description');
        expect(webserviceUpdatePage.getDescriptionInput()).toMatch('description');
        webserviceUpdatePage.datasourceSelectLastOption();
        webserviceUpdatePage.save();
        expect(webserviceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
