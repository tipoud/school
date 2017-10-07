import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Classe } from './classe.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClasseService {

    private resourceUrl = SERVER_API_URL + 'api/classes';

    constructor(private http: Http) { }

    create(classe: Classe): Observable<Classe> {
        const copy = this.convert(classe);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(classe: Classe): Observable<Classe> {
        const copy = this.convert(classe);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Classe> {
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

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(classe: Classe): Classe {
        const copy: Classe = Object.assign({}, classe);
        return copy;
    }
}
