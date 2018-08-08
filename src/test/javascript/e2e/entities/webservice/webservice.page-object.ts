import { element, by, promise, ElementFinder } from 'protractor';

export class WebserviceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-webservice div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WebserviceUpdatePage {
    pageTitle = element(by.id('jhi-webservice-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    webserviceNameInput = element(by.id('field_webserviceName'));
    descriptionInput = element(by.id('field_description'));
    datasourceSelect = element(by.id('field_datasource'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setWebserviceNameInput(webserviceName): promise.Promise<void> {
        return this.webserviceNameInput.sendKeys(webserviceName);
    }

    getWebserviceNameInput() {
        return this.webserviceNameInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    datasourceSelectLastOption(): promise.Promise<void> {
        return this.datasourceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    datasourceSelectOption(option): promise.Promise<void> {
        return this.datasourceSelect.sendKeys(option);
    }

    getDatasourceSelect(): ElementFinder {
        return this.datasourceSelect;
    }

    getDatasourceSelectedOption() {
        return this.datasourceSelect.element(by.css('option:checked')).getText();
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
