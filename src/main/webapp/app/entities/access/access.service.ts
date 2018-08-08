import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccess } from 'app/shared/model/access.model';

type EntityResponseType = HttpResponse<IAccess>;
type EntityArrayResponseType = HttpResponse<IAccess[]>;

@Injectable({ providedIn: 'root' })
export class AccessService {
    private resourceUrl = SERVER_API_URL + 'api/accesses';

    constructor(private http: HttpClient) {}

    create(access: IAccess): Observable<EntityResponseType> {
        return this.http.post<IAccess>(this.resourceUrl, access, { observe: 'response' });
    }

    update(access: IAccess): Observable<EntityResponseType> {
        return this.http.put<IAccess>(this.resourceUrl, access, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAccess>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccess[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
