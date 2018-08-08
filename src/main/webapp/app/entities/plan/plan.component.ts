import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlan } from 'app/shared/model/plan.model';
import { Principal } from 'app/core';
import { PlanService } from './plan.service';

@Component({
    selector: 'jhi-plan',
    templateUrl: './plan.component.html'
})
export class PlanComponent implements OnInit, OnDestroy {
    plans: IPlan[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private planService: PlanService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.planService.query().subscribe(
            (res: HttpResponse<IPlan[]>) => {
                this.plans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlan) {
        return item.id;
    }

    registerChangeInPlans() {
        this.eventSubscriber = this.eventManager.subscribe('planListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
