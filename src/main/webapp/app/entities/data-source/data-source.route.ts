import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from 'app/shared/model/data-source.model';
import { DataSourceService } from './data-source.service';
import { DataSourceComponent } from './data-source.component';
import { DataSourceDetailComponent } from './data-source-detail.component';
import { DataSourceUpdateComponent } from './data-source-update.component';
import { DataSourceDeletePopupComponent } from './data-source-delete-dialog.component';
import { IDataSource } from 'app/shared/model/data-source.model';

@Injectable({ providedIn: 'root' })
export class DataSourceResolve implements Resolve<IDataSource> {
    constructor(private service: DataSourceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((dataSource: HttpResponse<DataSource>) => dataSource.body));
        }
        return of(new DataSource());
    }
}

export const dataSourceRoute: Routes = [
    {
        path: 'data-source',
        component: DataSourceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.dataSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'data-source/:id/view',
        component: DataSourceDetailComponent,
        resolve: {
            dataSource: DataSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.dataSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'data-source/new',
        component: DataSourceUpdateComponent,
        resolve: {
            dataSource: DataSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.dataSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'data-source/:id/edit',
        component: DataSourceUpdateComponent,
        resolve: {
            dataSource: DataSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.dataSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataSourcePopupRoute: Routes = [
    {
        path: 'data-source/:id/delete',
        component: DataSourceDeletePopupComponent,
        resolve: {
            dataSource: DataSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.dataSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
