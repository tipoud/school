import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Student } from './student.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class StudentService {

    private resourceUrl = SERVER_API_URL + 'api/students';
    private resourceClasseUrl = SERVER_API_URL + 'api/classes';

    constructor(private http: Http) { }

    create(student: Student): Observable<Student> {
        console.log(JSON.stringify(student));
        const copy = this.convert(student);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(student: Student): Observable<Student> {
        const copy = this.convert(student);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Student> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    findAllByClasseId(id: number): Observable<ResponseWrapper> {
        const url = `${this.resourceClasseUrl}/${id}/students`;
        return this.http.get(url).map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(student: Student): Student {
        const copy: Student = Object.assign({}, student);
        return copy;
    }
}
