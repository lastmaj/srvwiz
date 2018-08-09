import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDataSource } from 'app/shared/model/data-source.model';
import { DataSourceService } from './data-source.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-data-source-update',
    templateUrl: './data-source-update.component.html'
})
export class DataSourceUpdateComponent implements OnInit {
    private _dataSource: IDataSource;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private dataSourceService: DataSourceService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dataSource }) => {
            this.dataSource = dataSource;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dataSource.id !== undefined) {
            this.subscribeToSaveResponse(this.dataSourceService.update(this.dataSource));
        } else {
            this.subscribeToSaveResponse(this.dataSourceService.create(this.dataSource));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDataSource>>) {
        result.subscribe((res: HttpResponse<IDataSource>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get dataSource() {
        return this._dataSource;
    }

    set dataSource(dataSource: IDataSource) {
        this._dataSource = dataSource;
    }
}
