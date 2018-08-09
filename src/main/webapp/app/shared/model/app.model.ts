import { IUser } from 'app/core/user/user.model';
import { IRole } from 'app/shared/model//role.model';

export interface IApp {
    id?: number;
    appName?: string;
    description?: string;
    apiKey?: string;
    active?: boolean;
    user?: IUser;
    role?: IRole;
}

export class App implements IApp {
    constructor(
        public id?: number,
        public appName?: string,
        public description?: string,
        public apiKey?: string,
        public active?: boolean,
        public user?: IUser,
        public role?: IRole
    ) {
        this.active = false;
    }
}
