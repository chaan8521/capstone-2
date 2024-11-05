import { Component } from '@angular/core';
import { QuetionaireModel } from '../../../models/quetionaire.model';
import { UserModel } from '../../../models/user.model';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { UserService } from '../../../services/user/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailComponent } from '../modals/user-detail/user-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  
  public userList!:UserModel [];
  lazyLoad!: LazyLoadEvent;
  public isComponentShown: boolean = false;
  public loading: boolean = true;
  public header = "User List"


  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
  ) { }



  ngOnInit() {
  
    this.getuserList(this.lazyLoad);
  }



  private async getuserList(event: LazyLoadEvent) {
    this.isComponentShown = false;
    this.lazyLoad = event;
   this.loading = true;
    (await this.userService.getUserList()).subscribe({
      next: async (response: any) => {
        this.isComponentShown = true;
        this.userList = await response.data.map((data: any) => ({
          id: data.id,
          name: data.name,
          email: data.email,
          type: data.type,
          status: data.status,
          department_id: data.department_id,
          department: data.department.department
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
    let userModel: UserModel = {
      id: 0,
      name: "",
      email: "",
      password: "",
      type: "",
      status: "",
      department_id: 1,
    };

    this.dialogRef = this.dialogService.open(UserDetailComponent, {
      header: 'User Details',
      styleClass: 'text-sm text-primary',
      width: '450px',
      contentStyle: { "max-height": "600px", "overflow": "auto", "border-bottom-left-radius": "6px", "border-bottom-right-radius": "6px", "padding-top": " 20px" },
      baseZIndex: 10000,
      dismissableMask: true,
      data: userModel,
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
            detail: 'New User Added Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getuserList(this.lazyLoad);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: 'There is account already',
          life: 1500,
          summary: 'Error'
        });

        this.getuserList(this.lazyLoad);
      }
    });
  }


  public async update(selection: any) {
    this.dialogRef = this.dialogService.open(UserDetailComponent, {
      header: 'User Detail',
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
            detail: 'User Updated Successfully!',
            life: 1500,
            summary: 'Success'
          });

          this.getuserList(this.lazyLoad);
        }
      } else if (response) {
        this.messageService.add({
          severity: 'error',
          detail: '' + response.data,
          life: 1500,
          summary: 'Error'
        });

        this.getuserList(this.lazyLoad);
      }
    });
  }

  delete(quetionaireModel: UserModel) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-trash',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger p-button-text text-xs',
      accept: () => {
        this.userService.deleteUser(quetionaireModel.id).subscribe({
          next: async (response: any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'System Table Deleted Successfully!',
              life: 1500,
              summary: 'Success'

            });

            this.getuserList(this.lazyLoad);
          },
          error: async (error) => {
            this.messageService.add({
              severity: 'error',
              detail: '' + error.message,
              life: 1500,
              summary: 'Error'

            });

            this.getuserList(this.lazyLoad);
          }
        });
      }
    });
  }
}
