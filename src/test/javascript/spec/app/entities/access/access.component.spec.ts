/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SrvwizTestModule } from '../../../test.module';
import { AccessComponent } from 'app/entities/access/access.component';
import { AccessService } from 'app/entities/access/access.service';
import { Access } from 'app/shared/model/access.model';

describe('Component Tests', () => {
    describe('Access Management Component', () => {
        let comp: AccessComponent;
        let fixture: ComponentFixture<AccessComponent>;
        let service: AccessService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [AccessComponent],
                providers: []
            })
                .overrideTemplate(AccessComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccessService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Access(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accesses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
