import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlan } from 'app/shared/model/plan.model';

@Component({
    selector: 'jhi-plan-detail',
    templateUrl: './plan-detail.component.html'
})
export class PlanDetailComponent implements OnInit {
    plan: IPlan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plan }) => {
            this.plan = plan;
        });
    }

    previousState() {
        window.history.back();
    }
}
