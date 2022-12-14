import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public showAdminLink: boolean = false;
  private subs = new Subscription();

  constructor(private authService: AuthService) {
    this.subs.add(this.authService.getAuthenticationStatusListener().subscribe(() => {
      this.showAdminLink = this.authService.getIsAdmin();
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
