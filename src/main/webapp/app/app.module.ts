import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { GogradeSharedModule, UserRouteAccessService } from './shared';
import { GogradeHomeModule } from './home/home.module';
import { GogradeObservationModule } from './observation/observation.module';
import { GogradeAdminModule } from './admin/admin.module';
import { GogradeAccountModule } from './account/account.module';
import { GogradeEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import { ObservationComponent } from './observation/observation.component';
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect";

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        GogradeSharedModule,
        GogradeHomeModule,
        GogradeAdminModule,
        GogradeAccountModule,
        GogradeEntityModule,
        GogradeObservationModule,
        NgbModule.forRoot(),
        MultiselectDropdownModule,

        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class GogradeAppModule {}
