import { element, by, promise, ElementFinder } from 'protractor';

export class AccessComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-access div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AccessUpdatePage {
    pageTitle = element(by.id('jhi-access-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tableNameInput = element(by.id('field_tableName'));
    accessTypeSelect = element(by.id('field_accessType'));
    roleSelect = element(by.id('field_role'));
    webserviceSelect = element(by.id('field_webservice'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTableNameInput(tableName): promise.Promise<void> {
        return this.tableNameInput.sendKeys(tableName);
    }

    getTableNameInput() {
        return this.tableNameInput.getAttribute('value');
    }

    setAccessTypeSelect(accessType): promise.Promise<void> {
        return this.accessTypeSelect.sendKeys(accessType);
    }

    getAccessTypeSelect() {
        return this.accessTypeSelect.element(by.css('option:checked')).getText();
    }

    accessTypeSelectLastOption(): promise.Promise<void> {
        return this.accessTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

    webserviceSelectLastOption(): promise.Promise<void> {
        return this.webserviceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    webserviceSelectOption(option): promise.Promise<void> {
        return this.webserviceSelect.sendKeys(option);
    }

    getWebserviceSelect(): ElementFinder {
        return this.webserviceSelect;
    }

    getWebserviceSelectedOption() {
        return this.webserviceSelect.element(by.css('option:checked')).getText();
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
