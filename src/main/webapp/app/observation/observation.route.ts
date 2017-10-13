
import {UserRouteAccessService} from '../shared';
import {ObservationComponent} from './';
import {ObservationPopupComponent} from './observation-dialog.component';
import {Route, Routes} from '@angular/router';

export const observationRoute: Routes = [
    {
        path: 'observation',
        component: ObservationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Observations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const observationPopupRoute: Routes = [
    {
        path: 'observation-new',
        component: ObservationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Observation'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
