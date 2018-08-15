/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SrvwizTestModule } from '../../../test.module';
import { DataSourceComponent } from 'app/entities/data-source/data-source.component';
import { DataSourceService } from 'app/entities/data-source/data-source.service';
import { DataSource } from 'app/shared/model/data-source.model';

describe('Component Tests', () => {
    describe('DataSource Management Component', () => {
        let comp: DataSourceComponent;
        let fixture: ComponentFixture<DataSourceComponent>;
        let service: DataSourceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [DataSourceComponent],
                providers: []
            })
                .overrideTemplate(DataSourceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DataSourceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSourceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DataSource(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dataSources[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
