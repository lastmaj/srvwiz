/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SrvwizTestModule } from '../../../test.module';
import { AccessDeleteDialogComponent } from 'app/entities/access/access-delete-dialog.component';
import { AccessService } from 'app/entities/access/access.service';

describe('Component Tests', () => {
    describe('Access Management Delete Component', () => {
        let comp: AccessDeleteDialogComponent;
        let fixture: ComponentFixture<AccessDeleteDialogComponent>;
        let service: AccessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [AccessDeleteDialogComponent]
            })
                .overrideTemplate(AccessDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccessService);
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
