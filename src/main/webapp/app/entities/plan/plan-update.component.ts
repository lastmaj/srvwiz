import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPlan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-plan-update',
    templateUrl: './plan-update.component.html'
})
export class PlanUpdateComponent implements OnInit {
    private _plan: IPlan;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private planService: PlanService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plan }) => {
            this.plan = plan;
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
        if (this.plan.id !== undefined) {
            this.subscribeToSaveResponse(this.planService.update(this.plan));
        } else {
            this.subscribeToSaveResponse(this.planService.create(this.plan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlan>>) {
        result.subscribe((res: HttpResponse<IPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get plan() {
        return this._plan;
    }

    set plan(plan: IPlan) {
        this._plan = plan;
    }
}
