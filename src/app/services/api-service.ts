import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeInterval, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  api_url: string = 'https://localhost:44388/api';
  private formatErrors(error: any,) {
    console.log(error);
    setTimeout(() => {

    }, 500);
    return throwError(error.error);

  }
  getHeaders() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthToken(),
      'withCredentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'trues'
    });
    return headers;
  }
  getAuthToken() {
    var authToken = localStorage.getItem('token');
    return "Bearer " + authToken;
  }

  get<T>(path: string, params: HttpParams = new HttpParams(), observe: any = 'body', type? : any): Observable<any> {
    
    return this.http.get<T>(`${this.api_url}${path}`, { observe, params, responseType: type })
      .pipe(map(e => {
      console.log(e);
        return e;
      }), catchError(this.formatErrors)
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
  
    return this.http.put(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.getHeaders() }
    ).pipe(map(e => {
     
      return e;
    }), catchError(this.formatErrors));
  }
  post(path: string, body: Object = {}, param?:any): Observable<any> {
  
    return this.http.post(
      `${this.api_url}${path}`,
      body, { headers: this.getHeaders(),  params: param }
    ).pipe(map(e => {
     
      return e;
    }), catchError(this.formatErrors));
  }
  delete(path:string): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`, 
    ).pipe(map(e => {
      return e;
    }), catchError(this.formatErrors));
  }

}
