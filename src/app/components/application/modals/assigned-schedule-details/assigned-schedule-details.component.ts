import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignedScheduleModel } from '../../../../models/assigned-schedule.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AssignedScheduleService } from '../../../../services/assignedSchedule/assigned-schedule.service';
import { UserService } from '../../../../services/user/user.service';
import { UserModel } from '../../../../models/user.model';
import { ScheduleService } from '../../../../services/schedule/schedule.service';

@Component({
  selector: 'app-assigned-schedule-details',
  templateUrl: './assigned-schedule-details.component.html',
  styleUrl: './assigned-schedule-details.component.scss'
})
export class AssignedScheduleDetailsComponent {

  public assignedScheduleForm: any = FormGroup;
  private assignedScheduleModel: AssignedScheduleModel = new AssignedScheduleModel();
  public isComponentShown: boolean = false;
  public userId: number = 0;
  public users!:UserModel[];
  public scheduleId: number = 0;
  public schedules!:UserModel[];

  constructor(
    private dialogRef: DynamicDialogRef,
    private assignedScheduleService: AssignedScheduleService,
    private userService:UserService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private scheduleService: ScheduleService,
  ) { }
  
  ngOnInit(): void {
    this.loadData();
    this.getUserList();
    this.getStudentList();
    this.getScheduleList();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.assignedScheduleForm = this.formBuilder.group({
     id:[data.id],
     user_Id: [data.user_Id, [Validators.required]],
     schedule_Id: [data.schedule_Id, [Validators.required]],
    });
  }

  private async getUserList() {
    this.isComponentShown = false;
  
    (await this.userService.getUserList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.users = await response.data.map((data: any) => ({
          id: data.id,
          name: data.name,
         
        }));
        this.userId = this.users[0].id as number;
        
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }
  private async getStudentList() {
    this.isComponentShown = false;
  
    (await this.userService.getStudentList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.users = await response.data.map((data: any) => ({
          id: data.id,  
          name: data.name,
        }));
        this.userId = this.users[0].id as number;
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }

  private async getScheduleList() {
    this.isComponentShown = false;
  
    (await this.scheduleService.getScheduleList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.schedules = await response.data.map((data: any) => ({
          id: data.id,
          edpCode: data.edpCode,
         
        }));
        this.scheduleId = this.schedules[0].id as number;
        
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }

  private checkModel(model: string|number|boolean|null|undefined): boolean {
    if(model === '' || model === null || model === 0 || model === true) return true;

    return false;
  }

  public async save() {
    this.assignedScheduleModel = this.assignedScheduleForm.value;
    if(this.assignedScheduleForm.valid) {
      if(this.checkModel(this.assignedScheduleForm.value.id)) {
        (await this.assignedScheduleService.createAssignedSchedule(this.assignedScheduleModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          }
       });
      } else {
        this.assignedScheduleService.updateAssignedSchedule(this.assignedScheduleModel.id, this.assignedScheduleModel).subscribe({
          next: async (response: any) => {
            this.dialogRef.close({ data: await response, code: 200, success: true});
          },
          error: async (error) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return
          }
        });
      }
    }
  }
}
