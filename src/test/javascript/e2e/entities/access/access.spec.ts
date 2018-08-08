import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AccessComponentsPage, AccessUpdatePage } from './access.page-object';

describe('Access e2e test', () => {
    let navBarPage: NavBarPage;
    let accessUpdatePage: AccessUpdatePage;
    let accessComponentsPage: AccessComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Accesses', () => {
        navBarPage.goToEntity('access');
        accessComponentsPage = new AccessComponentsPage();
        expect(accessComponentsPage.getTitle()).toMatch(/srvwizApp.access.home.title/);
    });

    it('should load create Access page', () => {
        accessComponentsPage.clickOnCreateButton();
        accessUpdatePage = new AccessUpdatePage();
        expect(accessUpdatePage.getPageTitle()).toMatch(/srvwizApp.access.home.createOrEditLabel/);
        accessUpdatePage.cancel();
    });

    it('should create and save Accesses', () => {
        accessComponentsPage.clickOnCreateButton();
        accessUpdatePage.setTableNameInput('tableName');
        expect(accessUpdatePage.getTableNameInput()).toMatch('tableName');
        accessUpdatePage.accessTypeSelectLastOption();
        accessUpdatePage.roleSelectLastOption();
        accessUpdatePage.webserviceSelectLastOption();
        accessUpdatePage.save();
        expect(accessUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
