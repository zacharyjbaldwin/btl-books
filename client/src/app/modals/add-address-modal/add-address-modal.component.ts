import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss']
})
export class AddAddressModalComponent implements OnInit {

  public addressForm: FormGroup;
  @Output() public affirm = new EventEmitter<Address>();

  constructor(public modalRef: BsModalRef) {
    this.addressForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      addrLine1: new FormControl(null, [Validators.required]),
      addrLine2: new FormControl(null),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      zip: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  add() {
    const address: Address = {
      sendTo: `${this.addressForm.value.firstname} ${this.addressForm.value.lastname}`,
      addrLine1: this.addressForm.value.addrLine1,
      addrLine2: (this.addressForm.value.addrLine2 ? this.addressForm.value.addrLine2 : undefined),
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      zip: this.addressForm.value.zip
    };
    this.affirm.emit(address);
    this.modalRef.hide();
  }

}
