import { IUser } from 'app/core/user/user.model';

export interface IRole {
    id?: number;
    roleName?: string;
    description?: string;
    active?: boolean;
    user?: IUser;
}

export class Role implements IRole {
    constructor(public id?: number, public roleName?: string, public description?: string, public active?: boolean, public user?: IUser) {
        this.active = false;
    }
}
