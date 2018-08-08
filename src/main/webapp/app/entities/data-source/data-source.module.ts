import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SrvwizSharedModule } from 'app/shared';
import { SrvwizAdminModule } from 'app/admin/admin.module';
import {
    DataSourceComponent,
    DataSourceDetailComponent,
    DataSourceUpdateComponent,
    DataSourceDeletePopupComponent,
    DataSourceDeleteDialogComponent,
    dataSourceRoute,
    dataSourcePopupRoute
} from './';

const ENTITY_STATES = [...dataSourceRoute, ...dataSourcePopupRoute];

@NgModule({
    imports: [SrvwizSharedModule, SrvwizAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DataSourceComponent,
        DataSourceDetailComponent,
        DataSourceUpdateComponent,
        DataSourceDeleteDialogComponent,
        DataSourceDeletePopupComponent
    ],
    entryComponents: [DataSourceComponent, DataSourceUpdateComponent, DataSourceDeleteDialogComponent, DataSourceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SrvwizDataSourceModule {}
