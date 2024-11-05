import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SystemTableService } from '../../../../../services/systemTable/system-table.service';
import { SystemTableModel } from '../../../../../models/system-table.model';



@Component({
  selector: 'app-system-table-details',
  templateUrl: './system-table-details.component.html',
  styleUrl: './system-table-details.component.scss'
})
export class SystemTableDetailsComponent {

  public systemTableForm: any = FormGroup;
  private systemTableModel: SystemTableModel = new SystemTableModel();
  public isComponentShown: boolean = false;

  constructor(
    private dialogRef: DynamicDialogRef,
    private systemTableService: SystemTableService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.systemTableForm = this.formBuilder.group({
     id:[data.id],
     category: [data.category, [Validators.required]],
     description: [data.description, [Validators.required]],
    });
  }

  private checkModel(model: string|number|boolean|null|undefined): boolean {
    if(model === '' || model === null || model === 0 || model === true) return true;

    return false;
  }

  public async save() {
    this.systemTableModel = this.systemTableForm.value;
    if(this.systemTableForm.valid) {
      if(this.checkModel(this.systemTableForm.value.id)) {
        (await this.systemTableService.createSystemTable(this.systemTableModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          }
       });
      } else {
        this.systemTableService.updateSystemTable(this.systemTableModel.id, this.systemTableModel).subscribe({
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
