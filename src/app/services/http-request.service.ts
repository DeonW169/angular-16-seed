import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SnakeToCamelCasePipe } from 'src/app/core/pipes/snakeToCamelCase/snake-to-camel-case-pipe';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private rootUrl = environment.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    protected snakeToCamelCasePipe: SnakeToCamelCasePipe
  ) {}

  /** GET ALL */
  getAllRequest(getUrl: string): Observable<any> {
    const url = `${this.rootUrl}/${getUrl}`;

    return this.http.get<any>(url, this.httpOptions).pipe(
      map((resp) => {
        if (resp) {
          return this.snakeToCamelCasePipe.transform(resp);
        }
        return resp;
      })
    );
  }

  /** GET Using By Passing Query Params */
  getWithParamsRequest(getUrl: string, data: any): Observable<any> {
    const url = `${this.rootUrl}/${getUrl}`;
    return this.http.get<any[]>(url, { params: data });
  }

  /** GET ALL */
  getQueryParamRequestBlob(getUrl: string): Observable<any> {
    const url = `${this.rootUrl}/${getUrl}`;
    return this.http.get<any[]>(url);
  }

  /** GET BY ID */
  getByIdRequest(getByIdUrl: string, customId: any): Observable<any> {
    const url = `${this.rootUrl}/${getByIdUrl}/${encodeURI(customId)}/`;
    return this.http.get<any>(url);
  }

  getByDoubleIdRequest(
    getByIdUrl: string,
    customId1: any,
    separator: string,
    customId2: any
  ): Observable<any> {
    const url = `${this.rootUrl}/${getByIdUrl}/${customId1}/${separator}/${customId2}/`;
    return this.http.get<any>(url);
  }

  /** GET Blob(image,pdf) */
  getByIdRequestBlob(blobUrl: string): Observable<Blob> {
    const url = `${this.rootUrl}/${blobUrl}`;
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(catchError(this.handleError<Blob>(`get`)));
  }

  /** PUT */
  updateRequest(updateUrl: string, myObject: any): Observable<any> {
    const url = `${this.rootUrl}/${updateUrl}`;
    return this.http.put(url, myObject, this.httpOptions);
  }

  /** PATCH */
  updatePatchRequest(updateUrl: string, myObject: any): Observable<any> {
    const url = `${this.rootUrl}/${updateUrl}`;
    return this.http.patch(url, myObject, this.httpOptions);
  }

  /** POST */
  postRequest(postUrl: string, myObject: any): Observable<any> {
    let url: string;
    if (postUrl.includes(this.rootUrl)) {
      url = postUrl;
    } else {
      url = `${this.rootUrl}/${postUrl}`;
    }
    return this.http.post<any>(url, myObject, this.httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /** PUT */
  putRequest(putUrl: string, myObject: any): Observable<any> {
    let url: string;
    if (putUrl.includes(this.rootUrl)) {
      url = putUrl;
    } else {
      url = `${this.rootUrl}/${putUrl}`;
    }
    return this.http.put<any>(url, myObject, this.httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /** PATCH */
  patchRequest(putUrl: string, myObject: any): Observable<any> {
    let url: string;
    if (putUrl.includes(this.rootUrl)) {
      url = putUrl;
    } else {
      url = `${this.rootUrl}/${putUrl}`;
    }
    return this.http.patch<any>(url, myObject, this.httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /** DELETE */
  deleteRequest(deleteUrl: string, myObject: any): Observable<any> {
    const url = `${this.rootUrl}/${deleteUrl}`;
    // @ts-ignore
    this.httpOptions.body = myObject;
    return this.http.delete<any>(url, this.httpOptions);
  }

  /**
   * SEARCH By Term
   * @param searchUrl - search endpoint
   * @param name - search term
   * @param term - search by?
   */
  searchUrlQuery(
    searchUrl: string,
    name: string,
    term: string
  ): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.rootUrl}/${searchUrl}?${name}=${term}`;
    return this.http.get<any[]>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return throwError(error);
    };
  }
}
