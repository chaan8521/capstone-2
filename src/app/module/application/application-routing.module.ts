import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { UserComponent } from '../../components/application/user/user.component';
import { QuestionaireComponent } from '../../components/application/questionaire/questionaire.component';
import { DepartmentComponent } from '../../components/application/department/department.component';
import { SubjectComponent } from '../../components/application/subject/subject.component';
import { ScheduleComponent } from '../../components/application/schedule/schedule/schedule.component';
import { AssignedScheduleComponent } from '../../components/application/assigned-schedule/assigned-schedule.component';
import { LoginComponent } from '../../components/security/login/login.component';
import { SystemTableComponent } from '../../components/application/system-table/system-table/system-table.component';
import { EvaluationComponent } from '../../components/application/evaluation/evaluation.component';
import { ResultComponent } from '../../components/application/result/result/result.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'user', component: UserComponent},
      {path: 'questionaire', component: QuestionaireComponent},
      {path: 'department', component: DepartmentComponent},
      {path: 'subject', component: SubjectComponent},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'assigned-schedule', component: AssignedScheduleComponent},
      {path: 'login', component: LoginComponent},
      {path: 'system-table', component: SystemTableComponent},
      {path: 'evaluation', component: EvaluationComponent},
      {path:'result',component: ResultComponent}

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
