import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../../models/user.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { DepartmentModel } from '../../../../models/department.model';
import { DepartmentService } from '../../../../services/department/department.service'
import { SystemTableModel } from '../../../../models/system-table.model';
import { SystemTableService } from '../../../../services/systemTable/system-table.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  public userForm: any = FormGroup;
  private userModel: UserModel = new UserModel();
  public isComponentShown: boolean = false;
  public systemTables!:SystemTableModel[];
  public status!:any;
  public departmentId: number = 0;
  public departments!:DepartmentModel[];

  public typeOptions: any[] = [
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
  ];

  constructor(
    private dialogRef: DynamicDialogRef,
    private userService: UserService,
    private departmentService: DepartmentService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private systemTableService: SystemTableService,
  ) { }


 ngOnInit(): void {
    this.loadData();
    this.getUserList();
    this.getDepartmentList();
    // this.userForm.get('name')?.ValueChanges.subscribe((value:String)=>{
    //   this.userForm.patchValue({password:value});
    // })
   
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.userForm = this.formBuilder.group({
     id:[data.id],
     name: [data.name, [Validators.required]],
     email: [data.email, [Validators.required]],
     department_id: [data.department_id,[Validators.required]],
     type: [data.type, [Validators.required]],
     status: [data.status, [Validators.required]],
     password:[''],
    });
    
  }

  private async getUserList() {
    this.isComponentShown = false;
  
    (await this.systemTableService.getSystemTableByCategoryList('Status')).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.systemTables = await response.data.map((data: any) => ({
          id: data.id,
          status: data.description,
        }));
        this.status = this.systemTables[0].description;
        
      },
      error: (error: any) => {
        this.isComponentShown = true;
        return;
      }
    });
  }

  private async getDepartmentList() {
    this.isComponentShown = false;
  
    (await this.departmentService.getDepartmentList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.departments = await response.data.map((data: any) => ({
          id: data.id,
          department: data.department,
         
        }));
        this.departmentId = this.departments[0].id as number;
        
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
    this.userModel = this.userForm.value;
    this.userModel.password = this.userModel.name || "";
    if(this.userForm.valid) {
      if(this.checkModel(this.userForm.value.id)) {
        (await this.userService.createUser(this.userModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          } 
       });
      } else {
        this.userService.updateUser(this.userModel.id, this.userModel).subscribe({
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
