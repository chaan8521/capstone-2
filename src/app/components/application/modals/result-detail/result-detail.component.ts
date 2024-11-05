import { Component } from '@angular/core';
import { EvaluationResultsModel } from '../../../../models/evaluation-results.model';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ResultService } from '../../../../services/result/result.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrl: './result-detail.component.scss'
})
export class ResultDetailComponent {
  public evaluationResult!:EvaluationResultsModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  scheduleId:number = 0;

  constructor (
   
    private resultService: ResultService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    
  ) {}

  ngOnInit(): void {
  this.loadData();
  
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.scheduleId = data;
  this.getResult(this.scheduleId);

  }


  private async getResult(scheduleId:number) {
    (await this.resultService.getResult(scheduleId)).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.evaluationResult = await response.data.map((data: any) => ({
          id: data.id,
          question_description: data.question_description,
          subject_title: data.subject_title,
          score: data.score,
        }));
       
      },
      error: (error: any) => {
        return;
      }
    });
  }

}
