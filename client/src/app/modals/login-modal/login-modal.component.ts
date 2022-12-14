import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginError } from 'src/app/shared/login-error.enum';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  @Output() public loggedIn = new EventEmitter();

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  public subs = new Subscription();

  constructor(
    private authService: AuthService,
    private modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.subs.add(this.authService.getAuthenticationStatusListener().subscribe((loggedIn) => {
      if (loggedIn) {
        this.loggedIn.emit();
        this.modalRef.hide();
      }
    }));

    this.subs.add(this.authService.loginError.subscribe((loginError) => {
      switch (loginError) {
        case LoginError.EmailDoesNotExist:
        case LoginError.IncorrectPassword:
        default:
          this.toastr.error('Login failed!');
          break;
      }
    }));
  }

  onLogin() {
    this.modalRef.hide();
  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  hideModal() {
    this.modalRef.hide();
  }

}
