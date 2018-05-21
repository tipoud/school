import { BaseEntity } from './../../shared';
import {StringUtils} from '../../Utils/StringUtils/StringUtils';
import {Classe} from '../classe/classe.model';

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public lastName?: string,
        public firstName?: string,
        public classe?: Classe,
    ) {
    }

    public studentFullName(): string {
        return this.lastName
        // return this.lastName.toUpperCase() + ' ' + StringUtils.captitalizeFirst(this.firstName);
    }
}
