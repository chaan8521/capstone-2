import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/layout/topbar/topbar.component';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,

  
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    LayoutRoutingModule,
    ConfirmDialogModule,
    ToastModule
  
  ],
  providers:[
    ConfirmationService
  ]
})
export class LayoutModule { }
