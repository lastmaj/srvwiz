import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDataSource } from 'app/shared/model/data-source.model';

@Component({
    selector: 'jhi-data-source-detail',
    templateUrl: './data-source-detail.component.html'
})
export class DataSourceDetailComponent implements OnInit {
    dataSource: IDataSource;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dataSource }) => {
            this.dataSource = dataSource;
        });
    }

    previousState() {
        window.history.back();
    }
}
