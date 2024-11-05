import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentModel } from '../../../../models/department.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentService } from '../../../../services/department/department.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.scss'
})
export class DepartmentDetailComponent {
public departmentForm: any = FormGroup;
  private DepartmentModel: DepartmentModel = new DepartmentModel();
  public isComponentShown: boolean = false;

  constructor(
    private dialogRef: DynamicDialogRef,
    private departmentService: DepartmentService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.departmentForm = this.formBuilder.group({
     id:[data.id],
     department: [data.department, [Validators.required]],
    
    });
  }

  private checkModel(model: string|number|boolean|null|undefined): boolean {
    if(model === '' || model === null || model === 0 || model === true) return true;

    return false;
  }

  public async save() {
    this.DepartmentModel = this.departmentForm.value;
    if(this.departmentForm.valid) {
      if(this.checkModel(this.departmentForm.value.id)) {
        (await this.departmentService.createDepartment(this.DepartmentModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          }
       });
      } else {
        this.departmentService.updateDepartment(this.DepartmentModel.id, this.DepartmentModel).subscribe({
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
