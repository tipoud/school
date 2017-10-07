import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TeacherComponent } from './teacher.component';
import { TeacherDetailComponent } from './teacher-detail.component';
import { TeacherPopupComponent } from './teacher-dialog.component';
import { TeacherDeletePopupComponent } from './teacher-delete-dialog.component';

export const teacherRoute: Routes = [
    {
        path: 'teacher',
        component: TeacherComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'teacher/:id',
        component: TeacherDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher-new',
        component: TeacherPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teacher/:id/edit',
        component: TeacherPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teacher/:id/delete',
        component: TeacherDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
