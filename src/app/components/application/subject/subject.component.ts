import { Component } from '@angular/core';
import { SubjectModel } from '../../../models/subject.model';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { SubjectService } from '../../../services/subject/subject.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubjectDetailsComponent } from '../modals/subject-details/subject-details/subject-details.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  public subjectList!:SubjectModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "Subject List"

  constructor(
    private subjectService: SubjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
  ) { }
  
  ngOnInit() {
  
    this.getSubjectList(this.lazyLoad);
  }

  private async getSubjectList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
   this.loading = true;
    (await this.subjectService.getSubjectList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.subjectList = await response.data.map((data: any) => ({
          id: data.id,
          subjectCode: data.subjectCode,
          descriptiveTitle: data.descriptiveTitle,
          niut:data.unit,
          room:data.room,
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
    let questionaireModel: SubjectModel = {
      id: 0,
      subjectCode: "",
      descriptiveTitle: "",
      unit: "",
      room: ""
    };

    this.dialogRef = this.dialogService.open(SubjectDetailsComponent, {
      header: 'Subject Detail',
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

          this.getSubjectList(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getSubjectList(this.lazyLoad);
      }
    });
  }

  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(SubjectDetailsComponent, {
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

          this.getSubjectList(this.lazyLoad);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getSubjectList(this.lazyLoad);
      }
    });
  }

  delete(subjectModel: SubjectModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.subjectService.deleteSubject(subjectModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'System Table Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getSubjectList(this.lazyLoad);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getSubjectList(this.lazyLoad);
          }
        });
      }
    });
  }
}
