import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../../../../services/schedule/schedule.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ScheduleModel } from '../../../../../models/schedule.model';
import { SubjectService } from '../../../../../services/subject/subject.service';
import { SubjectModel } from '../../../../../models/subject.model';
import { UserService } from '../../../../../services/user/user.service';
import { UserModel } from '../../../../../models/user.model';
import { SystemTableService } from '../../../../../services/systemTable/system-table.service';
import { SystemTableModel } from '../../../../../models/system-table.model';
@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrl: './schedule-detail.component.scss'
})
export class ScheduleDetailComponent {
  
  public scheduleForm: any = FormGroup;
  private scheduleModel: ScheduleModel = new ScheduleModel();
  public isComponentShown: boolean = false;
  public subjectId: number = 0;
  public subjects!:SubjectModel[];
  public userId: number = 0;
  public users!:UserModel[];
  public teacherId: number = 0;
  public systemTables!:SystemTableModel[];
  public day!:any;


  constructor(
    private systemTableService:SystemTableService,
    private dialogRef: DynamicDialogRef,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService,
    private userService:UserService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.getSubjectList();
     this.getTeacherList();
     this.getDayList();
   
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.scheduleForm = this.formBuilder.group({
     id:[data.id],
     edpCode: [data.edpCode, [Validators.required]],
     offeringCode: [data.offeringCode, [Validators.required]],
     subject_Id: [null, [Validators.required]],
     day: [data.day, [Validators.required]],
     timeIn: [data.timeIn, [Validators.required]],
     timeOut: [data.timeOut, [Validators.required]],
     user_Id: [null, [Validators.required]],
    });
  }

  private async getTeacherList() {
    this.isComponentShown = false;
  
    (await this.userService.getTeacherList()).subscribe({
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

  private async getSubjectList() {
    this.isComponentShown = false;
  
    (await this.subjectService.getSubjectList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.subjects = await response.data.map((data: any) => ({
          id: data.id,
          subject:data.subjectCode,
         
        }));
        this.subjectId = this.subjects[0].id as number;
        
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }
  private async getDayList() {
    this.isComponentShown = false;
  
    (await this.systemTableService.getSystemTableByCategoryList('Day')).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.systemTables = await response.data.map((data: any) => ({
          id: data.id,
          day: data.description,
        }));
        this.day = this.systemTables[0].description;
        
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
    this.scheduleModel = this.scheduleForm.value;
    if(this.scheduleForm.valid) {
      if(this.checkModel(this.scheduleForm.value.id)) {
        (await this.scheduleService.createSchedule(this.scheduleModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          }
       });
      } else {
        this.scheduleService.updateSchedule(this.scheduleModel.id, this.scheduleModel).subscribe({
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


