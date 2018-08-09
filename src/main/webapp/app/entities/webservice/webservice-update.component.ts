import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWebservice } from 'app/shared/model/webservice.model';
import { WebserviceService } from './webservice.service';
import { IDataSource } from 'app/shared/model/data-source.model';
import { DataSourceService } from 'app/entities/data-source';

@Component({
    selector: 'jhi-webservice-update',
    templateUrl: './webservice-update.component.html'
})
export class WebserviceUpdateComponent implements OnInit {
    private _webservice: IWebservice;
    isSaving: boolean;

    datasources: IDataSource[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private webserviceService: WebserviceService,
        private dataSourceService: DataSourceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ webservice }) => {
            this.webservice = webservice;
        });
        this.dataSourceService.query().subscribe(
            (res: HttpResponse<IDataSource[]>) => {
                this.datasources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.webservice.id !== undefined) {
            this.subscribeToSaveResponse(this.webserviceService.update(this.webservice));
        } else {
            this.subscribeToSaveResponse(this.webserviceService.create(this.webservice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWebservice>>) {
        result.subscribe((res: HttpResponse<IWebservice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDataSourceById(index: number, item: IDataSource) {
        return item.id;
    }
    get webservice() {
        return this._webservice;
    }

    set webservice(webservice: IWebservice) {
        this._webservice = webservice;
    }
}
