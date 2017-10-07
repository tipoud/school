import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared/auth/principal.service';

@Component({
    selector: 'jhi-observation',
    templateUrl: './observation.component.html',
    styleUrls: [
        'observation.scss'
    ]
})
export class ObservationComponent implements OnInit {
    account: Account;

    constructor(private principal: Principal) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

}
