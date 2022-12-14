import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logs$: Observable<Log[]>;

  constructor(private http: HttpClient) {
    this.logs$ = this.http.get<{ message: string, logs: Log[] }>(`${environment.apiUrl}/api/logs`)
      .pipe(
        map((res) => { return res.logs })
      );
  }

  public getLogs(): Observable<Log[]> {
    return this.logs$;
  }
}
