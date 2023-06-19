import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { UserUpdateService } from 'src/app/services/emitters.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  games: any[] = [];
  orders: any;
  tags: any[] = [];
  tagCount: any[] = [];
  editMode: boolean = false
  bgcolor: any;
  default: any;
  updatedName: any;
  updatedDiscord: any;
  updatedPreferences: any[] = [];
  newPreferences: any[] = [];
  inputs: any[] = []
  character = 'assets/images/Characters/PkBYcGy.png'
  bgImg = "url(" + this.character + ")"
  selectedImage:any

  constructor(private userService: UserService, private orderService: OrdersService,
    private cdr: ChangeDetectorRef, private userUpdateService: UserUpdateService) { }

  ngOnInit(): void {
    this.fetchData()
  }
  setValues() {
    this.bgcolor = this.user.bgColor
    this.default = this.user.bgColor
    this.updatedName = this.user.username
    this.updatedDiscord = this.user.discord
    this.updatedPreferences = this.user.preferences.filter((value: string[]) => value.length > 0);
  }
  getData() {
    if (this.newPreferences.length > 0)
      this.updatedPreferences = Array.from(new Set(this.updatedPreferences.concat(this.newPreferences)));
    this.updatedPreferences.filter(value => value.length > 0);
    const updatedUser = {
      "username": this.updatedName,
      "discord": this.updatedDiscord,
      "preferences": this.updatedPreferences,
      "bgColor": this.bgcolor,
      // "character":this.character
    }
    this.emitValue(updatedUser);
    this.userService.updateUser(this.user._id, updatedUser).subscribe({
      next: () => {
        this.fetchData()
        this.toggleEditMode()
        this.refresh()
        this.user.preferences = this.user.preferences.filter((value: String) => value.length > 0);
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
  getTags() {
    this.orders.forEach((order: any) => { //looping user orders
      if (order.status == 'accepted') {
        order.gameItems.forEach((game: any) => { // looping games included in each order
          if (game.tag) {
            game.tag.forEach((tag: string) => { //looping tags of each game
              if (this.tags.length > 0) {
                const index = this.tags.findIndex((item: any) => item === tag);
                if (index === -1) {
                  this.tags.push(tag);
                  this.tagCount[this.tags.length - 1] = 1;
                } else {
                  this.tagCount[index]++;
                }
              }
              else
                this.tags.push(tag);
              this.tagCount[0] = 1;
            });
          }
        });
      }
    })
  }
  getGames() {
    this.orders.forEach((order: any) => {
      if (order.status == 'accepted') {
        order.gameItems.forEach((game: any) => {
          if (this.games.length > 0) {
            if (!this.games.some((obj: any) => obj._id === game._id))
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
      userObservable.pipe(
        switchMap((userData) => { //to switch to the orders Observable inside the user Observable subscription
          this.user = userData;
          this.user.preferences = this.user.preferences.filter((value: String) => value.length > 0);
          this.setValues()
          // Fetch user orders
          const ordersObservable = this.orderService.GetUserOrders(this.user._id);
          if (ordersObservable) {
            return ordersObservable;
          } else {
            throw new Error('Failed to fetch user orders');
          }
        })
      ).subscribe({
        next: (data: any) => {
          this.orders = data;
          this.getTags()
          this.getGames()
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
    this.character = 'assets/images/Characters/PkBYcGy.png'
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

  // followers=[
  //   {
  //     username:"ahmed",
  //     character:"assets/images/Characters/PkBYcGy.png",
  //     level:"gladiator"
  //   },
  //   {
  //     username:"samya",
  //     character:"assets/images/Characters/enoiz019r2t41.png",
  //     level:"slayer"
  //   },
  //   {
  //     username:"koko",
  //     character:"assets/images/Characters/pubg.png",
  //     level:"knight"
  //   }
  // ]
  // following=[
  //   {
  //     username:"ahmed",
  //     character:"assets/images/Characters/PkBYcGy.png",
  //     level:"gladiator"
  //   },
  //   {
  //     username:"samya",
  //     character:"assets/images/Characters/enoiz019r2t41.png",
  //     level:"slayer"
  //   },
  //   {
  //     username:"koko",
  //     character:"assets/images/Characters/pubg.png",
  //     level:"knight"
  //   },
  //   {
  //     username:"samya",
  //     character:"assets/images/Characters/enoiz019r2t41.png",
  //     level:"slayer"
  //   },
  //   {
  //     username:"koko",
  //     character:"assets/images/Characters/pubg.png",
  //     level:"knight"
  //   }
  // ]
}
