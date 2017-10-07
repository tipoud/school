import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EvaluationAttachment } from './evaluation-attachment.model';
import { EvaluationAttachmentPopupService } from './evaluation-attachment-popup.service';
import { EvaluationAttachmentService } from './evaluation-attachment.service';
import { Evaluation, EvaluationService } from '../evaluation';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evaluation-attachment-dialog',
    templateUrl: './evaluation-attachment-dialog.component.html'
})
export class EvaluationAttachmentDialogComponent implements OnInit {

    evaluationAttachment: EvaluationAttachment;
    isSaving: boolean;

    evaluations: Evaluation[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private evaluationAttachmentService: EvaluationAttachmentService,
        private evaluationService: EvaluationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.evaluationService.query()
            .subscribe((res: ResponseWrapper) => { this.evaluations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evaluationAttachment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.evaluationAttachmentService.update(this.evaluationAttachment));
        } else {
            this.subscribeToSaveResponse(
                this.evaluationAttachmentService.create(this.evaluationAttachment));
        }
    }

    private subscribeToSaveResponse(result: Observable<EvaluationAttachment>) {
        result.subscribe((res: EvaluationAttachment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EvaluationAttachment) {
        this.eventManager.broadcast({ name: 'evaluationAttachmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackEvaluationById(index: number, item: Evaluation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-evaluation-attachment-popup',
    template: ''
})
export class EvaluationAttachmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationAttachmentPopupService: EvaluationAttachmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.evaluationAttachmentPopupService
                    .open(EvaluationAttachmentDialogComponent as Component, params['id']);
            } else {
                this.evaluationAttachmentPopupService
                    .open(EvaluationAttachmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
