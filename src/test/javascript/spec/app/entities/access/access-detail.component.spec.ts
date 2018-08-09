/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SrvwizTestModule } from '../../../test.module';
import { AccessDetailComponent } from 'app/entities/access/access-detail.component';
import { Access } from 'app/shared/model/access.model';

describe('Component Tests', () => {
    describe('Access Management Detail Component', () => {
        let comp: AccessDetailComponent;
        let fixture: ComponentFixture<AccessDetailComponent>;
        const route = ({ data: of({ access: new Access(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SrvwizTestModule],
                declarations: [AccessDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccessDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccessDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.access).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
