/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SrvwizTestModule } from '../../../test.module';
import { PlanUpdateComponent } from 'app/entities/plan/plan-update.component';
import { PlanService } from 'app/entities/plan/plan.service';
import { Plan } from 'app/shared/model/plan.model';

describe('Component Tests', () => {
    describe('Plan Management Update Component', () => {
        let comp: PlanUpdateComponent;
        let fixture: ComponentFixture<PlanUpdateComponent>;
        let service: PlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [PlanUpdateComponent]
            })
                .overrideTemplate(PlanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Plan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plan = entity;
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
                    const entity = new Plan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plan = entity;
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
