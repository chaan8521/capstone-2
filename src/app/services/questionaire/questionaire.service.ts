import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { QuetionaireModel } from '../../models/quetionaire.model';
import { environment } from '../../../environments/environment';



  const headers = new HttpHeaders({
    'Content-Type': ['application/json'],
    Authorization: 'Bearer ' + localStorage.getItem('access-token')
  })


const API_URL = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

  constructor(private httpClient: HttpClient) { }


  
  public async createQuestionaire(systemTableRequest: QuetionaireModel) {
    return this.httpClient.post<QuetionaireModel>(`${API_URL}/api/question`, systemTableRequest,{ headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getQuestionaireList(): Promise<Observable<QuetionaireModel>> {
    const url = `${API_URL}/api/question`;
    return this.httpClient.get<QuetionaireModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public updateQuestionaire(id: number, systemTableRequest: QuetionaireModel) {
    return this.httpClient.put<QuetionaireModel>(`${API_URL}/api/question/${id}`, systemTableRequest, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteQuestionaire(id: number) {
    return this.httpClient.delete<QuetionaireModel>(`${API_URL}/api/question/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
