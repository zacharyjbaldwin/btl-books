import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditAccountDetailsModalComponent } from 'src/app/modals/edit-account-details-modal/edit-account-details-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  private editAccountDetailsModal?: BsModalRef;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private userService: UserService
  ) {
    this.firstname = authService.getFirstName().toUpperCase();
    this.lastname = authService.getLastName().toUpperCase();
    this.email = authService.getEmail().toUpperCase();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  openEditAccountDetailsModal() {
    this.editAccountDetailsModal = this.modalService.show(EditAccountDetailsModalComponent, { class: 'modal-md' });
    (this.editAccountDetailsModal.content as EditAccountDetailsModalComponent).affirm.subscribe((results) => {
      this.changeDetails(results.firstname, results.lastname, results.email);
    });
  }

  changeDetails(firstname: String, lastname: String, email: String) {
    this.userService.editDetails(firstname, lastname, email).subscribe((results) => {
      this.authService.logout();
    })
  }

}
