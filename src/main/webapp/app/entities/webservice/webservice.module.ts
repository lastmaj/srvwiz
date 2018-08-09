import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SrvwizSharedModule } from 'app/shared';
import {
    WebserviceComponent,
    WebserviceDetailComponent,
    WebserviceUpdateComponent,
    WebserviceDeletePopupComponent,
    WebserviceDeleteDialogComponent,
    webserviceRoute,
    webservicePopupRoute
} from './';

const ENTITY_STATES = [...webserviceRoute, ...webservicePopupRoute];

@NgModule({
    imports: [SrvwizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WebserviceComponent,
        WebserviceDetailComponent,
        WebserviceUpdateComponent,
        WebserviceDeleteDialogComponent,
        WebserviceDeletePopupComponent
    ],
    entryComponents: [WebserviceComponent, WebserviceUpdateComponent, WebserviceDeleteDialogComponent, WebserviceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SrvwizWebserviceModule {}
