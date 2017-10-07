import { BaseEntity } from './../../shared';

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public lastName?: string,
        public firstName?: string,
        public classe?: BaseEntity,
    ) {
    }
}
