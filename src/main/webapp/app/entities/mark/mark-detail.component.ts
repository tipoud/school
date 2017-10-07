import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Mark } from './mark.model';
import { MarkService } from './mark.service';

@Component({
    selector: 'jhi-mark-detail',
    templateUrl: './mark-detail.component.html'
})
export class MarkDetailComponent implements OnInit, OnDestroy {

    mark: Mark;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private markService: MarkService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMarks();
    }

    load(id) {
        this.markService.find(id).subscribe((mark) => {
            this.mark = mark;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMarks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'markListModification',
            (response) => this.load(this.mark.id)
        );
    }
}
