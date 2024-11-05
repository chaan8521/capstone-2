import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuetionaireModel } from '../../../../models/quetionaire.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuestionaireService } from '../../../../services/questionaire/questionaire.service';
import { MessageService } from 'primeng/api';
import { SystemTableService } from '../../../../services/systemTable/system-table.service';
import { SystemTableModel } from '../../../../models/system-table.model';

@Component({
  selector: 'app-questionaire-details',
  templateUrl: './questionaire-details.component.html',
  styleUrl: './questionaire-details.component.scss'
})
export class QuestionaireDetailsComponent {
  public questionaireForm: any = FormGroup;
  private questionaireModel: QuetionaireModel = new QuetionaireModel();
  public isComponentShown: boolean = false;
  public systemTables!:SystemTableModel[];
  public status!:any;



  constructor(
    private dialogRef: DynamicDialogRef,
    private questionaireService: QuestionaireService,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private systemTableService: SystemTableService,
  ) { }

  
  ngOnInit(): void {
    this.loadData();
    this.getUserList();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.questionaireForm = this.formBuilder.group({
     id:[data.id],
     description: [data.description, [Validators.required]],
     status: [data.status, [Validators.required]],
    });
  }

  private async getUserList() {
    this.isComponentShown = false;
  
    (await this.systemTableService.getSystemTableByCategoryList('Status')).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.systemTables = await response.data.map((data: any) => ({
          id: data.id,
          name: data.description,
        }));
        this.status = this.systemTables[0].description;
        
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
    this.questionaireModel = this.questionaireForm.value;
    if(this.questionaireForm.valid) {
      if(this.checkModel(this.questionaireForm.value.id)) {
        (await this.questionaireService.createQuestionaire(this.questionaireModel)).subscribe({
          next: async (response:any) => {
            this.dialogRef.close({ data: await response, code: 201, success: true});
          },
          error: async (error:any) => {
            this.dialogRef.close({ data: await error.message, code: error.status, success: false});
            return 
          }
       });
      } else {
        this.questionaireService.updateQuestionaire(this.questionaireModel.id, this.questionaireModel).subscribe({
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
