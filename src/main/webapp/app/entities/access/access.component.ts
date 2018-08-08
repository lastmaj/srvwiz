import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccess } from 'app/shared/model/access.model';
import { Principal } from 'app/core';
import { AccessService } from './access.service';

@Component({
    selector: 'jhi-access',
    templateUrl: './access.component.html'
})
export class AccessComponent implements OnInit, OnDestroy {
    accesses: IAccess[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accessService: AccessService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accessService.query().subscribe(
            (res: HttpResponse<IAccess[]>) => {
                this.accesses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccesses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccess) {
        return item.id;
    }

    registerChangeInAccesses() {
        this.eventSubscriber = this.eventManager.subscribe('accessListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
