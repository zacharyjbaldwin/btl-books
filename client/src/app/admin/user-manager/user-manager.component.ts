import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private subs = new Subscription();
  public loading = true;

  constructor(
    private userManagerService: UserManagerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.loading = true;
    this.subs.add(this.userManagerService.getUsers().subscribe((users) => {
      this.users = users;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public promote(id: string): void {
    this.userManagerService.promoteUser(id).subscribe({
      next: (result) => {
        this.toastr.success(`Promoted ${result.user.firstname} ${result.user.lastname}.`);
        this.fetchUsers();
      },
      error: (error) => {
        this.toastr.error('Failed to promote user.');
      }
    });
  }

  public demote(id: string): void {
    this.userManagerService.demoteUser(id).subscribe({
      next: (result) => {
        this.toastr.success(`Demoted ${result.user.firstname} ${result.user.lastname}.`);
        this.fetchUsers();
      },
      error: (error) => {
        this.toastr.error('Failed to demote user.');
      }
    });
  }

}
