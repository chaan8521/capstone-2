import { Component } from '@angular/core';
import { ResultService } from '../../../../services/result/result.service';
import { EvaluationResultsModel } from '../../../../models/evaluation-results.model';
import {  ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import { DepartmentService } from '../../../../services/department/department.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChartComponent } from '../../shared/charts/chart/chart.component';
import { AssignedScheduleService } from '../../../../services/assignedSchedule/assigned-schedule.service';
import { AssignedScheduleModel } from '../../../../models/assigned-schedule.model';
import { ScheduleService } from '../../../../services/schedule/schedule.service';
import { ScheduleModel } from '../../../../models/schedule.model';
import { ResultDetailComponent } from '../../modals/result-detail/result-detail.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  public assignedScheduleList!:AssignedScheduleModel [];
  
  public scheduleList!:ScheduleModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "Result List";

  constructor (
    private scheduleService:ScheduleService,
    private resultService: ResultService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    
    
  ) {}
  
  ngOnInit(){
    
    // this.getAssignedScehduleList(this.lazyLoad);
    this.getScheduleList(this.lazyLoad);
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const suffix = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (+hours % 12) || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${suffix}`;
}

  private async getScheduleList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
    this.loading = true;
    (await this.scheduleService.getScheduleList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.scheduleList = await response.data.map((data: any) => ({
          id: data.id,
          edpCode: data.edpCode,
          offeringCode: data.offeringCode,
          subject_Id: data.subject_Id,
          subject: data.subject.descriptiveTitle,
          day: data.day,
          timeIn: this.formatTime(data.timeIn),
          timeOut:this.formatTime(data.timeOut),
          user_Id: data.user_Id,
          user:data.user.name
        }));

        this.loading = false;
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }

 
  public async ViewChart(scheduleId:number) {
    this.dialogRef = this.dialogService.open(ChartComponent, {
      header: 'Department Detail',
      styleClass: 'text-sm text-primary',
      width: '1000px',
      contentStyle: { "max-height": "450px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: scheduleId,
      style: {
        'align-self': 'flex-start',
        'margin-top': '75px'
      }
    });

    this.dialogRef.onClose.subscribe((response: any) => {
      if (response.success) {
        if (response.code === 201) {
          this.messageService.add({
            severity: 'success',
            detail: 'New System Table Added Successfully!',
            life: 1500,
            summary: 'Success'
          });

          // this.getResult(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        // this.getResult(this.lazyLoad);
      }
    });
  }

  public async ViewResultTable(scheduleId:number) {
    this.dialogRef = this.dialogService.open(ResultDetailComponent, {
      header: 'Result table Detail',
      styleClass: 'text-sm text-primary',
      width: '1000px',
      contentStyle: { "max-height": "950px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: scheduleId,
      style: {
        'align-self': 'flex-start',
        'margin-top': '75px'
      }
    });

    this.dialogRef.onClose.subscribe((response: any) => {
      if (response.success) {
        if (response.code === 201) {
          this.messageService.add({
            severity: 'success',
            detail: 'New System Table Added Successfully!',
            life: 1500,
            summary: 'Success'
          });

          // this.getResult(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        // this.getResult(this.lazyLoad);
      }
    });
  }

}
