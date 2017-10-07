import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Evaluation} from "../entities/evaluation/evaluation.model";
import {EvaluationAttachment} from "../entities/evaluation-attachment/evaluation-attachment.model";
import {Classe} from "../entities/classe/classe.model";
import {Teacher} from "../entities/teacher/teacher.model";
import {EvaluationService} from "../entities/evaluation/evaluation.service";
import {EvaluationAttachmentService} from "../entities/evaluation-attachment/evaluation-attachment.service";
import {ClasseService} from "../entities/classe/classe.service";
import {TeacherService} from "../entities/teacher/teacher.service";
import {ResponseWrapper} from "../shared/model/response-wrapper.model";
import {ObservationPopupService} from "./observation-popup-service";

@Component({
    selector: 'jhi-observation-dialog',
    templateUrl: './observation-dialog.component.html'
})
export class ObservationDialogComponent implements OnInit {

    evaluation: Evaluation;
    isSaving: boolean;

    files: EvaluationAttachment[];

    classes: Classe[];

    teachers: Teacher[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private evaluationService: EvaluationService,
        private evaluationAttachmentService: EvaluationAttachmentService,
        private classeService: ClasseService,
        private teacherService: TeacherService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.evaluationAttachmentService
            .query({filter: 'evalution(wording)-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.evaluation.file || !this.evaluation.file.id) {
                    this.files = res.json;
                } else {
                    this.evaluationAttachmentService
                        .find(this.evaluation.file.id)
                        .subscribe((subRes: EvaluationAttachment) => {
                            this.files = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.classeService.query()
            .subscribe((res: ResponseWrapper) => { this.classes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.teacherService.query()
            .subscribe((res: ResponseWrapper) => { this.teachers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evaluation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.evaluationService.update(this.evaluation));
        } else {
            this.subscribeToSaveResponse(
                this.evaluationService.create(this.evaluation));
        }
    }

    private subscribeToSaveResponse(result: Observable<Evaluation>) {
        result.subscribe((res: Evaluation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Evaluation) {
        this.eventManager.broadcast({ name: 'evaluationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackEvaluationAttachmentById(index: number, item: EvaluationAttachment) {
        return item.id;
    }

    trackClasseById(index: number, item: Classe) {
        return item.id;
    }

    trackTeacherById(index: number, item: Teacher) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-observation-popup',
    template: ''
})
export class ObservationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private observationPopupService: ObservationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.observationPopupService
                    .open(ObservationDialogComponent as Component, params['id']);
            } else {
                this.observationPopupService
                    .open(ObservationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
