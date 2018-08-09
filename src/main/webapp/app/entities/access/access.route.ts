import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Access } from 'app/shared/model/access.model';
import { AccessService } from './access.service';
import { AccessComponent } from './access.component';
import { AccessDetailComponent } from './access-detail.component';
import { AccessUpdateComponent } from './access-update.component';
import { AccessDeletePopupComponent } from './access-delete-dialog.component';
import { IAccess } from 'app/shared/model/access.model';

@Injectable({ providedIn: 'root' })
export class AccessResolve implements Resolve<IAccess> {
    constructor(private service: AccessService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((access: HttpResponse<Access>) => access.body));
        }
        return of(new Access());
    }
}

export const accessRoute: Routes = [
    {
        path: 'access',
        component: AccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.access.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'access/:id/view',
        component: AccessDetailComponent,
        resolve: {
            access: AccessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.access.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'access/new',
        component: AccessUpdateComponent,
        resolve: {
            access: AccessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.access.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'access/:id/edit',
        component: AccessUpdateComponent,
        resolve: {
            access: AccessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.access.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accessPopupRoute: Routes = [
    {
        path: 'access/:id/delete',
        component: AccessDeletePopupComponent,
        resolve: {
            access: AccessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.access.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
