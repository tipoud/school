import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mark } from './mark.model';
import { MarkPopupService } from './mark-popup.service';
import { MarkService } from './mark.service';
import { Evaluation, EvaluationService } from '../evaluation';
import { Skill, SkillService } from '../skill';
import { Student, StudentService } from '../student';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-mark-dialog',
    templateUrl: './mark-dialog.component.html'
})
export class MarkDialogComponent implements OnInit {

    mark: Mark;
    isSaving: boolean;

    evaluations: Evaluation[];

    skills: Skill[];

    students: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private markService: MarkService,
        private evaluationService: EvaluationService,
        private skillService: SkillService,
        private studentService: StudentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.evaluationService.query()
            .subscribe((res: ResponseWrapper) => { this.evaluations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.skillService.query()
            .subscribe((res: ResponseWrapper) => { this.skills = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.studentService.query()
            .subscribe((res: ResponseWrapper) => { this.students = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mark.id !== undefined) {
            this.subscribeToSaveResponse(
                this.markService.update(this.mark));
        } else {
            this.subscribeToSaveResponse(
                this.markService.create(this.mark));
        }
    }

    private subscribeToSaveResponse(result: Observable<Mark>) {
        result.subscribe((res: Mark) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Mark) {
        this.eventManager.broadcast({ name: 'markListModification', content: 'OK'});
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

    trackSkillById(index: number, item: Skill) {
        return item.id;
    }

    trackStudentById(index: number, item: Student) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mark-popup',
    template: ''
})
export class MarkPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private markPopupService: MarkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.markPopupService
                    .open(MarkDialogComponent as Component, params['id']);
            } else {
                this.markPopupService
                    .open(MarkDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
