import { BaseEntity } from './../../shared';
import {Teacher} from '../teacher/teacher.model';
import {Classe} from "../classe/classe.model";

export class Evaluation implements BaseEntity {
    constructor(
        public id?: number,
        public wording?: string,
        public date?: any,
        public comment?: string,
        public status?: number,
        public file?: BaseEntity,
        public classe?: Classe,
        public teacher?: Teacher,
        public subject?: BaseEntity,
    ) {
    }
}
