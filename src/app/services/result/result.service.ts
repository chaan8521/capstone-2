import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { EvaluationResultsModel } from '../../models/evaluation-results.model';


const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})
const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient:HttpClient) { }

  public async  getResult(id:number): Promise<Observable<EvaluationResultsModel>> {
    const url = `${API_URL}/api/evaluation/result/table/${id}`;
    return this.httpClient.get<EvaluationResultsModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  
  public async getResultByTeacherId(teacherId:number): Promise<Observable<EvaluationResultsModel>> {
    const url = `${API_URL}/api/evaluation/result/${teacherId}`;
    return this.httpClient.get<EvaluationResultsModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
