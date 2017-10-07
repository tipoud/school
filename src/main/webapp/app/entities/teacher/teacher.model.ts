import { BaseEntity, User } from './../../shared';

export class Teacher implements BaseEntity {
    constructor(
        public id?: number,
        public lastName?: string,
        public firstName?: string,
        public user?: User,
        public classes?: BaseEntity[],
        public subjects?: BaseEntity[],
    ) {
    }
}
