/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GogradeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MarkDetailComponent } from '../../../../../../main/webapp/app/entities/mark/mark-detail.component';
import { MarkService } from '../../../../../../main/webapp/app/entities/mark/mark.service';
import { Mark } from '../../../../../../main/webapp/app/entities/mark/mark.model';

describe('Component Tests', () => {

    describe('Mark Management Detail Component', () => {
        let comp: MarkDetailComponent;
        let fixture: ComponentFixture<MarkDetailComponent>;
        let service: MarkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GogradeTestModule],
                declarations: [MarkDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MarkService,
                    JhiEventManager
                ]
            }).overrideTemplate(MarkDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarkDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Mark(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mark).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
