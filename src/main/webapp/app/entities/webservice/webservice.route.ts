import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Webservice } from 'app/shared/model/webservice.model';
import { WebserviceService } from './webservice.service';
import { WebserviceComponent } from './webservice.component';
import { WebserviceDetailComponent } from './webservice-detail.component';
import { WebserviceUpdateComponent } from './webservice-update.component';
import { WebserviceDeletePopupComponent } from './webservice-delete-dialog.component';
import { IWebservice } from 'app/shared/model/webservice.model';

@Injectable({ providedIn: 'root' })
export class WebserviceResolve implements Resolve<IWebservice> {
    constructor(private service: WebserviceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((webservice: HttpResponse<Webservice>) => webservice.body));
        }
        return of(new Webservice());
    }
}

export const webserviceRoute: Routes = [
    {
        path: 'webservice',
        component: WebserviceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.webservice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'webservice/:id/view',
        component: WebserviceDetailComponent,
        resolve: {
            webservice: WebserviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.webservice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'webservice/new',
        component: WebserviceUpdateComponent,
        resolve: {
            webservice: WebserviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.webservice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'webservice/:id/edit',
        component: WebserviceUpdateComponent,
        resolve: {
            webservice: WebserviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.webservice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const webservicePopupRoute: Routes = [
    {
        path: 'webservice/:id/delete',
        component: WebserviceDeletePopupComponent,
        resolve: {
            webservice: WebserviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.webservice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
