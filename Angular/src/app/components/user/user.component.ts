import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { timer } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { UserUpdateService } from 'src/app/services/emitters.service';
import { FollowService } from 'src/app/services/follow.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user: any;
  games: any[] = [];
  orders: any;
  bgcolor: any;
  default: any;
  character = ""
  bgImg = ""
  followers: any
  following: any
  userId: any
  currentUser: any
  userFollower: any
  userFollowing: any

  constructor(private toastr: ToastrService, private router: Router, private userService: UserService, private orderService: OrdersService,
    private cdr: ChangeDetectorRef, private followService: FollowService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"]
    this.fetchData()
    const userObservable = this.userService.getCurrentUser(); //get current user
    if (userObservable) {
      userObservable.subscribe({
        next: (data: any) => {
          this.currentUser = data;
          if (this.currentUser.id == this.userId)
            this.router.navigate(['/profile']);
          this.getCurrentUserFollowersAndFollowing()
        },
        error: (err: any) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }
      });
    }
  }

  redirect(id: any) {
    this.router.navigate(['/users', id]).then(() => {
      timer(500).subscribe(() => {
        this.ngOnInit()
      })
    });
  }

  setValues(user: any) {
    this.bgcolor = user.bgColor
    this.character = user.character
    this.bgImg = "url(" + this.character + ")"
  }

  getGames() {
    this.orders.forEach((order: any) => {
      if (order.status == 'accepted') {
        console.log(order.Games)
        order.Games.forEach((game: any) => {
          if (this.games.length > 0) {
            if (!this.games.some((obj: any) => obj.id === game.id))
              this.games.push(game)
          } else {
            this.games.push(game)
          }
        })
      }
    })
  }

  fetchData() {
    const userObservable = this.userService.getUserByID(this.userId); //get current user
    if (userObservable) {
      userObservable.subscribe({
        next: (data: any) => {
          this.user = data;
          this.getFollowersAndFollowing()
          this.setValues(data)
          const ordersObservable = this.orderService.GetUserOrders(data.id);
          if (ordersObservable) {
            ordersObservable.subscribe({
              next: (data: any) => {
                this.orders = data
                this.getGames()
              },
              error: (err: any) => {
                this.toastr.error(err, "Error");
                setTimeout(() => {
                  this.toastr.clear()
                }, 3000);

              }
            })
          }
        },
        error: (err: any) => {
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);

        }
      });
    }
  }

  refresh() {
    this.cdr.detectChanges();
  }

  getFollowersAndFollowing() {
    this.followService.getFollowers(this.user.id).subscribe({
      next: (data) => {
        this.followers = data
      },
      error: (err: any) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
    this.followService.getFollowing(this.user.id).subscribe({
      next: (data) => {
        this.following = data

      },
      error: (err: any) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
  }

  getCurrentUserFollowersAndFollowing() {
    this.followService.getFollowers(this.currentUser.id).subscribe({
      next: (data) => {
        this.userFollower = data
      },
      error: (err: any) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
    this.followService.getFollowing(this.currentUser.id).subscribe({
      next: (data) => {
        this.userFollowing = data
      },
      error: (err: any) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
  }

  isFollower(): boolean {
    // console.log(this.userFollower.followers)
    if (this.userFollower.followers.some((follower: { id: any; }) => follower.id === this.user.id))
      return true
    else
      return false
  }

  isFollowing(): boolean {
    // console.log(this.userFollowing.followings)
    if (this.userFollowing.followings.some((following: { id: any; }) => following.id === this.user.id))
      return true
    else
      return false
  }

  follow() {
    console.log("person to follow", this.userId)
    console.log("my id", this.currentUser.id)
    this.followService.follow(this.userId, this.currentUser.id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
  }

  unfollow() {
    this.followService.unfollow(this.userId, this.currentUser.id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);

      }
    })
  }
}
