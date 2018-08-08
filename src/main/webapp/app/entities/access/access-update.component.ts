import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccess } from 'app/shared/model/access.model';
import { AccessService } from './access.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role';
import { IWebservice } from 'app/shared/model/webservice.model';
import { WebserviceService } from 'app/entities/webservice';

@Component({
    selector: 'jhi-access-update',
    templateUrl: './access-update.component.html'
})
export class AccessUpdateComponent implements OnInit {
    private _access: IAccess;
    isSaving: boolean;

    roles: IRole[];

    webservices: IWebservice[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accessService: AccessService,
        private roleService: RoleService,
        private webserviceService: WebserviceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ access }) => {
            this.access = access;
        });
        this.roleService.query().subscribe(
            (res: HttpResponse<IRole[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.webserviceService.query().subscribe(
            (res: HttpResponse<IWebservice[]>) => {
                this.webservices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.access.id !== undefined) {
            this.subscribeToSaveResponse(this.accessService.update(this.access));
        } else {
            this.subscribeToSaveResponse(this.accessService.create(this.access));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccess>>) {
        result.subscribe((res: HttpResponse<IAccess>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }

    trackWebserviceById(index: number, item: IWebservice) {
        return item.id;
    }
    get access() {
        return this._access;
    }

    set access(access: IAccess) {
        this._access = access;
    }
}
