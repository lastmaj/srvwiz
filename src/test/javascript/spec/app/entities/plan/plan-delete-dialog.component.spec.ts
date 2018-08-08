/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SrvwizTestModule } from '../../../test.module';
import { PlanDeleteDialogComponent } from 'app/entities/plan/plan-delete-dialog.component';
import { PlanService } from 'app/entities/plan/plan.service';

describe('Component Tests', () => {
    describe('Plan Management Delete Component', () => {
        let comp: PlanDeleteDialogComponent;
        let fixture: ComponentFixture<PlanDeleteDialogComponent>;
        let service: PlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [PlanDeleteDialogComponent]
            })
                .overrideTemplate(PlanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
