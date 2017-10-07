/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GogradeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EvaluationDetailComponent } from '../../../../../../main/webapp/app/entities/evaluation/evaluation-detail.component';
import { EvaluationService } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.service';
import { Evaluation } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.model';

describe('Component Tests', () => {

    describe('Evaluation Management Detail Component', () => {
        let comp: EvaluationDetailComponent;
        let fixture: ComponentFixture<EvaluationDetailComponent>;
        let service: EvaluationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GogradeTestModule],
                declarations: [EvaluationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EvaluationService,
                    JhiEventManager
                ]
            }).overrideTemplate(EvaluationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Evaluation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.evaluation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
