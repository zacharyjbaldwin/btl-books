import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AddAddressModalComponent } from 'src/app/modals/add-address-modal/add-address-modal.component';
import { Address } from 'src/app/models/address.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  private addAddressModal?: BsModalRef;
  public loading: boolean = true;
  private userId: string;
  public addresses: Address[] = [];
  public count: number = 0;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.fetchAddresses();
  }

  openAddAddressModal() {
    this.addAddressModal = this.modalService.show(AddAddressModalComponent, { class: 'modal-md' });
    (this.addAddressModal.content as AddAddressModalComponent).affirm.subscribe((res: Address) => {
      const address: Address = {
        sendTo: res.sendTo,
        addrLine1: res.addrLine1,
        addrLine2: (res.addrLine2 ? res.addrLine2 : undefined),
        city: res.city,
        state: res.state,
        zip: res.zip
      };

      this.addAddress(address);
    });
  }

  private fetchAddresses() {
    this.loading = true;

    this.userService.getAddressesById(this.userId).subscribe((addresses: Address[]) => {
      this.addresses = addresses;
      this.count = this.addresses.length;
      this.loading = false;
    });
  }

  deleteAddress(addressId: String) {
    this.userService.deleteAddressById(addressId).subscribe((result) => {
      this.toastr.success('Deleted address.');
      this.fetchAddresses();
    });
  }

  addAddress(address: Address) {
    this.userService.addAddress(address).subscribe((res) => {
      this.toastr.success('Added address.');
      this.fetchAddresses();
    });
  }

}
