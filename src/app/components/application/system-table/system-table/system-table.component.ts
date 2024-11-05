import { Component } from '@angular/core';


import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SystemTableModel } from '../../../../models/system-table.model';
import { SystemTableService } from '../../../../services/systemTable/system-table.service';
import { SystemTableDetailsComponent } from '../../modals/system-table-details/table-system-details/system-table-details.component';


@Component({
  selector: 'app-system-table',
  templateUrl: './system-table.component.html',
  styleUrl: './system-table.component.scss'
})
export class SystemTableComponent {

  public systemTableList!:SystemTableModel [];
  public getCategoryList!: SystemTableModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "System Table List";
  public selectedCategory: any | null = null;

  constructor(
    private systemTableService: SystemTableService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit() {
    this.getSystemTableList();
  }

  
  public async onCategoryChange(selected: SystemTableModel) {
    const category = selected?.category; 
    if (category) {
        this.selectedCategory = category;
        this.getSystemTableByCategoryList(category); 
    } else {
        console.error('No valid category selected');
    }
}


  private async getSystemTableList() {
    this.isComponentShown = false;
   this.loading = true;
    (await this.systemTableService.getSystemTableList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.getCategoryList = await response.data.map((data: any) => ({
          id: data.id,
          category: data.category,
          description: data.description,
        }));
        
        this.loading = false;
      },
      error: (error: any) => {
        this.isComponentShown = true;
        console.error('Error fetching data:', error);
        return;
      }
    });
  }

  private getSystemTableByCategoryList(category: string) {
    this.systemTableService.getSystemTableByCategoryList(category).subscribe({
        next: (response: any) => {
            this.isComponentShown = true;
            this.systemTableList = response.data.map((data: any) => ({
                id: data.id,
                category: data.category,
                description: data.description,
            }))
        },
        error: (error: any) => {
            this.isComponentShown = true;
            console.error('Error fetching category data:', error);
            this.loading = false;
        }
    });
}

  public async create() {
    let systemTableModel: SystemTableModel = {
      id: 0,
      category: "",
      description: "",
    };

    this.dialogRef = this.dialogService.open(SystemTableDetailsComponent, {
      header: 'Table System Detail',
      styleClass: 'text-sm text-primary',
      width: '450px',
      contentStyle: { "max-height": "600px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: systemTableModel,
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
            detail: 'New Table System Added Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getSystemTableByCategoryList(this.selectedCategory!);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getSystemTableByCategoryList(this.selectedCategory!);
      }
    });
  }

  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(SystemTableDetailsComponent, {
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

          this.getSystemTableByCategoryList(this.selectedCategory!);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getSystemTableByCategoryList(this.selectedCategory!);
      }
    });
  }

  delete(systemTableModel: SystemTableModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.systemTableService.deleteSystemTable(systemTableModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'System Table Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getSystemTableByCategoryList(this.selectedCategory!);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getSystemTableByCategoryList(this.selectedCategory!);
          }
        });
      }
    });
  }

}
