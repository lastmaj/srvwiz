import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWebservice } from 'app/shared/model/webservice.model';
import { Principal } from 'app/core';
import { WebserviceService } from './webservice.service';

@Component({
    selector: 'jhi-webservice',
    templateUrl: './webservice.component.html'
})
export class WebserviceComponent implements OnInit, OnDestroy {
    webservices: IWebservice[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private webserviceService: WebserviceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.webserviceService.query().subscribe(
            (res: HttpResponse<IWebservice[]>) => {
                this.webservices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWebservices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWebservice) {
        return item.id;
    }

    registerChangeInWebservices() {
        this.eventSubscriber = this.eventManager.subscribe('webserviceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
