import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { RoleComponentsPage, RoleUpdatePage } from './role.page-object';

describe('Role e2e test', () => {
    let navBarPage: NavBarPage;
    let roleUpdatePage: RoleUpdatePage;
    let roleComponentsPage: RoleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Roles', () => {
        navBarPage.goToEntity('role');
        roleComponentsPage = new RoleComponentsPage();
        expect(roleComponentsPage.getTitle()).toMatch(/srvwizApp.role.home.title/);
    });

    it('should load create Role page', () => {
        roleComponentsPage.clickOnCreateButton();
        roleUpdatePage = new RoleUpdatePage();
        expect(roleUpdatePage.getPageTitle()).toMatch(/srvwizApp.role.home.createOrEditLabel/);
        roleUpdatePage.cancel();
    });

    it('should create and save Roles', () => {
        roleComponentsPage.clickOnCreateButton();
        roleUpdatePage.setRoleNameInput('roleName');
        expect(roleUpdatePage.getRoleNameInput()).toMatch('roleName');
        roleUpdatePage.setDescriptionInput('description');
        expect(roleUpdatePage.getDescriptionInput()).toMatch('description');
        roleUpdatePage
            .getActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    roleUpdatePage.getActiveInput().click();
                    expect(roleUpdatePage.getActiveInput().isSelected()).toBeFalsy();
                } else {
                    roleUpdatePage.getActiveInput().click();
                    expect(roleUpdatePage.getActiveInput().isSelected()).toBeTruthy();
                }
            });
        roleUpdatePage.userSelectLastOption();
        roleUpdatePage.save();
        expect(roleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
