import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan.component';
import { PlanDetailComponent } from './plan-detail.component';
import { PlanUpdateComponent } from './plan-update.component';
import { PlanDeletePopupComponent } from './plan-delete-dialog.component';
import { IPlan } from 'app/shared/model/plan.model';

@Injectable({ providedIn: 'root' })
export class PlanResolve implements Resolve<IPlan> {
    constructor(private service: PlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((plan: HttpResponse<Plan>) => plan.body));
        }
        return of(new Plan());
    }
}

export const planRoute: Routes = [
    {
        path: 'plan',
        component: PlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.plan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plan/:id/view',
        component: PlanDetailComponent,
        resolve: {
            plan: PlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.plan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plan/new',
        component: PlanUpdateComponent,
        resolve: {
            plan: PlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.plan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plan/:id/edit',
        component: PlanUpdateComponent,
        resolve: {
            plan: PlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.plan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const planPopupRoute: Routes = [
    {
        path: 'plan/:id/delete',
        component: PlanDeletePopupComponent,
        resolve: {
            plan: PlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'srvwizApp.plan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
