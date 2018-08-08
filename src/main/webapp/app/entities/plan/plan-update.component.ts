import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPlan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';

@Component({
    selector: 'jhi-plan-update',
    templateUrl: './plan-update.component.html'
})
export class PlanUpdateComponent implements OnInit {
    private _plan: IPlan;
    isSaving: boolean;

    constructor(private planService: PlanService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plan }) => {
            this.plan = plan;
        });
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
    get plan() {
        return this._plan;
    }

    set plan(plan: IPlan) {
        this._plan = plan;
    }
}
