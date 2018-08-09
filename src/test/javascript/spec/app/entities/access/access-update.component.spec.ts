/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SrvwizTestModule } from '../../../test.module';
import { AccessUpdateComponent } from 'app/entities/access/access-update.component';
import { AccessService } from 'app/entities/access/access.service';
import { Access } from 'app/shared/model/access.model';

describe('Component Tests', () => {
    describe('Access Management Update Component', () => {
        let comp: AccessUpdateComponent;
        let fixture: ComponentFixture<AccessUpdateComponent>;
        let service: AccessService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [AccessUpdateComponent]
            })
                .overrideTemplate(AccessUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccessUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccessService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Access(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.access = entity;
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
                    const entity = new Access();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.access = entity;
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
