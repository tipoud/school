import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {Teacher} from '../../entities/teacher/teacher.model';
import {Evaluation} from '../../entities/evaluation/evaluation.model';
import {Principal} from '../../shared/auth/principal.service';
import {TeacherService} from '../../entities/teacher/teacher.service';
import {EvaluationService} from '../../entities/evaluation/evaluation.service';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {StudentService} from '../../entities/student/student.service';
import {Student} from '../../entities/student/student.model';
import {Skill} from '../../entities/skill/skill.model';
import {Subject} from '../../entities/subject/subject.model';
import {ActivatedRoute} from '@angular/router';
import {SkillService} from '../../entities/skill/skill.service';
import {SubjectService} from "../../entities/subject/subject.service";
import {StringUtils} from "../../Utils/StringUtils/StringUtils";
import {Area} from "../../entities/area/area.model";

@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html',
    styleUrls: [
        'marks.scss'
    ]
})
export class MarksComponent implements OnInit {

    teacher: Teacher;
    evaluation: Evaluation;
    students: Student[];
    skills: Skill[];
    areas: Area[];
    subject: Subject;
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    selectedStudents: Student[];
    studentsOptions: IMultiSelectOption[];
    private subscription: Subscription;

    constructor(private principal: Principal,
                private teacherService: TeacherService,
                private studentService: StudentService,
                private evaluationService: EvaluationService,
                private subjectService : SubjectService,
                private alertService: JhiAlertService,
                private parseLinks: JhiParseLinks,
                private eventManager: JhiEventManager,
                private route: ActivatedRoute) {
        this.itemsPerPage = 40;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.selectedStudents = [];
    }

    ngOnInit() {

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.teacherService.findCurrent().subscribe((teacher) => this.teacher = teacher)

        this.subscription = this.route.params.subscribe((params) => {
            this.loadEvaluation(params['id']);
        });

        this.registerChangeInObservations()

    }

    loadEvaluation(id) {
        this.evaluationService.find(id).subscribe((evaluation) => {
            this.evaluation = evaluation;
            this.studentService.findAllByClasseId(this.evaluation.classe.id).subscribe(
                (res: ResponseWrapper) => this.onStudentsGetSuccess(res.json),
                (res: ResponseWrapper) => this.onStudentsGetError(res.json))
            this.subjectService.find(this.evaluation.subject.id).subscribe((subject) => {
                    this.subject = subject;
                    this.setAreas()});
        });
    }

    initStudentDrop() {
        this.studentsOptions = [];
        for (const student of this.students) {
            const fullname = student.lastName.toUpperCase() + ' ' + StringUtils.captitalizeFirst(student.firstName);
            this.studentsOptions.push({id: student, name: fullname})
        }
        for (const student of this.students) {
            this.selectedStudents.push(student)
        }
    }

    registerChangeInObservations() {
        this.eventSubscriber = this.eventManager.subscribe('evaluationListModification', (response) => this.reset());
    }

    addStudent() {
        let newEval = this.students.find(stu => this.selectedStudents.findIndex(student => student.id == stu.id) == -1)
        if (newEval) {
            this.selectedStudents.push(newEval)
        }
    }

    reset() {
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onStudentsGetSuccess(data) {
        this.students = []
        for (let i = 0; i < data.length; i++) {
            this.students.push(data[i]);
        }
        this.initStudentDrop()
    }

    private onStudentsGetError(error) {
        this.alertService.error(error.message, null, null);
    }

    private setAreas() {
        this.areas = [];
        this.subject.skills.forEach(skill => {
                let areaIndex = this.areas.findIndex(area => area.id === skill.area.id);
                if (areaIndex == -1 ) {
                    skill.area.skills = [skill]
                    this.areas.push(skill.area)
                } else {
                    this.areas[areaIndex].skills.push(skill)
                }
            }
        )
    }

    deleteStudent(id){
        this.selectedStudents.splice(this.selectedStudents.findIndex(student => student.id == id),1)
    }

    orderByStudentName() {
        this.selectedStudents.sort((n1,n2) => {
            return (n1.lastName < n2.lastName || n1.lastName == n2.lastName && n1.firstName < n2.firstName) ? -1 : 1
        })
    }

    mySettings: IMultiSelectSettings = {
        pullRight: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-primary btn-block',
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true,
        dynamicTitleMaxItems: 1,
    };

    myTexts: IMultiSelectTexts = {
        defaultTitle: "Elèves observés",
        checkAll: 'Tous les élèves',
        uncheckAll: 'Aucun',
        checked: 'élève sélectionné',
        checkedPlural: 'élèves sélectionnées',
        allSelected: 'Toutes les élèves',
    };
}
