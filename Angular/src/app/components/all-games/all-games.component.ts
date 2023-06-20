// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';
// import { FiltersService } from 'src/app/services/filters.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})

export class AllGamesComponent implements OnInit {
  tags: string[] = [];
  types: string[] = [];
  games: any[] = []
  rawData: any
  priceRange: FormGroup;
  os: FormGroup;
  filteredGames: any[] = [];
  gameTags: any[] = [];
  user: any;
  cart: any
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private gamesService: GamesService, private formBuilder: FormBuilder, private userService: UserService, private cartService: CartService) {
    this.priceRange = this.formBuilder.group({
      range1: false,
      range2: false,
      range3: false,
      range4: false,
      range5: false,
      range6: false
    });
    this.os = this.formBuilder.group({
      mac: false,
      windows: false,
      linux: false
    });
  }

  async ngOnInit(): Promise<void> {
    this.isloggedIn()
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
              console.log(err);
            }
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    try {
      const data = await firstValueFrom(this.gamesService.GetAllGames());
      this.rawData = data;
      this.games = this.rawData;
      if (this.games && this.games.length > 0) {
        this.games.forEach((game: any) => {
          game.tags.forEach((tag: string) => {
            if (!this.gameTags.includes(tag))
              this.gameTags.push(tag)
          });
        });
      }
    } catch (error) {
      console.error("An error occurred while retrieving the games", error);
    }
  }

  isloggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  isInCart(g: any): boolean {
    if (this.cart.some((item: any) => item.id == g.id))
      return true
    return false
  }

  addToCart(g: any) {
    if (this.cart.length > 0) {
      const index = this.cart.findIndex((item: any) => item.id === g.id);
      if (index === -1) {
        this.cartService.addToCart(g.id,this.user.id).subscribe({
          next: () => {
            this.cart.push(g);
          },
          error: (err) => {
            console.log(err);
          }
        })
      } else {
        this.cartService.removeItem(g.id,this.user.id).subscribe({
          next: () => {
            this.cart.splice(index, 1);
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
    else
      this.cartService.addToCart(g.id,this.user.id).subscribe({
        next: () => {
          this.cart.push(g);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onChangepriceRange(): void {
    const selectedPrice = Object.keys(this.priceRange.value).filter(option => this.priceRange.value[option]);
  }

  onChangeOs(): void {
    const selectedOS = Object.keys(this.os.value).filter(option => this.os.value[option]);
    console.log(selectedOS)
    this.rawData.forEach((game: any) => {
      if (game.os.some((os: string) => selectedOS.includes(os))) {
        if (!(this.filteredGames.some(obj => obj.name === game.name)))
          this.filteredGames.push(game)
      }
      else
        if (this.filteredGames.some(obj => obj.name === game.name))
          this.filteredGames.splice(game)

    });
    console.log(this.filteredGames)
    if (this.filteredGames.length > 0)
      this.games = this.filteredGames
    else
      this.games = this.rawData

  }

  onChangeTags(): void {
    console.log(this.tags);
    this.rawData.forEach((game: any) => {
      if (game.tags.some((tag: string) => this.tags.includes(tag))) {
        if (!(this.filteredGames.some(obj => obj.id === game.id)))
          this.filteredGames.push(game)
      }
      else
        if (this.filteredGames.some(obj => obj.id === game.id))
          this.filteredGames.splice(game)
    });
    console.log(this.filteredGames)
    if (this.tags.length > 0)
      this.games = this.filteredGames
    else
      this.games = this.rawData
  }
  onChangeTypes(): void {
    this.rawData.forEach((game: any) => {
      if (game.types.some((type: string) => this.types.includes(type))) {
        if (!(this.filteredGames.some(obj => obj.id === game.id)))
          this.filteredGames.push(game)
      }
      else
        if (this.filteredGames.some(obj => obj.id === game.id))
          this.filteredGames.splice(game)
    });
    console.log(this.filteredGames)
    if (this.types.length > 0)
      this.games = this.filteredGames
    else
      this.games = this.rawData
  }
  formatDate(dateString: string | null): string {
    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }

}
