import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccess } from 'app/shared/model/access.model';

@Component({
    selector: 'jhi-access-detail',
    templateUrl: './access-detail.component.html'
})
export class AccessDetailComponent implements OnInit {
    access: IAccess;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ access }) => {
            this.access = access;
        });
    }

    previousState() {
        window.history.back();
    }
}
