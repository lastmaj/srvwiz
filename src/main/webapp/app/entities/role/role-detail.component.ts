import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRole } from 'app/shared/model/role.model';
import { IWebservice } from 'app/shared/model/webservice.model';
import { WebserviceService } from 'app/entities/webservice';

@Component({
    selector: 'jhi-role-detail',
    templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent implements OnInit {
    role: IRole;

    webservices: IWebservice[];

    constructor(private webserviceService: WebserviceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
        });
        this.webserviceService.query().subscribe(
            (res: HttpResponse<IWebservice[]>) => {
                this.webservices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    save() {
        window.history.back();
    }

    previousState() {
        window.history.back();
    }
}
