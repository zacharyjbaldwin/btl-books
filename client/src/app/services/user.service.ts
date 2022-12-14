import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAddressesById(userId: String): Observable<any> {
    return this.http.get<{ count: number, addresses: Address[] }>(`${environment.apiUrl}/api/address/${userId}`)
      .pipe(
        map((res) => { return res.addresses; })
      );
  }

  public deleteAddressById(addressId: String) {
    return this.http.delete(`${environment.apiUrl}/api/address/${addressId}`);
  }

  public addAddress(address: Address) {
    return this.http.post(`${environment.apiUrl}/api/address`, {
      sendTo: address.sendTo,
      addrLine1: address.addrLine1,
      addrLine2: (address.addrLine2 ? address.addrLine2 : undefined),
      city: address.city,
      state: address.state,
      zip: address.zip
    });
  }

  public editDetails(firstname: String, lastname: String, email: String) {
    return this.http.put(`${environment.apiUrl}/api/user`, {
      firstname: firstname,
      lastname: lastname,
      email: email
    });
  }
}
