import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  allOrders: any[] = [];
  acceptedOrders: any[] = [];
  numGames: any[] = []

  displayedColumns: string[] = ['id', 'numGames', 'total', 'action'];
  dataSource!: MatTableDataSource<any>;
  @Input() acceptedOrdersChild!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toastr: ToastrService, private ordersService: OrdersService) {
    this.filterPendingOrders();

  }

  ngOnInit() {
    this.ordersService.orderUpdateChngObservable.subscribe(() => {
      this.filterPendingOrders();
    })
  }
  filterPendingOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (data: Object) => {
        this.allOrders = data as any[];
        this.acceptedOrders = this.allOrders.filter(order => order.status === "pending");
        this.getNumGames()
        this.dataSource = new MatTableDataSource(this.acceptedOrders);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    })
  }

  getNumGames() {
    this.allOrders.forEach(order => {
      console.log(order.Games)

      this.numGames[order.id] = order.Games.length
    })
  }

  chngStatus(id: any, status: string) {
    const body = { status: status }
    this.ordersService.chngOrderStatus(id, body).subscribe({
      next: () => {
        this.ordersService.orderChngStatusSubject.next();
        // console.log("done")
        if (status == 'accepted') {
          this.toastr.success("Order accepted!", "Feedback");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }else{
          this.toastr.error("Order declined!", "Feedback");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
        }
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    })
  }



}
