import { IUser } from 'app/core/user/user.model';

export const enum DataType {
    FILE = 'FILE',
    DATABASE = 'DATABASE',
    CREATE = 'CREATE'
}

export const enum FileType {
    CSV = 'CSV',
    EXCEL = 'EXCEL'
}

export const enum DatabaseType {
    SQL = 'SQL',
    MONGODB = 'MONGODB',
    CASSANDRA = 'CASSANDRA'
}

export const enum SqlProduct {
    MYSQL = 'MYSQL',
    POSTGRESQL = 'POSTGRESQL',
    ORACLE = 'ORACLE',
    MSSQL = 'MSSQL'
}

export interface IDataSource {
    id?: number;
    datatype?: DataType;
    fileType?: FileType;
    databaseType?: DatabaseType;
    databaseProduct?: SqlProduct;
    databasePath?: string;
    dbUsername?: string;
    dbPass?: string;
    filePath?: string;
    user?: IUser;
}

export class DataSource implements IDataSource {
    constructor(
        public id?: number,
        public datatype?: DataType,
        public fileType?: FileType,
        public databaseType?: DatabaseType,
        public databaseProduct?: SqlProduct,
        public databasePath?: string,
        public dbUsername?: string,
        public dbPass?: string,
        public filePath?: string,
        public user?: IUser
    ) {}
}
