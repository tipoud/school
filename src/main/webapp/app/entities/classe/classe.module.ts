import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GogradeSharedModule } from '../../shared';
import {
    ClasseService,
    ClassePopupService,
    ClasseComponent,
    ClasseDetailComponent,
    ClasseDialogComponent,
    ClassePopupComponent,
    ClasseDeletePopupComponent,
    ClasseDeleteDialogComponent,
    classeRoute,
    classePopupRoute,
} from './';

const ENTITY_STATES = [
    ...classeRoute,
    ...classePopupRoute,
];

@NgModule({
    imports: [
        GogradeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ClasseComponent,
        ClasseDetailComponent,
        ClasseDialogComponent,
        ClasseDeleteDialogComponent,
        ClassePopupComponent,
        ClasseDeletePopupComponent,
    ],
    entryComponents: [
        ClasseComponent,
        ClasseDialogComponent,
        ClassePopupComponent,
        ClasseDeleteDialogComponent,
        ClasseDeletePopupComponent,
    ],
    providers: [
        ClasseService,
        ClassePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeClasseModule {}
