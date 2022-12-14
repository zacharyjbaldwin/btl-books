import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-account-details-modal',
  templateUrl: './edit-account-details-modal.component.html',
  styleUrls: ['./edit-account-details-modal.component.scss']
})
export class EditAccountDetailsModalComponent implements OnInit {

  public editDetailsForm: FormGroup;
  @Output() public affirm = new EventEmitter<{ firstname: String, lastname: String, email: String }>();

  constructor(
    private authService: AuthService,
    private modalRef: BsModalRef
  ) {
    this.editDetailsForm = new FormGroup({
      firstname: new FormControl(this.authService.getFirstName(), [Validators.required]),
      lastname: new FormControl(this.authService.getLastName(), [Validators.required]),
      email: new FormControl(this.authService.getEmail(), [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.affirm.emit({
      firstname: this.editDetailsForm.value.firstname,
      lastname: this.editDetailsForm.value.lastname,
      email: this.editDetailsForm.value.email
    });
    this.modalRef.hide();
  }
}
