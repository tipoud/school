import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GogradeSharedModule} from '../shared';

import {ObservationComponent, observationRoute} from './';
import {ObservationDialogComponent, ObservationPopupComponent} from "./observation-dialog.component";
import {EvaluationService} from "../entities/evaluation/evaluation.service";
import {ObservationPopupService} from "./observation-popup-service";
import {observationPopupRoute} from "./observation.route";

const ENTITY_STATES = [
    ...observationRoute,
    ...observationPopupRoute,
];

@NgModule({
    imports: [
        GogradeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ObservationComponent,
        ObservationDialogComponent,
        ObservationPopupComponent
    ],
    entryComponents: [
        ObservationComponent,
        ObservationDialogComponent,
        ObservationPopupComponent
    ],
    providers: [
        EvaluationService,
        ObservationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeObservationModule {}
