import { BaseEntity } from './../../shared';
import {Skill} from '../skill/skill.model';

export class Area implements BaseEntity {
    constructor(
        public id?: number,
        public number?: number,
        public wording?: string,
        public active?: boolean,
        public skills?: Skill[],
    ) {
        this.active = false;
    }
}
