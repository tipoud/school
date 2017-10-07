import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MarkComponent } from './mark.component';
import { MarkDetailComponent } from './mark-detail.component';
import { MarkPopupComponent } from './mark-dialog.component';
import { MarkDeletePopupComponent } from './mark-delete-dialog.component';

export const markRoute: Routes = [
    {
        path: 'mark',
        component: MarkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mark/:id',
        component: MarkDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const markPopupRoute: Routes = [
    {
        path: 'mark-new',
        component: MarkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mark/:id/edit',
        component: MarkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mark/:id/delete',
        component: MarkDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
