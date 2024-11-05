import { Component } from '@angular/core';
import { QuestionaireService } from '../../../services/questionaire/questionaire.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { QuetionaireModel } from '../../../models/quetionaire.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuestionaireDetailsComponent } from '../modals/questionaire-details/questionaire-details.component';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrl: './questionaire.component.scss'
})
export class QuestionaireComponent {

  public questionaireList!:QuetionaireModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "Questionaire List";



  constructor(
    private questionaireService: QuestionaireService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,

  ) { }



  ngOnInit() {
  
    this.getQuestionaireList(this.lazyLoad);

  }



  private async getQuestionaireList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
   this.loading = true;
    (await this.questionaireService.getQuestionaireList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.questionaireList = await response.data.map((data: any) => ({
          id: data.id,
          description: data.description,
          status: data.status,
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
    let questionaireModel: QuetionaireModel = {
      id: 0,
      description: "",
      status: ""
    };

    this.dialogRef = this.dialogService.open(QuestionaireDetailsComponent, {
      header: 'Questionaire Detail',
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
            detail: 'New System Table Added Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getQuestionaireList(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getQuestionaireList(this.lazyLoad);
      }
    });
  }


  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(QuestionaireDetailsComponent, {
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

          this.getQuestionaireList(this.lazyLoad);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getQuestionaireList(this.lazyLoad);
      }
    });
  }

  delete(quetionaireModel: QuetionaireModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.questionaireService.deleteQuestionaire(quetionaireModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'System Table Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getQuestionaireList(this.lazyLoad);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getQuestionaireList(this.lazyLoad);
          }
        });
      }
    });
  }
}
