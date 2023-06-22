import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  itemsCount: number = 0
  usersCount: number = 0
  ordersCount: number = 0
  acceptedOrders: any[] = []
  countAcceptedOrders: number = 0
  revenue: number = 0

  constructor(private toastr: ToastrService, private gamesService: GamesService, private userService: UserService, private orderService: OrdersService) {
    this.getAllItemsCount();
    this.getAllUsersCount();
    this.getAllOrdersCount();
    this.getRevenue();
  }

  getAllItemsCount() {
    this.gamesService.GetAllGames().subscribe({
      next: (items: Object) => {
        this.itemsCount = Object.keys(items).length;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });
  }

  getAllUsersCount() {
    this.userService.getAllUsers().subscribe({
      next: (users: Object) => {
        this.usersCount = Object.keys(users).length;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });
  }

  getRevenue() {
    this.orderService.getAllOrders().subscribe({
      next: (items: any) => {
        this.acceptedOrders = Object.keys(items).filter((order: any) => items[order].status == 'accepted')
        this.countAcceptedOrders = this.acceptedOrders.length
        for (let i = 0; i < this.acceptedOrders.length; i++) {
          this.revenue = this.revenue + parseFloat(items[this.acceptedOrders[i]].total)
        }
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });
  }

  getAllOrdersCount() {
    this.orderService.getAllOrders().subscribe({
      next: (orders: Object) => {
        this.ordersCount = Object.keys(orders).length;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    });
  }

}
