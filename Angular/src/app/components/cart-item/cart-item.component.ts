import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],

})
export class CartItemComponent {

  user: any;
  total: any;
  cart: any

  constructor(private userService: UserService, private cartService: CartService) { }

  removeCartItem(id: any) {
    this.cartService.removeItem(id, this.user.id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  async ngOnInit(): Promise<void> {
    this.total=0
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.cartService.GetCart(this.user.id).subscribe({
            next: (data) => {
              this.cart = data;
              this.updateTotal()
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  clearCart() {
    this.cartService.emptyCart(this.user.id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateTotal() {
    console.log(this.cart)
    this.cart.forEach((item:any) => {
      this.total+= parseFloat( item.price)
    });
  }

  checkout(){
    localStorage.setItem('cartTotalPrice', this.total.toString());
    localStorage.setItem('allCartItems', this.cart.length.toString());
  }
}
