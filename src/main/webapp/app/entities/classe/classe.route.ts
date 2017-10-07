import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ClasseComponent } from './classe.component';
import { ClasseDetailComponent } from './classe-detail.component';
import { ClassePopupComponent } from './classe-dialog.component';
import { ClasseDeletePopupComponent } from './classe-delete-dialog.component';

export const classeRoute: Routes = [
    {
        path: 'classe',
        component: ClasseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'classe/:id',
        component: ClasseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classePopupRoute: Routes = [
    {
        path: 'classe-new',
        component: ClassePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classe/:id/edit',
        component: ClassePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classe/:id/delete',
        component: ClasseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
