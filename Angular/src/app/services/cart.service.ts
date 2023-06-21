import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly Base_URL = environment.apiURL + "/cart"; //localhost:3000/api
  constructor(private readonly myClient: HttpClient, private userService: UserService) { }

  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // By convention, appending a dollar sign $ to the variable name indicates that it is an Observable
  public total$ = this.totalSubject.asObservable();
  public cartItems$: Observable<any[]> = this.cartItems.asObservable();

  updateTotal(totalPrice: number) {
    this.totalSubject.next(totalPrice);
  }

  public updateCartItems(items: any[]): void {
    this.cartItems.next(items);
  }

  gettotalPriceFromLocalStorage(): number {
    const cartTotalPrice = localStorage.getItem('cartTotalPrice');
    console.log(cartTotalPrice)
    return cartTotalPrice !== null ? parseFloat(cartTotalPrice) : 0;
  }

  getallItemsFromLocalStorage(): number {
    const cartItems = localStorage.getItem('allCartItems');
    return cartItems !== null ? parseInt(cartItems) : 0;
  }

  GetCart(id:any) {
    
    return this.myClient.get(this.Base_URL + '/' + id)
  }

  removeItem(gameId:any,id:any){
   
    return this.myClient.delete(this.Base_URL + '/' + id+'/' + gameId)
  }

  emptyCart(id:any){

    return this.myClient.delete(this.Base_URL + '/' + id)
  }
  addToCart(gameId:any,userId:any){
  
    return this.myClient.post(this.Base_URL ,{userId,gameId})
  }
}
