import { element, by, promise, ElementFinder } from 'protractor';

export class PlanComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-plan div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlanUpdatePage {
    pageTitle = element(by.id('jhi-plan-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    planNameInput = element(by.id('field_planName'));
    reqestLimitInput = element(by.id('field_reqestLimit'));
    datasourceLimitInput = element(by.id('field_datasourceLimit'));
    wsLimitInput = element(by.id('field_wsLimit'));
    roleLimitInput = element(by.id('field_roleLimit'));
    priceInput = element(by.id('field_price'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setPlanNameInput(planName): promise.Promise<void> {
        return this.planNameInput.sendKeys(planName);
    }

    getPlanNameInput() {
        return this.planNameInput.getAttribute('value');
    }

    setReqestLimitInput(reqestLimit): promise.Promise<void> {
        return this.reqestLimitInput.sendKeys(reqestLimit);
    }

    getReqestLimitInput() {
        return this.reqestLimitInput.getAttribute('value');
    }

    setDatasourceLimitInput(datasourceLimit): promise.Promise<void> {
        return this.datasourceLimitInput.sendKeys(datasourceLimit);
    }

    getDatasourceLimitInput() {
        return this.datasourceLimitInput.getAttribute('value');
    }

    setWsLimitInput(wsLimit): promise.Promise<void> {
        return this.wsLimitInput.sendKeys(wsLimit);
    }

    getWsLimitInput() {
        return this.wsLimitInput.getAttribute('value');
    }

    setRoleLimitInput(roleLimit): promise.Promise<void> {
        return this.roleLimitInput.sendKeys(roleLimit);
    }

    getRoleLimitInput() {
        return this.roleLimitInput.getAttribute('value');
    }

    setPriceInput(price): promise.Promise<void> {
        return this.priceInput.sendKeys(price);
    }

    getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
