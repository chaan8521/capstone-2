import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { LoginModel } from '../../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password!: string;
  loginModel: LoginModel = new LoginModel();
  loginForm: any = FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginFormValidation();
  }

  loginFormValidation() {
    this.loginForm = this.formBuilder.group({
      email: [null , [Validators.required]],
      password: [null , [Validators.required]]
    })
  }

  login() {
    if(this.loginForm.valid) {

      this.loginModel = this.loginForm.value;

      this.authService.login(this.loginModel).subscribe({
        next:async (response) => {
         
         
          setTimeout(() => {
            if(this.authService.isLogin()) {
              location.replace('/application');
            }
          }, 1000);
        },
        error: (error) => {
          this.loginForm.controls.password.reset();
          return
        }
      })
    }
  }

}
