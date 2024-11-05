import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AssignedScheduleModel } from '../../../../../models/assigned-schedule.model';
import { QuestionaireService } from '../../../../../services/questionaire/questionaire.service';
import { EvaluationResultService } from '../../../../../services/evaluation-result/evaluation-result.service';
import { AssignedScheduleService } from '../../../../../services/assignedSchedule/assigned-schedule.service';
import { EvaluationResultsModel } from '../../../../../models/evaluation-results.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrl: './evaluation-details.component.scss'
})
export class EvaluationDetailsComponent {

  public questionaireList!:any [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public assignedScheduleId = 0;

  eval_result: Array<EvaluationResultsModel> = [];

  Ratings: any[] = [
    { name: 'Poor', rate: '1' },
    { name: 'Average', rate: '2' },
    { name: 'Good', rate: '3' },
    { name: 'Very good', rate: '4' }
];


  constructor(
    private questionaireService: QuestionaireService,
    private evaluationResultService: EvaluationResultService,
    private assignedScheduleService:AssignedScheduleService,
    private questionaire: QuestionaireService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,

  ) { }
  
  ngOnInit(): void {
    this.getQuestionaireList(this.lazyLoad);
    this.loadData();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.assignedScheduleId = data.id
    
  }

  private async getQuestionaireList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
   this.loading = true;
    (await this.questionaireService.getQuestionaireList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.questionaireList = await response.data.map((data: any) => ({
          id: data.id,
          description: data.description,
          status: data.status,
          selectedRating: null
        }));
        
        this.loading = false;
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }

  public async submitEvaluation() {
    this.questionaireList.forEach(async question => {
      if (question.selectedRating) {
        const result: EvaluationResultsModel = {
          id: 0, 
          question_Id: question.id,
          assigned_schedule_Id: this.assignedScheduleId, 
          score: question.selectedRating
        };
        this.eval_result.push(result);
      }
    });
    (await this.evaluationResultService.createEvaluationResult(this.eval_result)).subscribe({
      next: async (response:any) => {
        this.dialogRef.close({ data: await response, code: 201, success: true});
      },
      error: async (error:any) => {
        return 
      }
   });
  }


}


