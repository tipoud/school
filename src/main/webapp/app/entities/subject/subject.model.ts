import { BaseEntity } from './../../shared';

export class Subject implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public abreviation?: string,
        public active?: boolean,
        public skills?: BaseEntity[],
        public teachers?: BaseEntity[],
    ) {
        this.active = false;
    }
}
