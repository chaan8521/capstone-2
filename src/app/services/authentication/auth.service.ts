import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, tap, throwError } from 'rxjs';
import { LoginModel } from '../../models/login.model';
import { environment } from '../../../environments/environment';

const API_URL = environment.api_url;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json'],
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(data: LoginModel) {
    return this.httpClient.post<LoginModel>(API_URL + '/api/login', data, httpOptions).pipe(
      tap({
        next: async (response: any) => {
          const user = response.data;
          localStorage.setItem('access-token', response.token);
          localStorage.setItem('userType', user.type);
          localStorage.setItem('userName',user.name);
         
        }
      }),
      catchError(this.httpError)
    );
  }
  isLogin(): boolean {
    const token = localStorage.getItem('access-token');
    return token !== null && token !== '';  
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
