import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public firstname: string;
  public page: string = 'profile';

  constructor(private authService: AuthService) {
    this.firstname = authService.getFirstName();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  show(page: string) {
    this.page = page;
  }

}
