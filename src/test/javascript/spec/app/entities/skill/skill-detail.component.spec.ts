/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GogradeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SkillDetailComponent } from '../../../../../../main/webapp/app/entities/skill/skill-detail.component';
import { SkillService } from '../../../../../../main/webapp/app/entities/skill/skill.service';
import { Skill } from '../../../../../../main/webapp/app/entities/skill/skill.model';

describe('Component Tests', () => {

    describe('Skill Management Detail Component', () => {
        let comp: SkillDetailComponent;
        let fixture: ComponentFixture<SkillDetailComponent>;
        let service: SkillService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GogradeTestModule],
                declarations: [SkillDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SkillService,
                    JhiEventManager
                ]
            }).overrideTemplate(SkillDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Skill(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.skill).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
