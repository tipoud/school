import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evaluation } from './evaluation.model';
import { EvaluationPopupService } from './evaluation-popup.service';
import { EvaluationService } from './evaluation.service';
import { EvaluationAttachment, EvaluationAttachmentService } from '../evaluation-attachment';
import { Classe, ClasseService } from '../classe';
import { Teacher, TeacherService } from '../teacher';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evaluation-dialog',
    templateUrl: './evaluation-dialog.component.html'
})
export class EvaluationDialogComponent implements OnInit {

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
    selector: 'jhi-evaluation-popup',
    template: ''
})
export class EvaluationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationPopupService: EvaluationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.evaluationPopupService
                    .open(EvaluationDialogComponent as Component, params['id']);
            } else {
                this.evaluationPopupService
                    .open(EvaluationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
