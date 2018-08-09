import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SrvwizSharedModule } from 'app/shared';
import { SrvwizAdminModule } from 'app/admin/admin.module';
import {
    AppComponent,
    AppDetailComponent,
    AppUpdateComponent,
    AppDeletePopupComponent,
    AppDeleteDialogComponent,
    appRoute,
    appPopupRoute
} from './';

const ENTITY_STATES = [...appRoute, ...appPopupRoute];

@NgModule({
    imports: [SrvwizSharedModule, SrvwizAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AppComponent, AppDetailComponent, AppUpdateComponent, AppDeleteDialogComponent, AppDeletePopupComponent],
    entryComponents: [AppComponent, AppUpdateComponent, AppDeleteDialogComponent, AppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SrvwizAppModule {}
