import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { applicationGuard } from './guards/application.guard';

const routes: Routes = [ 
  { path: '', redirectTo: 'application', pathMatch: 'full' },
  {
    path: 'security',
    loadChildren: () =>
      import('./module/security/security.module').then(
        (m) => m.SecurityModule
      ),
  },
  {
    path: 'application',
    canActivate: [applicationGuard], 
    loadChildren: () =>
      import('./module/application/application.module').then(
        (m) => m.ApplicationModule
      ),
    
   
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
