import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {marksPopupRoute, marksRoute} from './marks.route';
import {GogradeSharedModule} from '../../shared/shared.module';
import {MarksComponent} from './marks.component';
import {MarkService} from '../../entities/mark/mark.service';

const ENTITY_STATES = [
    ...marksRoute,
    ...marksPopupRoute,
];

@NgModule({
    imports: [
        GogradeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        NgbModule,
        MultiselectDropdownModule,
    ],
    declarations: [
        MarksComponent,
    ],
    entryComponents: [
        MarksComponent,
    ],
    providers: [
        MarkService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GogradeMarksModule {}
