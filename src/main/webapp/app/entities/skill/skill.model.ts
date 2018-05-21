import { BaseEntity } from './../../shared';
import {Area} from '../area/area.model';
import {Subject} from '../subject/subject.model';

export class Skill implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public level1?: string,
        public level2?: string,
        public level3?: string,
        public level4?: string,
        public active?: boolean,
        public area?: Area,
        public subjects?: Subject[],
    ) {
        this.active = false;
    }
}
