import {Route, Routes} from '@angular/router';
import {MarksComponent} from './marks.component';
import {UserRouteAccessService} from '../../shared/auth/user-route-access-service';
import {ObservationPopupComponent} from '../observation-dialog.component';

export const marksRoute: Routes = [
    {
        path: 'observation/:id/marks',
        component: MarksComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Résultats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marksPopupRoute: Routes = [
    {
        path: 'marks-new',
        component: ObservationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Résulats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
