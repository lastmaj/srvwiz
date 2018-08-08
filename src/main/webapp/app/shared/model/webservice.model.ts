import { IAccess } from 'app/shared/model//access.model';
import { IDataSource } from 'app/shared/model//data-source.model';

export interface IWebservice {
    id?: number;
    webserviceName?: string;
    description?: string;
    access?: IAccess;
    datasource?: IDataSource;
}

export class Webservice implements IWebservice {
    constructor(
        public id?: number,
        public webserviceName?: string,
        public description?: string,
        public access?: IAccess,
        public datasource?: IDataSource
    ) {}
}
