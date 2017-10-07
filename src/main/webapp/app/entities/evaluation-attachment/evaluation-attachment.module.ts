import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GogradeSharedModule } from '../../shared';
import {
    EvaluationAttachmentService,
    EvaluationAttachmentPopupService,
    EvaluationAttachmentComponent,
    EvaluationAttachmentDetailComponent,
    EvaluationAttachmentDialogComponent,
    EvaluationAttachmentPopupComponent,
    EvaluationAttachmentDeletePopupComponent,
    EvaluationAttachmentDeleteDialogComponent,
    evaluationAttachmentRoute,
    evaluationAttachmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...evaluationAttachmentRoute,
    ...evaluationAttachmentPopupRoute,
];

@NgModule({
    imports: [
        GogradeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EvaluationAttachmentComponent,
        EvaluationAttachmentDetailComponent,
        EvaluationAttachmentDialogComponent,
        EvaluationAttachmentDeleteDialogComponent,
        EvaluationAttachmentPopupComponent,
        EvaluationAttachmentDeletePopupComponent,
    ],
    entryComponents: [
        EvaluationAttachmentComponent,
        EvaluationAttachmentDialogComponent,
        EvaluationAttachmentPopupComponent,
        EvaluationAttachmentDeleteDialogComponent,
        EvaluationAttachmentDeletePopupComponent,
    ],
    providers: [
        EvaluationAttachmentService,
        EvaluationAttachmentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeEvaluationAttachmentModule {}
