import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GogradeSharedModule } from '../shared';

import { OBSERVATION_ROUTE, ObservationComponent } from './';

@NgModule({
    imports: [
        GogradeSharedModule,
        RouterModule.forRoot([ OBSERVATION_ROUTE ], { useHash: true })
    ],
    declarations: [
        ObservationComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeObservationModule {}
