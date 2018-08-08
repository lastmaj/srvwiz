/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SrvwizTestModule } from '../../../test.module';
import { WebserviceComponent } from 'app/entities/webservice/webservice.component';
import { WebserviceService } from 'app/entities/webservice/webservice.service';
import { Webservice } from 'app/shared/model/webservice.model';

describe('Component Tests', () => {
    describe('Webservice Management Component', () => {
        let comp: WebserviceComponent;
        let fixture: ComponentFixture<WebserviceComponent>;
        let service: WebserviceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [WebserviceComponent],
                providers: []
            })
                .overrideTemplate(WebserviceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WebserviceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebserviceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Webservice(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.webservices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
