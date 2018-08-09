import { IRole } from 'app/shared/model//role.model';
import { IWebservice } from 'app/shared/model//webservice.model';

export const enum AccessType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export interface IAccess {
    id?: number;
    tableName?: string;
    accessType?: AccessType;
    role?: IRole;
    webservice?: IWebservice;
}

export class Access implements IAccess {
    constructor(
        public id?: number,
        public tableName?: string,
        public accessType?: AccessType,
        public role?: IRole,
        public webservice?: IWebservice
    ) {}
}
