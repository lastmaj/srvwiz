import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SrvwizDataSourceModule } from './data-source/data-source.module';
import { SrvwizWebserviceModule } from './webservice/webservice.module';
import { SrvwizPlanModule } from './plan/plan.module';
import { SrvwizAppModule } from './app/app.module';
import { SrvwizAccessModule } from './access/access.module';
import { SrvwizRoleModule } from './role/role.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SrvwizDataSourceModule,
        SrvwizWebserviceModule,
        SrvwizPlanModule,
        SrvwizAppModule,
        SrvwizAccessModule,
        SrvwizRoleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SrvwizEntityModule {}
