import { Component } from '@angular/core';
import { AssignedScheduleModel } from '../../../models/assigned-schedule.model';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AssignedScheduleService } from '../../../services/assignedSchedule/assigned-schedule.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignedScheduleDetailsComponent } from '../modals/assigned-schedule-details/assigned-schedule-details.component';


@Component({
  selector: 'app-assigned-schedule',
  templateUrl: './assigned-schedule.component.html',
  styleUrl: './assigned-schedule.component.scss'
})
export class AssignedScheduleComponent {

  public assignedScheduleList!:AssignedScheduleModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "Assigned Schedule List";



  constructor(
    private assignedScheduleService: AssignedScheduleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
   
  ) { }

  ngOnInit() {
  
    this.getAssignedScehduleList(this.lazyLoad);
  }

  

  private async getAssignedScehduleList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
   this.loading = true;
    (await this.assignedScheduleService.getAssignedScheduleList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.assignedScheduleList = await response.data.map((data: any) => ({
          id: data.id,
          user_Id: data.user_Id,
          user: data.user.name,
          schedule_Id: data.schedule_Id,
          schedule:data.schedule.edpCode
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
    let questionaireModel: AssignedScheduleModel = {
      id: 0,
      user_Id: 0,
      schedule_Id:0
    };

    this.dialogRef = this.dialogService.open(AssignedScheduleDetailsComponent, {
      header: 'Assigned Schedule Detail',
      styleClass: 'text-sm text-primary',
      width: '450px',
      contentStyle: { "max-height": "600px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: questionaireModel,
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
            detail: 'New Assigned Schedule Added Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getAssignedScehduleList(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getAssignedScehduleList(this.lazyLoad);
      }
    });
  }


  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(AssignedScheduleDetailsComponent, {
      header: 'Assigned Schedule Detail',
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
            detail: 'Assigned Schedule Updated Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getAssignedScehduleList(this.lazyLoad);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getAssignedScehduleList(this.lazyLoad);
      }
    });
  }

  
  delete(assignedScheduleModel: AssignedScheduleModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.assignedScheduleService.deleteAssignedSchedule(assignedScheduleModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'Assigned Schedule Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getAssignedScehduleList(this.lazyLoad);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getAssignedScehduleList(this.lazyLoad);
          }
        });
      }
    });
  }

}
