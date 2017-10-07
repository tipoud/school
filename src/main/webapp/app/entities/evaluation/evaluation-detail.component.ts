import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Evaluation } from './evaluation.model';
import { EvaluationService } from './evaluation.service';

@Component({
    selector: 'jhi-evaluation-detail',
    templateUrl: './evaluation-detail.component.html'
})
export class EvaluationDetailComponent implements OnInit, OnDestroy {

    evaluation: Evaluation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private evaluationService: EvaluationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvaluations();
    }

    load(id) {
        this.evaluationService.find(id).subscribe((evaluation) => {
            this.evaluation = evaluation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvaluations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'evaluationListModification',
            (response) => this.load(this.evaluation.id)
        );
    }
}
