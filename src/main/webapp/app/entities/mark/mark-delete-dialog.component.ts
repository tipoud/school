import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mark } from './mark.model';
import { MarkPopupService } from './mark-popup.service';
import { MarkService } from './mark.service';

@Component({
    selector: 'jhi-mark-delete-dialog',
    templateUrl: './mark-delete-dialog.component.html'
})
export class MarkDeleteDialogComponent {

    mark: Mark;

    constructor(
        private markService: MarkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.markService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'markListModification',
                content: 'Deleted an mark'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mark-delete-popup',
    template: ''
})
export class MarkDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private markPopupService: MarkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.markPopupService
                .open(MarkDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
