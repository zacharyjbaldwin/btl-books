import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginError } from '../shared/login-error.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public loginForm: FormGroup;
  public subs = new Subscription();
  public errorMessage: string = '';
  public redirectTo: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    this.subs.add(this.route.queryParams.subscribe((params) => {
      if (params['redirectTo']) {
        this.redirectTo = params['redirectTo'];
      }
    }));
  }

  ngOnInit(): void {



    this.subs.add(this.authService.loginError.subscribe((error: LoginError) => {
      this.loading = false;

      switch(error) {
        case LoginError.EmailDoesNotExist:
          this.errorMessage = 'That email does not exist.'
          break;
        case LoginError.IncorrectPassword:
          this.errorMessage = 'Incorrect email or password.'
          break;
        case LoginError.GenericLoginError:
          this.errorMessage = 'Authentication failed.';
          break;
      }
    }));
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.redirectTo);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
