import { IUser } from 'app/core/user/user.model';
import { IAccess } from 'app/shared/model//access.model';

export interface IRole {
    id?: number;
    roleName?: string;
    description?: string;
    active?: boolean;
    user?: IUser;
    accessLists?: IAccess[];
}

export class Role implements IRole {
    constructor(
        public id?: number,
        public roleName?: string,
        public description?: string,
        public active?: boolean,
        public user?: IUser,
        public accessLists?: IAccess[]
    ) {
        this.active = false;
    }
}
