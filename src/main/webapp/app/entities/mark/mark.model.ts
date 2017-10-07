import { BaseEntity } from './../../shared';

export class Mark implements BaseEntity {
    constructor(
        public id?: number,
        public value?: number,
        public nth?: number,
        public evaluation?: BaseEntity,
        public skills?: BaseEntity,
        public student?: BaseEntity,
    ) {
    }
}
