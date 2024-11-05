import { Component } from '@angular/core';
import { SubjectModel } from '../../../../../models/subject.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubjectService } from '../../../../../services/subject/subject.service';
import { MessageService } from 'primeng/api';
import { SystemTableService } from '../../../../../services/systemTable/system-table.service';
import { SystemTableModel } from '../../../../../models/system-table.model';


@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.scss'
})
export class SubjectDetailsComponent {
  public subjectForm: any = FormGroup;
  private subjectModel: SubjectModel = new SubjectModel();
  public isComponentShown: boolean = false;
  public systemTables!:SystemTableModel[];
  public unit!:any;
  


  constructor(
    private systemTableService:SystemTableService,
    private dialogRef: DynamicDialogRef,
    private subjectService: SubjectService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.getUnitList();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.subjectForm = this.formBuilder.group({
     id:[data.id],
     subjectCode: [data.subjectCode, [Validators.required]],
     descriptiveTitle: [data.descriptiveTitle, [Validators.required]],
     unit: [data.unit, [Validators.required]],
     room: [data.room, [Validators.required]],
    });
  }

  private async getUnitList() {
    this.isComponentShown = false;
  
    (await this.systemTableService.getSystemTableByCategoryList('Unit')).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.systemTables = await response.data.map((data: any) => ({
          id: data.id,
          unit: data.description,
        }));
        this.unit = this.systemTables[0].description;
        
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
    this.subjectModel = this.subjectForm.value;
    if(this.subjectForm.valid) {
      if(this.checkModel(this.subjectForm.value.id)) {
        (await this.subjectService.createSubject(this.subjectModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          }
       });
      } else {
        this.subjectService.updateSubject(this.subjectModel.id, this.subjectModel).subscribe({
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
