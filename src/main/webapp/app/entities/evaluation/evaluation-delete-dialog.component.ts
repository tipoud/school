import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Evaluation } from './evaluation.model';
import { EvaluationPopupService } from './evaluation-popup.service';
import { EvaluationService } from './evaluation.service';

@Component({
    selector: 'jhi-evaluation-delete-dialog',
    templateUrl: './evaluation-delete-dialog.component.html'
})
export class EvaluationDeleteDialogComponent {

    evaluation: Evaluation;

    constructor(
        private evaluationService: EvaluationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        console.log("confimDelete")
        this.evaluationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'evaluationListModification',
                content: 'Deleted an evaluation'
            });
            this.activeModal.dismiss(true);
            console.log("OK")

        });
    }
}

@Component({
    selector: 'jhi-evaluation-delete-popup',
    template: ''
})
export class EvaluationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationPopupService: EvaluationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.evaluationPopupService
                .open(EvaluationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
