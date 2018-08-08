/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SrvwizTestModule } from '../../../test.module';
import { DataSourceDetailComponent } from 'app/entities/data-source/data-source-detail.component';
import { DataSource } from 'app/shared/model/data-source.model';

describe('Component Tests', () => {
    describe('DataSource Management Detail Component', () => {
        let comp: DataSourceDetailComponent;
        let fixture: ComponentFixture<DataSourceDetailComponent>;
        const route = ({ data: of({ dataSource: new DataSource(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [DataSourceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DataSourceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DataSourceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dataSource).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
