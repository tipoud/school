import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EvaluationAttachmentComponent } from './evaluation-attachment.component';
import { EvaluationAttachmentDetailComponent } from './evaluation-attachment-detail.component';
import { EvaluationAttachmentPopupComponent } from './evaluation-attachment-dialog.component';
import { EvaluationAttachmentDeletePopupComponent } from './evaluation-attachment-delete-dialog.component';

export const evaluationAttachmentRoute: Routes = [
    {
        path: 'evaluation-attachment',
        component: EvaluationAttachmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evaluation-attachment/:id',
        component: EvaluationAttachmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluationAttachmentPopupRoute: Routes = [
    {
        path: 'evaluation-attachment-new',
        component: EvaluationAttachmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluation-attachment/:id/edit',
        component: EvaluationAttachmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluation-attachment/:id/delete',
        component: EvaluationAttachmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
