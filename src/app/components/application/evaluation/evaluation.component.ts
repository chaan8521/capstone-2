import { Component } from '@angular/core';
import { QuestionaireService } from '../../../services/questionaire/questionaire.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { EvaluationResultsModel } from '../../../models/evaluation-results.model';
import { EvaluationResultService } from '../../../services/evaluation-result/evaluation-result.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EvaluationDetailsComponent } from '../modals/evaluation-details/evaluation-details/evaluation-details.component';
import { AssignedScheduleService } from '../../../services/assignedSchedule/assigned-schedule.service';
import { UserModel } from '../../../models/user.model';
import { ScheduleModel } from '../../../models/schedule.model';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { AssignedScheduleModel } from '../../../models/assigned-schedule.model';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss'
})
export class EvaluationComponent {
  public header = "Evaluation";
  public questionaireList!:any [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public userId: number = 0;
  public users!:UserModel[];
  public scheduleList!:ScheduleModel[];
  public assignedScheduleList!:any[]
  public evaluatedItems: { [key: number]: boolean } = {};

  eval_result: Array<EvaluationResultsModel> = [];

  Ratings: any[] = [
    { name: 'Poor', rate: '1' },
    { name: 'Average', rate: '2' },
    { name: 'Good', rate: '3' },
    { name: 'Very good', rate: '4' }
];

  constructor(
    private assignedScheduleService:AssignedScheduleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,

  ) { }

  ngOnInit() {
  
    this.getAssignedScheduleByUserIdList(this.lazyLoad);
  }

 
  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const suffix = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (+hours % 12) || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${suffix}`;
}
  private async getAssignedScheduleByUserIdList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
    this.loading = true;
    (await this.assignedScheduleService.getAssignedScheduleByUserIdList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.assignedScheduleList= await response.data.map((data: any) => ({
          id: data.id,
          edpCode: data.schedule.edpCode,
          offeringCode: data.schedule.offeringCode,
          subject_Id: data.schedule.subject_Id,
         
        }));

        this.loading = false;
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }

  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(EvaluationDetailsComponent, {
      header: 'Evaluate Detail',
      styleClass: 'text-sm text-primary',
      width: '600px',
      contentStyle: { "max-height": "750px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: selection,
      style: {
        'align-self': 'flex-start',
        'margin-top': '75px'
      }
    });

    this.dialogRef.onClose.subscribe(async(response: any) => {
      if (response && response.success) {
        this.evaluatedItems[selection.id] = true;
        await this.getAssignedScheduleByUserIdList(this.lazyLoad);
        if (response.code === 201) {
          this.messageService.add({
            severity: 'success',
            detail: 'Evaluated Successfully!',
            life: 1500,
            summary: 'Success'
          });
          

          
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getAssignedScheduleByUserIdList(this.lazyLoad);
      }
    });
  }

  
}
