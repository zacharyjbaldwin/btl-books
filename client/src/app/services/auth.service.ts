import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginError } from '../shared/login-error.enum';
import { SignupError } from '../shared/signup-error.enum';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;
  private logoutTimer: any;
  private token: string = '';
  private userId: string = '';
  private firstname: string = '';
  private lastname: string = '';
  private email: string = '';

  public loginError = new Subject<LoginError>();
  public signupError = new Subject<SignupError>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getAuthenticationStatusListener(): Subject<boolean> {
    return this.authenticationStatusListener;
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getFirstName(): string {
    return this.firstname;
  }

  public getLastName(): string {
    return this.lastname;
  }

  public getEmail(): string {
    return this.email;
  }

  public login(email: string, password: string, redirectTo?: string): void {
    const body = {
      email: email,
      password: password
    };

    this.http.post<{ token: string, expiresIn: number, userId: string, firstname: string, lastname: string, isAdmin: boolean, email: string }>(`${environment.apiUrl}/api/auth/login`, body)
      .subscribe({
        next: (response) => {
          this.token = response.token;
          if (this.token) {

            const expiresInSeconds = response.expiresIn;
            this.firstname = response.firstname;
            this.lastname = response.lastname;

            this.setAutoLogoutTimer(expiresInSeconds);

            this.email = response.email;
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.isAdmin = response.isAdmin;
            this.authenticationStatusListener.next(true);

            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInSeconds * 1000);

            this.saveAuthData(this.token, expirationDate, this.userId, this.firstname, this.lastname, this.isAdmin, this.email);

            if (redirectTo) {
              this.router.navigate([`/${redirectTo}`]);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        error: (error) => {
          switch (error.error.error) {
            case 'EMAIL_DOES_NOT_EXIST': // Email does not exist.
              this.loginError.next(LoginError.EmailDoesNotExist);
              break;
            case 'INCORRECT_PASSWORD': //
              this.loginError.next(LoginError.IncorrectPassword);
              break;
            default:
              this.loginError.next(LoginError.GenericLoginError);
              break;
          }

        }
      });
  }

  public logout(): void {
    this.token = '';
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authenticationStatusListener.next(false);
    this.userId = '';

    clearInterval(this.logoutTimer);

    this.clearAuthData();
    this.router.navigate(['/']);
  }

  public autoLogin(): void {
    const authData = this.getAuthData();
    const now = new Date();

    if (!authData) {
      return;
    }

    const expiresIn = authData.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.userId = authData.userId;
      this.firstname = authData.firstname;
      this.lastname = authData.lastname;
      this.isAdmin = authData.isAdmin;
      this.email = authData.email;
      this.authenticationStatusListener.next(true);
      this.setAutoLogoutTimer(expiresIn / 1000);
    } else {
      this.clearAuthData();
    }
  }

  private getAuthData(): any {
    const token = localStorage.getItem(Md5.hashStr(environment.stringFor.token));
    const expirationDate = localStorage.getItem(Md5.hashStr(environment.stringFor.expiration));
    const userId = localStorage.getItem(Md5.hashStr(environment.stringFor.userId));
    const firstname = localStorage.getItem(Md5.hashStr(environment.stringFor.firstname));
    const lastname = localStorage.getItem(Md5.hashStr(environment.stringFor.lastname));
    const isAdmin = localStorage.getItem(Md5.hashStr(environment.stringFor.isAdmin)) == Md5.hashStr(environment.stringFor.true) ? true : false;
    const email = localStorage.getItem(Md5.hashStr(environment.stringFor.email));

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      firstname: firstname,
      lastname: lastname,
      isAdmin: isAdmin,
      email: email
    }
  }

  private setAutoLogoutTimer(seconds: number): void {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, seconds * 1000);
  }

  private clearAuthData(): void {
    localStorage.removeItem(Md5.hashStr(environment.stringFor.token));
    localStorage.removeItem(Md5.hashStr(environment.stringFor.expiration));
    localStorage.removeItem(Md5.hashStr(environment.stringFor.userId));
    localStorage.removeItem(Md5.hashStr(environment.stringFor.firstname));
    localStorage.removeItem(Md5.hashStr(environment.stringFor.lastname));
    localStorage.removeItem(Md5.hashStr(environment.stringFor.isAdmin));
    localStorage.removeItem(Md5.hashStr(environment.stringFor.email));
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, firstname: string, lastname: string, isAdmin: boolean, email: string): void {
    localStorage.setItem(Md5.hashStr(environment.stringFor.token), token);
    localStorage.setItem(Md5.hashStr(environment.stringFor.expiration), expirationDate.toISOString());
    localStorage.setItem(Md5.hashStr(environment.stringFor.userId), userId);
    localStorage.setItem(Md5.hashStr(environment.stringFor.firstname), firstname);
    localStorage.setItem(Md5.hashStr(environment.stringFor.lastname), lastname);
    localStorage.setItem(Md5.hashStr(environment.stringFor.isAdmin), (isAdmin == true ? Md5.hashStr(environment.stringFor.true) : Md5.hashStr(environment.stringFor.false)));
    localStorage.setItem(Md5.hashStr(environment.stringFor.email), email);
  }

  public signUp(email: string, firstname: string, lastname: string, password: string): void {
    const body = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    };

    this.http.post(`${environment.apiUrl}/api/auth/signup`, body)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          switch (error.error.error) {
            case 'EMAIL_ALREADY_IN_USE':
              this.signupError.next(SignupError.EmailAlreadyInUse);
              break;
            default:
              this.signupError.next(SignupError.GenericSignupError);
              break;
          }
          this.authenticationStatusListener.next(false);
        }
      });
  }
}
