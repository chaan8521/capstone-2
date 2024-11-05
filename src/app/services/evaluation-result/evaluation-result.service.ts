import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { EvaluationResultsModel } from '../../models/evaluation-results.model';

const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class EvaluationResultService {

  constructor(private httpClient: HttpClient) { }

  createEvaluationResult(data: Array<EvaluationResultsModel>) {
    return this.httpClient.post<Array<EvaluationResultsModel>>(`${API_URL}/api/evaluation/result`, data,{ headers }).pipe(
      catchError(this.httpError)
    )
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
