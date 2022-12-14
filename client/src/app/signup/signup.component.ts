import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SignupError } from '../shared/signup-error.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  private subs = new Subscription();
  public errorMessage: string = '';

  constructor(private authService: AuthService) {
    this.subs.add(this.authService.signupError.subscribe((error: SignupError) => {
      switch (error) {
        case SignupError.EmailAlreadyInUse:
          this.errorMessage = 'That email is already in use.';
          break;
        default:
          this.errorMessage = 'There was an error during signup.';
          break;
      }
    }));
  }

  ngOnInit(): void {
  }

  submit() {
    const form = this.signupForm.value;
    this.authService.signUp(form.email, form.firstname, form.lastname, form.password);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
