import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly Base_URL = environment.apiURL + '/coupons';

  getUserCoupons(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id)
  }
}
