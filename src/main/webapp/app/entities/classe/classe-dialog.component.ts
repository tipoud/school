import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Classe } from './classe.model';
import { ClassePopupService } from './classe-popup.service';
import { ClasseService } from './classe.service';
import { Teacher, TeacherService } from '../teacher';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-classe-dialog',
    templateUrl: './classe-dialog.component.html'
})
export class ClasseDialogComponent implements OnInit {

    classe: Classe;
    isSaving: boolean;

    teachers: Teacher[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private classeService: ClasseService,
        private teacherService: TeacherService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teacherService.query()
            .subscribe((res: ResponseWrapper) => { this.teachers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classeService.update(this.classe));
        } else {
            this.subscribeToSaveResponse(
                this.classeService.create(this.classe));
        }
    }

    private subscribeToSaveResponse(result: Observable<Classe>) {
        result.subscribe((res: Classe) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Classe) {
        this.eventManager.broadcast({ name: 'classeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackTeacherById(index: number, item: Teacher) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-classe-popup',
    template: ''
})
export class ClassePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classePopupService: ClassePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classePopupService
                    .open(ClasseDialogComponent as Component, params['id']);
            } else {
                this.classePopupService
                    .open(ClasseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
