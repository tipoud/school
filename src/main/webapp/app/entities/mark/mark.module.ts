import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GogradeSharedModule } from '../../shared';
import {
    MarkService,
    MarkPopupService,
    MarkComponent,
    MarkDetailComponent,
    MarkDialogComponent,
    MarkPopupComponent,
    MarkDeletePopupComponent,
    MarkDeleteDialogComponent,
    markRoute,
    markPopupRoute,
} from './';

const ENTITY_STATES = [
    ...markRoute,
    ...markPopupRoute,
];

@NgModule({
    imports: [
        GogradeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MarkComponent,
        MarkDetailComponent,
        MarkDialogComponent,
        MarkDeleteDialogComponent,
        MarkPopupComponent,
        MarkDeletePopupComponent,
    ],
    entryComponents: [
        MarkComponent,
        MarkDialogComponent,
        MarkPopupComponent,
        MarkDeleteDialogComponent,
        MarkDeletePopupComponent,
    ],
    providers: [
        MarkService,
        MarkPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeMarkModule {}
