import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PlanComponentsPage, PlanUpdatePage } from './plan.page-object';

describe('Plan e2e test', () => {
    let navBarPage: NavBarPage;
    let planUpdatePage: PlanUpdatePage;
    let planComponentsPage: PlanComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Plans', () => {
        navBarPage.goToEntity('plan');
        planComponentsPage = new PlanComponentsPage();
        expect(planComponentsPage.getTitle()).toMatch(/srvwizApp.plan.home.title/);
    });

    it('should load create Plan page', () => {
        planComponentsPage.clickOnCreateButton();
        planUpdatePage = new PlanUpdatePage();
        expect(planUpdatePage.getPageTitle()).toMatch(/srvwizApp.plan.home.createOrEditLabel/);
        planUpdatePage.cancel();
    });

    it('should create and save Plans', () => {
        planComponentsPage.clickOnCreateButton();
        planUpdatePage.setPlanNameInput('planName');
        expect(planUpdatePage.getPlanNameInput()).toMatch('planName');
        planUpdatePage.setReqestLimitInput('5');
        expect(planUpdatePage.getReqestLimitInput()).toMatch('5');
        planUpdatePage.setDatasourceLimitInput('5');
        expect(planUpdatePage.getDatasourceLimitInput()).toMatch('5');
        planUpdatePage.setWsLimitInput('5');
        expect(planUpdatePage.getWsLimitInput()).toMatch('5');
        planUpdatePage.setRoleLimitInput('5');
        expect(planUpdatePage.getRoleLimitInput()).toMatch('5');
        planUpdatePage.setPriceInput('5');
        expect(planUpdatePage.getPriceInput()).toMatch('5');
        planUpdatePage.save();
        expect(planUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
