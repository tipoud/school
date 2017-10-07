import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EvaluationAttachment } from './evaluation-attachment.model';
import { EvaluationAttachmentService } from './evaluation-attachment.service';

@Component({
    selector: 'jhi-evaluation-attachment-detail',
    templateUrl: './evaluation-attachment-detail.component.html'
})
export class EvaluationAttachmentDetailComponent implements OnInit, OnDestroy {

    evaluationAttachment: EvaluationAttachment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private evaluationAttachmentService: EvaluationAttachmentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvaluationAttachments();
    }

    load(id) {
        this.evaluationAttachmentService.find(id).subscribe((evaluationAttachment) => {
            this.evaluationAttachment = evaluationAttachment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvaluationAttachments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'evaluationAttachmentListModification',
            (response) => this.load(this.evaluationAttachment.id)
        );
    }
}
