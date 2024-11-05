import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.isLogin()) {
      this.router.navigate(['/application']);  
      return false;
    }
    return true;  
  }

}

// export const loginGuard: CanActivateFn = (route, state) => {
//   return true;
// };
