import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDataSource } from 'app/shared/model/data-source.model';
import { Principal } from 'app/core';
import { DataSourceService } from './data-source.service';

@Component({
    selector: 'jhi-data-source',
    templateUrl: './data-source.component.html'
})
export class DataSourceComponent implements OnInit, OnDestroy {
    dataSources: IDataSource[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataSourceService: DataSourceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.dataSourceService.query().subscribe(
            (res: HttpResponse<IDataSource[]>) => {
                this.dataSources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDataSources();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDataSource) {
        return item.id;
    }

    registerChangeInDataSources() {
        this.eventSubscriber = this.eventManager.subscribe('dataSourceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
