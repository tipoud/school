import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Evaluation } from './evaluation.model';
import { EvaluationService } from './evaluation.service';

@Injectable()
export class EvaluationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private evaluationService: EvaluationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.evaluationService.find(id).subscribe((evaluation) => {
                    if (evaluation.date) {
                        evaluation.date = {
                            year: evaluation.date.getFullYear(),
                            month: evaluation.date.getMonth() + 1,
                            day: evaluation.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.evaluationModalRef(component, evaluation);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.evaluationModalRef(component, new Evaluation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    evaluationModalRef(component: Component, evaluation: Evaluation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.evaluation = evaluation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
