/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SrvwizTestModule } from '../../../test.module';
import { DataSourceUpdateComponent } from 'app/entities/data-source/data-source-update.component';
import { DataSourceService } from 'app/entities/data-source/data-source.service';
import { DataSource } from 'app/shared/model/data-source.model';

describe('Component Tests', () => {
    describe('DataSource Management Update Component', () => {
        let comp: DataSourceUpdateComponent;
        let fixture: ComponentFixture<DataSourceUpdateComponent>;
        let service: DataSourceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [DataSourceUpdateComponent]
            })
                .overrideTemplate(DataSourceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DataSourceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSourceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DataSource(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dataSource = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DataSource();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dataSource = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
