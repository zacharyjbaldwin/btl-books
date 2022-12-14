import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const redirectTo = route.url[0].path;
    const isAuthenticated = this.authService.getIsAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { redirectTo: redirectTo } });
    }

    return isAuthenticated;
  }
}
