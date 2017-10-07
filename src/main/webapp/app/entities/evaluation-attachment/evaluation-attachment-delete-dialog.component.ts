import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EvaluationAttachment } from './evaluation-attachment.model';
import { EvaluationAttachmentPopupService } from './evaluation-attachment-popup.service';
import { EvaluationAttachmentService } from './evaluation-attachment.service';

@Component({
    selector: 'jhi-evaluation-attachment-delete-dialog',
    templateUrl: './evaluation-attachment-delete-dialog.component.html'
})
export class EvaluationAttachmentDeleteDialogComponent {

    evaluationAttachment: EvaluationAttachment;

    constructor(
        private evaluationAttachmentService: EvaluationAttachmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.evaluationAttachmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'evaluationAttachmentListModification',
                content: 'Deleted an evaluationAttachment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evaluation-attachment-delete-popup',
    template: ''
})
export class EvaluationAttachmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationAttachmentPopupService: EvaluationAttachmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.evaluationAttachmentPopupService
                .open(EvaluationAttachmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
