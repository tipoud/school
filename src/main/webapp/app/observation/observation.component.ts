import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared/auth/principal.service';
import {Teacher} from '../entities/teacher/teacher.model';
import {TeacherService} from '../entities/teacher/teacher.service';
import {Subscription} from 'rxjs/Subscription';
import {EvaluationService} from '../entities/evaluation/evaluation.service';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Evaluation} from '../entities/evaluation/evaluation.model';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {ITEMS_PER_PAGE} from '../shared/constants/pagination.constants';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';


@Component({
    selector: 'jhi-observation',
    templateUrl: './observation.component.html',
    styleUrls: [
        'observation.scss'
    ]
})
export class ObservationComponent implements OnInit {

    teacher: Teacher;
    evaluations: Evaluation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    optionsModel: Evaluation[];
    myOptions: IMultiSelectOption[];


    constructor(private principal: Principal,
                private teacherService: TeacherService,
                private evaluationService: EvaluationService,
                private alertService: JhiAlertService,
                private parseLinks: JhiParseLinks,
                private eventManager: JhiEventManager,
                ) {
        this.evaluations = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.teacherService.findCurrent().subscribe((teacher) => this.teacher = teacher)
        this.registerChangeInObservations()
    }

    initDrop(){
        this.myOptions = [];
        for (let evaluation of this.evaluations) {
            this.myOptions.push({id: evaluation, name: evaluation.wording})
        }
    }

    registerChangeInObservations() {
        this.eventSubscriber = this.eventManager.subscribe('observationListModification', (response) => this.reset());
    }

    reset() {
        this.evaluations = [];
        this.loadAll();
    }

    loadAll() {
        this.evaluationService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.evaluations.push(data[i]);
        }
        this.initDrop()
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    // DropDown Methods

    mySettings: IMultiSelectSettings = {
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true,
        fixedTitle : true
    };

    myTexts: IMultiSelectTexts = {
        checkAll: 'Selectionner tout',
        uncheckAll: 'Déselectionner tout',
        checked: 'évaluation sélectionnée',
        checkedPlural: 'évaluations sélectionnées',
        allSelected: 'Toutes les évaluations',
    };


}
