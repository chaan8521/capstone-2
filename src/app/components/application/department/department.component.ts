import { Component } from '@angular/core';
import { DepartmentService } from '../../../services/department/department.service';
import { DepartmentModel } from '../../../models/department.model';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentDetailComponent } from '../modals/department-detail/department-detail.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  
  public departmentList!:DepartmentModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "Department List"

  constructor(
    private departmentService: DepartmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    
   
  ) { }
  ngOnInit() {
  
    this.getDepartmentList(this.lazyLoad);
  }



  private async getDepartmentList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
   this.loading = true;
    (await this.departmentService.getDepartmentList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.departmentList = await response.data.map((data: any) => ({
          id: data.id,
          department: data.department,
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
    let questionaireModel: DepartmentModel = {
      id: 0,
      department: "",
    };

    this.dialogRef = this.dialogService.open(DepartmentDetailComponent, {
      header: 'Department Detail',
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

          this.getDepartmentList(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getDepartmentList(this.lazyLoad);
      }
    });
  }


  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(DepartmentDetailComponent, {
      header: 'Department Detail',
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

          this.getDepartmentList(this.lazyLoad);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getDepartmentList(this.lazyLoad);
      }
    });
  }

  delete(departmentModel: DepartmentModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.departmentService.deleteDepartment(departmentModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'System Table Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getDepartmentList(this.lazyLoad);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getDepartmentList(this.lazyLoad);
          }
        });
      }
    });
  }
}

