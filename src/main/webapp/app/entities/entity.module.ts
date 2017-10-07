import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GogradeClasseModule } from './classe/classe.module';
import { GogradeStudentModule } from './student/student.module';
import { GogradeAreaModule } from './area/area.module';
import { GogradeSkillModule } from './skill/skill.module';
import { GogradeMarkModule } from './mark/mark.module';
import { GogradeEvaluationModule } from './evaluation/evaluation.module';
import { GogradeSubjectModule } from './subject/subject.module';
import { GogradeEvaluationAttachmentModule } from './evaluation-attachment/evaluation-attachment.module';
import { GogradeTeacherModule } from './teacher/teacher.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GogradeClasseModule,
        GogradeStudentModule,
        GogradeAreaModule,
        GogradeSkillModule,
        GogradeMarkModule,
        GogradeEvaluationModule,
        GogradeSubjectModule,
        GogradeEvaluationAttachmentModule,
        GogradeTeacherModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeEntityModule {}
