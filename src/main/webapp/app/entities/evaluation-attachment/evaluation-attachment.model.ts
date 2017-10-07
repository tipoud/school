import { BaseEntity } from './../../shared';

export class EvaluationAttachment implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public type?: string,
        public date?: any,
        public path?: string,
        public evalution?: BaseEntity,
    ) {
    }
}
