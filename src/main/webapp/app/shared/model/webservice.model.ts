import { IDataSource } from 'app/shared/model//data-source.model';

export interface IWebservice {
    id?: number;
    webserviceName?: string;
    description?: string;
    datasource?: IDataSource;
}

export class Webservice implements IWebservice {
    constructor(public id?: number, public webserviceName?: string, public description?: string, public datasource?: IDataSource) {}
}
