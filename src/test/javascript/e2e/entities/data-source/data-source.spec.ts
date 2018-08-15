import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DataSourceComponentsPage, DataSourceUpdatePage } from './data-source.page-object';

describe('DataSource e2e test', () => {
    let navBarPage: NavBarPage;
    let dataSourceUpdatePage: DataSourceUpdatePage;
    let dataSourceComponentsPage: DataSourceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DataSources', () => {
        navBarPage.goToEntity('data-source');
        dataSourceComponentsPage = new DataSourceComponentsPage();
        expect(dataSourceComponentsPage.getTitle()).toMatch(/srvwizApp.dataSource.home.title/);
    });

    it('should load create DataSource page', () => {
        dataSourceComponentsPage.clickOnCreateButton();
        dataSourceUpdatePage = new DataSourceUpdatePage();
        expect(dataSourceUpdatePage.getPageTitle()).toMatch(/srvwizApp.dataSource.home.createOrEditLabel/);
        dataSourceUpdatePage.cancel();
    });

    it('should create and save DataSources', () => {
        dataSourceComponentsPage.clickOnCreateButton();
        dataSourceUpdatePage.setDataSourceNameInput('dataSourceName');
        expect(dataSourceUpdatePage.getDataSourceNameInput()).toMatch('dataSourceName');
        dataSourceUpdatePage.setDescriptionInput('description');
        expect(dataSourceUpdatePage.getDescriptionInput()).toMatch('description');
        dataSourceUpdatePage.datatypeSelectLastOption();
        dataSourceUpdatePage.fileTypeSelectLastOption();
        dataSourceUpdatePage.databaseTypeSelectLastOption();
        dataSourceUpdatePage.databaseProductSelectLastOption();
        dataSourceUpdatePage.setDatabasePathInput('databasePath');
        expect(dataSourceUpdatePage.getDatabasePathInput()).toMatch('databasePath');
        dataSourceUpdatePage.setDbUsernameInput('dbUsername');
        expect(dataSourceUpdatePage.getDbUsernameInput()).toMatch('dbUsername');
        dataSourceUpdatePage.setDbPassInput('dbPass');
        expect(dataSourceUpdatePage.getDbPassInput()).toMatch('dbPass');
        dataSourceUpdatePage.setFilePathInput('filePath');
        expect(dataSourceUpdatePage.getFilePathInput()).toMatch('filePath');
        dataSourceUpdatePage.userSelectLastOption();
        dataSourceUpdatePage.save();
        expect(dataSourceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
