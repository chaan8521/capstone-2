import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class applicationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (!this.authService.isLogin()) {
      this.router.navigate(['/security/login']);  
      return false;
    }
    return true;  
  }

}

