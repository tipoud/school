import { BaseEntity } from './../../shared';

export class Area implements BaseEntity {
    constructor(
        public id?: number,
        public number?: number,
        public wording?: string,
        public active?: boolean,
        public skills?: BaseEntity[],
    ) {
        this.active = false;
    }
}
