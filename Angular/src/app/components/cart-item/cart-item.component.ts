import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],

})
export class CartItemComponent {

  user: any;
  total: any;
  cart: any
  coupons: any
  selectedCouponId: any
  orderPts = 0

  constructor(private toastr: ToastrService,private userService: UserService, private cartService: CartService, private couponsService: CouponsService) { }

  getAvailcoupons() {
    this.couponsService.getUserCoupons(this.user.id).subscribe({
      next: (data) => {
        this.coupons = data
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 2000);      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.total = 0
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.getAvailcoupons()
          this.cartService.GetCart(this.user.id).subscribe({
            next: (data) => {
              this.cart = data;
              this.updateTotal()
            },
            error: (err) => {
              this.toastr.error(err, "Error");
              setTimeout(() => {
                this.toastr.clear()
              }, 2000);                 }
          })
        },
        error: (err) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 2000);             }
      })
    }
  }

  removeCartItem(id: any) {
    this.cartService.removeItem(id, this.user.id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 2000);           }
    });
  }

  clearCart() {
    this.cartService.emptyCart(this.user.id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 2000);           }
    })
  }

  updateTotal() {
    console.log(this.cart)
    this.cart.forEach((item: any) => {
      this.total += parseFloat(item.price)
    });
  }

  checkout() {
    this.applyCoupon()
    this.getPoints()
    localStorage.setItem('cartTotalPrice', this.total.toString());
    localStorage.setItem('allCartItems', this.cart.length.toString());
  }

  getPoints() {
    this.cart.forEach((game: any) => {
      this.orderPts += game.points
    });
    localStorage.setItem('orderPts', this.orderPts.toString());
    // console.log(this.orderPts)
  }

  applyCoupon() {
    console.log(this.selectedCouponId)
    this.coupons.forEach((coupon: any) => {
      if (coupon.id == this.selectedCouponId) {
        const discount = parseInt(coupon.amount)
        this.total = this.total - (this.total * (discount / 100))
        this.orderPts -= coupon.points
      }
    });
  }

}
