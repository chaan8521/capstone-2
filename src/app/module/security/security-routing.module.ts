import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { LoginComponent } from '../../components/security/login/login.component';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
  
    children: [
      {path: '', redirectTo: 'login',  pathMatch: 'full'},
      {path: 'login',canActivate: [LoginGuard],  component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
