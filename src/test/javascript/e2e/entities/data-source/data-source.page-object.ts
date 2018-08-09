import { element, by, promise, ElementFinder } from 'protractor';

export class DataSourceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-data-source div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DataSourceUpdatePage {
    pageTitle = element(by.id('jhi-data-source-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dataSourceNameInput = element(by.id('field_dataSourceName'));
    descriptionInput = element(by.id('field_description'));
    datatypeSelect = element(by.id('field_datatype'));
    fileTypeSelect = element(by.id('field_fileType'));
    databaseTypeSelect = element(by.id('field_databaseType'));
    databaseProductSelect = element(by.id('field_databaseProduct'));
    databasePathInput = element(by.id('field_databasePath'));
    dbUsernameInput = element(by.id('field_dbUsername'));
    dbPassInput = element(by.id('field_dbPass'));
    filePathInput = element(by.id('field_filePath'));
    userSelect = element(by.id('field_user'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDataSourceNameInput(dataSourceName): promise.Promise<void> {
        return this.dataSourceNameInput.sendKeys(dataSourceName);
    }

    getDataSourceNameInput() {
        return this.dataSourceNameInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setDatatypeSelect(datatype): promise.Promise<void> {
        return this.datatypeSelect.sendKeys(datatype);
    }

    getDatatypeSelect() {
        return this.datatypeSelect.element(by.css('option:checked')).getText();
    }

    datatypeSelectLastOption(): promise.Promise<void> {
        return this.datatypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setFileTypeSelect(fileType): promise.Promise<void> {
        return this.fileTypeSelect.sendKeys(fileType);
    }

    getFileTypeSelect() {
        return this.fileTypeSelect.element(by.css('option:checked')).getText();
    }

    fileTypeSelectLastOption(): promise.Promise<void> {
        return this.fileTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setDatabaseTypeSelect(databaseType): promise.Promise<void> {
        return this.databaseTypeSelect.sendKeys(databaseType);
    }

    getDatabaseTypeSelect() {
        return this.databaseTypeSelect.element(by.css('option:checked')).getText();
    }

    databaseTypeSelectLastOption(): promise.Promise<void> {
        return this.databaseTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setDatabaseProductSelect(databaseProduct): promise.Promise<void> {
        return this.databaseProductSelect.sendKeys(databaseProduct);
    }

    getDatabaseProductSelect() {
        return this.databaseProductSelect.element(by.css('option:checked')).getText();
    }

    databaseProductSelectLastOption(): promise.Promise<void> {
        return this.databaseProductSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setDatabasePathInput(databasePath): promise.Promise<void> {
        return this.databasePathInput.sendKeys(databasePath);
    }

    getDatabasePathInput() {
        return this.databasePathInput.getAttribute('value');
    }

    setDbUsernameInput(dbUsername): promise.Promise<void> {
        return this.dbUsernameInput.sendKeys(dbUsername);
    }

    getDbUsernameInput() {
        return this.dbUsernameInput.getAttribute('value');
    }

    setDbPassInput(dbPass): promise.Promise<void> {
        return this.dbPassInput.sendKeys(dbPass);
    }

    getDbPassInput() {
        return this.dbPassInput.getAttribute('value');
    }

    setFilePathInput(filePath): promise.Promise<void> {
        return this.filePathInput.sendKeys(filePath);
    }

    getFilePathInput() {
        return this.filePathInput.getAttribute('value');
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
