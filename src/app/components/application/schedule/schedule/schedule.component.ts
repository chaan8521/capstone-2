import { Component } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule/schedule.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleModel } from '../../../../models/schedule.model';
import { ScheduleDetailComponent } from '../../modals/schedule-detail/schedule-detail/schedule-detail.component';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  public scheduleList!: ScheduleModel[];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "Schedule List";

  constructor(
    private scheduleService: ScheduleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit() {

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
          subject: data.subject.subjectCode,
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

  public async create() {
    let scheduleModel: ScheduleModel = {
      id: 0,
      edpCode: "",
      offeringCode: "",
      subject_Id: 0,
      day: "",
      timeIn: "06:00 am",
      timeOut: "06:00 am",
      user_Id: 0,
    };

    this.dialogRef = this.dialogService.open(ScheduleDetailComponent, {
      header: 'Schedule Detail',
      styleClass: 'text-sm text-primary',
      width: '450px',
      contentStyle: { "max-height": "600px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: scheduleModel,
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

          this.getScheduleList(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getScheduleList(this.lazyLoad);
      }
    });
  }

  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(ScheduleDetailComponent, {
      header: 'System Table Detail',
      styleClass: 'text-sm text-primary',
      width: '450px',
      contentStyle: { "max-height": "600px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: selection,
      style: {
        'align-self': 'flex-start',
        'margin-top': '75px'
      }
    });

    this.dialogRef.onClose.subscribe((response: any) => {
      if (response && response.success) {
        if (response.code === 200) {
          this.messageService.add({
            severity: 'success',
            detail: 'System Table Updated Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getScheduleList(this.lazyLoad);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getScheduleList(this.lazyLoad);
      }
    });
  }

  delete(scheduleModel: ScheduleModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.scheduleService.deleteSchedule(scheduleModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'System Table Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getScheduleList(this.lazyLoad);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getScheduleList(this.lazyLoad);
          }
        });
      }
    });
  }


}
