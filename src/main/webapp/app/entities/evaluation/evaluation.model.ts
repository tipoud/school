import { BaseEntity } from './../../shared';

export class Evaluation implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public date?: any,
        public comment?: string,
        public status?: number,
        public file?: BaseEntity,
        public classe?: BaseEntity,
        public teacher?: BaseEntity,
    ) {
    }
}
