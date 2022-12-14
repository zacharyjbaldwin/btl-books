import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private users: User[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${environment.apiUrl}/api/users`)
      .pipe(
        map((results) => { return results.users })
      );
  }

  public promoteUser(userId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/promote/${userId}`, {});
  }

  public demoteUser(userId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/demote/${userId}`, {});
  }
}
