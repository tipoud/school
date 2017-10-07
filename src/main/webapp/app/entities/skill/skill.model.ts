import { BaseEntity } from './../../shared';

export class Skill implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public level1?: string,
        public level2?: string,
        public level3?: string,
        public level4?: string,
        public active?: boolean,
        public area?: BaseEntity,
        public subjects?: BaseEntity[],
    ) {
        this.active = false;
    }
}
