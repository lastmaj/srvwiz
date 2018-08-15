/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SrvwizTestModule } from '../../../test.module';
import { DataSourceDeleteDialogComponent } from 'app/entities/data-source/data-source-delete-dialog.component';
import { DataSourceService } from 'app/entities/data-source/data-source.service';

describe('Component Tests', () => {
    describe('DataSource Management Delete Component', () => {
        let comp: DataSourceDeleteDialogComponent;
        let fixture: ComponentFixture<DataSourceDeleteDialogComponent>;
        let service: DataSourceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [DataSourceDeleteDialogComponent]
            })
                .overrideTemplate(DataSourceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DataSourceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSourceService);
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
