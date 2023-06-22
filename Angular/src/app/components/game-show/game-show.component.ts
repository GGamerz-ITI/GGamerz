import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.css']
})
export class GameShowComponent implements OnInit {
  gameID: any;
  game: any;
  isLoggedIn: boolean = false;
  user: any;
  cart: any
  images: GalleryItem[] = [];

  constructor(private toastr: ToastrService,route: ActivatedRoute, private gameService: GamesService, private authService: AuthService, private userService: UserService, private cartService: CartService) {
    this.gameID = route.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.gameService.GetGameByID(this.gameID).subscribe({
      next: (data) => {
        this.game = data
        this.assignImages()
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000); 
          }
    })
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.cartService.GetCart(this.user.id).subscribe({
            next: (data) => {
              this.cart = data;
              console.log(this.cart)
            },
            error: (err) => {
              this.toastr.error(err, "Error");
              setTimeout(() => {
                this.toastr.clear()
              }, 3000);             }
          })
          this.isloggedIn();
        },
        error: (err) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);         }
      })
    }

  }

  assignImages() {
    this.game.images.forEach((img: string) => {
      this.images.push(new ImageItem({ src: img, thumb: img })
      )
    });
  }
  isloggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  isInCart(): boolean {
    if (this.cart.some((item: any) => item.id ==this.gameID))
      return true
    return false
  }

  addToCart() {
    if (this.cart.length > 0) {
      const index = this.cart.findIndex((item: any) => item.id === this.game.id);
      if (index === -1) {
        this.cartService.addToCart(this.game.id,this.user.id).subscribe({
          next: () => {
            this.cart.push(this.game);
            this.toastr.success("Game added Successfully!", "Updating Cart");
          },
          error: (err) => {
            this.toastr.error(err, "Error");
            setTimeout(() => {
              this.toastr.clear()
            }, 3000);           }
        })
      } else {
        this.cartService.removeItem(this.game.id,this.user.id).subscribe({
          next: () => {
            this.cart.splice(index, 1);
            this.toastr.error("Game removed Successfully!", "Updating Cart");

          },
          error: (err) => {
            this.toastr.error(err, "Error");
            setTimeout(() => {
              this.toastr.clear()
            }, 3000);           }
        })
      }
    }
    else
      this.cartService.addToCart(this.game.id,this.user.id).subscribe({
        next: () => {
          this.cart.push(this.game);
          this.toastr.success("Game added Successfully!", "Updating Cart");
        },
        error: (err) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);         }
      })
  }

}
