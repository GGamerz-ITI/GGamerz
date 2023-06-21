import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent {
  allOrders: any[] = [];
  racceptedOrders:any[]=[];
numGames:any[]=[]

  displayedColumns: string[] = ['id', 'numGames', 'total'];
  dataSource!: MatTableDataSource<any>;
  @Input() acceptedOrdersChild!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService) {
    this.filterAcceptedOrders();

  }

  ngOnInit() {
    this.ordersService.orderUpdateChngObservable.subscribe(() => {
      this.filterAcceptedOrders();
    })
  }
  filterAcceptedOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (data) => {
        this.allOrders = data as any[];
        this.getNumGames()
        this.racceptedOrders = this.allOrders.filter(order => order.status === "accepted");
        this.dataSource = new MatTableDataSource(this.racceptedOrders);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  getNumGames() {
    this.allOrders.forEach(order => {
      console.log(order.Games)

      this.numGames[order.id] = order.Games.length
    })
  }
}
