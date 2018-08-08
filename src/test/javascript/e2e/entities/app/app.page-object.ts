import { element, by, promise, ElementFinder } from 'protractor';

export class AppComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-app div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AppUpdatePage {
    pageTitle = element(by.id('jhi-app-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    appNameInput = element(by.id('field_appName'));
    descriptionInput = element(by.id('field_description'));
    apiKeyInput = element(by.id('field_apiKey'));
    activeInput = element(by.id('field_active'));
    userSelect = element(by.id('field_user'));
    roleSelect = element(by.id('field_role'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setAppNameInput(appName): promise.Promise<void> {
        return this.appNameInput.sendKeys(appName);
    }

    getAppNameInput() {
        return this.appNameInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setApiKeyInput(apiKey): promise.Promise<void> {
        return this.apiKeyInput.sendKeys(apiKey);
    }

    getApiKeyInput() {
        return this.apiKeyInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }
    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    roleSelectLastOption(): promise.Promise<void> {
        return this.roleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    roleSelectOption(option): promise.Promise<void> {
        return this.roleSelect.sendKeys(option);
    }

    getRoleSelect(): ElementFinder {
        return this.roleSelect;
    }

    getRoleSelectedOption() {
        return this.roleSelect.element(by.css('option:checked')).getText();
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
