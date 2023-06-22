import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly Base_URL = environment.apiURL + '/coupons';

  getUserCoupons(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id)
  }

  getCoupons() {
    return this.myClient.get<any[]>(this.Base_URL);
  }

  createCoupon(body: any){
    return this.myClient.post(this.Base_URL , body);
  }

  deleteCoupon(id: any) {
    return this.myClient.delete(this.Base_URL + '/' + id)
  }

  updateCoupon(id:any, updatedProduct:any){
    console.log(updatedProduct)  
    return this.myClient.put(this.Base_URL+ '/'+ id,updatedProduct)
  }

}
