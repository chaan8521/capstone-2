import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { LayoutModule } from '../layout/layout.module';

//PrimeNg Modules
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataViewModule } from 'primeng/dataview';
import { ChartModule } from 'primeng/chart';

// Application Components

import { UserComponent } from '../../components/application/user/user.component';
import { QuestionaireComponent } from '../../components/application/questionaire/questionaire.component';
import { QuestionaireDetailsComponent } from '../../components/application/modals/questionaire-details/questionaire-details.component';
import { DepartmentComponent } from '../../components/application/department/department.component';
import { DepartmentDetailComponent } from '../../components/application/modals/department-detail/department-detail.component';
import { SubjectComponent } from '../../components/application/subject/subject.component';
import { SubjectDetailsComponent } from '../../components/application/modals/subject-details/subject-details/subject-details.component';
import { UserDetailComponent } from '../../components/application/modals/user-detail/user-detail.component';
import { AssignedScheduleDetailsComponent } from '../../components/application/modals/assigned-schedule-details/assigned-schedule-details.component';
import { AssignedScheduleComponent } from '../../components/application/assigned-schedule/assigned-schedule.component';
import { ScheduleComponent } from '../../components/application/schedule/schedule/schedule.component';
import { ScheduleDetailComponent } from '../../components/application/modals/schedule-detail/schedule-detail/schedule-detail.component';
import { SystemTableComponent } from '../../components/application/system-table/system-table/system-table.component';
import { SystemTableDetailsComponent } from '../../components/application/modals/system-table-details/table-system-details/system-table-details.component';
import { EvaluationComponent } from '../../components/application/evaluation/evaluation.component';
import { EvaluationDetailsComponent } from '../../components/application/modals/evaluation-details/evaluation-details/evaluation-details.component';
import { ResultComponent } from '../../components/application/result/result/result.component';
import { ChartComponent } from '../../components/application/shared/charts/chart/chart.component';
import { ResultDetailComponent } from '../../components/application/modals/result-detail/result-detail.component';




@NgModule({
  declarations: [
    ApplicationComponent,
    UserComponent,
    QuestionaireComponent,
    QuestionaireDetailsComponent,
    DepartmentComponent,
    DepartmentDetailComponent,
    SubjectComponent,
    SubjectDetailsComponent,
    UserDetailComponent,
    AssignedScheduleComponent,
    AssignedScheduleDetailsComponent,
    ScheduleComponent,
    ScheduleDetailComponent,
    SystemTableComponent,
    SystemTableDetailsComponent,
    EvaluationComponent,
    EvaluationDetailsComponent,
    ResultComponent,
    ChartComponent,
    ResultDetailComponent,

  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    LayoutModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    FloatLabelModule,
    RadioButtonModule,
    DataViewModule,
    ChartModule,
    
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    DynamicDialogRef,
   
  ]
})
export class ApplicationModule { }
