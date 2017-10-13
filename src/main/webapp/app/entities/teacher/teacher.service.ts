import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Teacher } from './teacher.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TeacherService {

    private resourceUrl = SERVER_API_URL + 'api/teachers';

    constructor(private http: Http) { }

    create(teacher: Teacher): Observable<Teacher> {
        const copy = this.convert(teacher);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(teacher: Teacher): Observable<Teacher> {
        const copy = this.convert(teacher);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Teacher> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    findCurrent(): Observable<Teacher> {
        return this.http.get(`${this.resourceUrl}/current`).map((res: Response) => {
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

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(teacher: Teacher): Teacher {
        const copy: Teacher = Object.assign({}, teacher);
        return copy;
    }
}
