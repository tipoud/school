import { BaseEntity } from './../../shared';
import {Skill} from '../skill/skill.model';
import {Teacher} from '../teacher/teacher.model';

export class Subject implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public abreviation?: string,
        public active?: boolean,
        public skills?: Skill[],
        public teachers?: Teacher[],
    ) {
        this.active = false;
    }
}
