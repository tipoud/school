/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GogradeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EvaluationAttachmentDetailComponent } from '../../../../../../main/webapp/app/entities/evaluation-attachment/evaluation-attachment-detail.component';
import { EvaluationAttachmentService } from '../../../../../../main/webapp/app/entities/evaluation-attachment/evaluation-attachment.service';
import { EvaluationAttachment } from '../../../../../../main/webapp/app/entities/evaluation-attachment/evaluation-attachment.model';

describe('Component Tests', () => {

    describe('EvaluationAttachment Management Detail Component', () => {
        let comp: EvaluationAttachmentDetailComponent;
        let fixture: ComponentFixture<EvaluationAttachmentDetailComponent>;
        let service: EvaluationAttachmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GogradeTestModule],
                declarations: [EvaluationAttachmentDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EvaluationAttachmentService,
                    JhiEventManager
                ]
            }).overrideTemplate(EvaluationAttachmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationAttachmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationAttachmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EvaluationAttachment(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.evaluationAttachment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
