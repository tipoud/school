import { BaseEntity } from './../../shared';

export class Classe implements BaseEntity {
    constructor(
        public id?: number,
        public level?: number,
        public wording?: string,
        public active?: boolean,
        public year?: number,
        public students?: BaseEntity[],
        public teachers?: BaseEntity[],
    ) {
        this.active = true;
    }

    fullName() : String {
        let name = this.level + "ème " + this.wording
        return name;
    }
}
