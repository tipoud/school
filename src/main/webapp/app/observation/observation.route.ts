import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { ObservationComponent } from './';

export const OBSERVATION_ROUTE: Route = {
    path: 'observation',
    component: ObservationComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Observation'
    }
};
