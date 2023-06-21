import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { UserUpdateService } from 'src/app/services/emitters.service';
import { FollowService } from 'src/app/services/follow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  games: any[] = [];
  orders: any;
  editMode: boolean = false
  bgcolor: any;
  default: any;
  updatedName: any;
  updatedDiscord: any;
  updatedPreferences: string[] = [];
  newPreferences: string[] = [];
  inputs: any[] = []
  character = ""
  bgImg = ""
  selectedImage: any
  followers: any
  following: any

  constructor(private userService: UserService, private orderService: OrdersService, private router: Router,
    private cdr: ChangeDetectorRef, private userUpdateService: UserUpdateService, private followService: FollowService) { }

  ngOnInit() {
    this.fetchData()
  }
  setValues(user: any) {
    this.bgcolor = user.bgColor
    this.character = user.character
    this.bgImg = "url(" + this.character + ")"
    this.default = user.bgColor
    this.updatedName = user.username
    this.updatedDiscord = user.discord
    this.updatedPreferences = user.preferences.filter((value: any) => value.length > 0);
  }
  getData() {
    if (this.newPreferences.length > 0)
      this.updatedPreferences = Array.from(new Set(this.updatedPreferences.concat(this.newPreferences)));
      this.updatedPreferences = this.updatedPreferences.filter((value:String) => value.length > 0);
    console.log(this.updatedPreferences)
    const updatedUser = {
      "username": this.updatedName,
      "discord": this.updatedDiscord,
      "preferences": this.updatedPreferences,
      "bgColor": this.bgcolor,
      "character": this.character
    }
    this.emitValue(updatedUser);
    this.userService.updateUser(this.user.id, updatedUser).subscribe({
      next: () => {
        this.fetchData()
        this.toggleEditMode()
        this.refresh()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  emitValue(data: any): void {
    this.userUpdateService.emitValue(data);
  }
  toggleEditMode() {
    this.editMode = !this.editMode
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
    const userObservable = this.userService.getCurrentUser(); //get current user
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
                console.log(err);
              }
            })
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  refresh() {
    this.cdr.detectChanges();
  }
  setDefault() {
    this.bgcolor = this.default
    this.character = this.user.character
    this.bgImg = "url(" + this.character + ")"
  }
  addInput() {
    this.inputs.push("")
  }
  changePP(char: any) {
    switch (char) {
      case 1:
        this.character = 'https://res.cloudinary.com/ds5puha49/image/upload/v1687129075/pubg_gibvff.png'
        break;
      case 2:
        this.character = 'https://res.cloudinary.com/ds5puha49/image/upload/v1687129110/enoiz019r2t41_gdu6rq.png'
        break;
      case 3:
        this.character = 'https://res.cloudinary.com/ds5puha49/image/upload/v1687129076/fa15ab68646f5cd1e5f259693bef1e98-transformed_i3eloo.png'
        break;
      case 4:
        this.character = 'https://res.cloudinary.com/ds5puha49/image/upload/v1687129084/PkBYcGy_jz4ta4.png'
        break;
      case 5:
        this.character = 'https://res.cloudinary.com/ds5puha49/image/upload/v1687129076/ValorantSkye_ac7wia.png'
        break;
    }
    this.bgImg = "url(" + this.character + ")"
    this.selectedImage = char;
    //update user
  }
  getFollowersAndFollowing() {
    this.followService.getFollowers(this.user.id).subscribe({
      next: (data) => {
        // console.log(data)
        this.followers = data
        
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    this.followService.getFollowing(this.user.id).subscribe({
      next: (data) => {
        // console.log(data)
        this.following = data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  redirect(id: any) {
    this.router.navigate(['/users', id]).then(() => {
      this.ngOnInit()
    });
  }

}
