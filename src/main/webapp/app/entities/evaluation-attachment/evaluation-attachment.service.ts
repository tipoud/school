import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EvaluationAttachment } from './evaluation-attachment.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EvaluationAttachmentService {

    private resourceUrl = SERVER_API_URL + 'api/evaluation-attachments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(evaluationAttachment: EvaluationAttachment): Observable<EvaluationAttachment> {
        const copy = this.convert(evaluationAttachment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(evaluationAttachment: EvaluationAttachment): Observable<EvaluationAttachment> {
        const copy = this.convert(evaluationAttachment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<EvaluationAttachment> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertLocalDateFromServer(entity.date);
    }

    private convert(evaluationAttachment: EvaluationAttachment): EvaluationAttachment {
        const copy: EvaluationAttachment = Object.assign({}, evaluationAttachment);
        copy.date = this.dateUtils
            .convertLocalDateToServer(evaluationAttachment.date);
        return copy;
    }
}
