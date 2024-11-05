import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/user.model';
import { catchError, Observable, throwError } from 'rxjs';



const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})


const API_URL = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  
  public async createUser(userModel: UserModel) {
    return this.httpClient.post<UserModel>(`${API_URL}/api/user`, userModel,{ headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getUserList(): Promise<Observable<UserModel>> {
    const url = `${API_URL}/api/user/`;
    return this.httpClient.get<UserModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public getTeacherList(): Observable<UserModel> {
    const url = `${API_URL}/api/user/teachers`;
    return this.httpClient.get<UserModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }
  public getStudentList(): Observable<UserModel> {
    const url = `${API_URL}/api/user/students`;
    return this.httpClient.get<UserModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public updateUser(id: number, userModel: UserModel) {
    return this.httpClient.put<UserModel>(`${API_URL}/api/user/${id}`, userModel, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteUser(id: number) {
    return this.httpClient.delete<UserModel>(`${API_URL}/api/user/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
