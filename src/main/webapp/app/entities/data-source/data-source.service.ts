import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDataSource } from 'app/shared/model/data-source.model';

type EntityResponseType = HttpResponse<IDataSource>;
type EntityArrayResponseType = HttpResponse<IDataSource[]>;

@Injectable({ providedIn: 'root' })
export class DataSourceService {
    private resourceUrl = SERVER_API_URL + 'api/data-sources';

    constructor(private http: HttpClient) {}

    create(dataSource: IDataSource): Observable<EntityResponseType> {
        return this.http.post<IDataSource>(this.resourceUrl, dataSource, { observe: 'response' });
    }

    update(dataSource: IDataSource): Observable<EntityResponseType> {
        return this.http.put<IDataSource>(this.resourceUrl, dataSource, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDataSource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDataSource[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
