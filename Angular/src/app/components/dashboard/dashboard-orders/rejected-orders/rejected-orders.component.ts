import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-rejected-orders',
  templateUrl: './rejected-orders.component.html',
  styleUrls: ['./rejected-orders.component.css']
})
export class RejectedOrdersComponent {
  allOrders: any[] = [];
  rejectedOrders:any[]=[];

  displayedColumns: string[] = ['_id', 'numGames', 'total'];
  dataSource!: MatTableDataSource<any>;
@Input() rejectedOrdersChild!:any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService:OrdersService) { 
    this.filterPendingOrders()

  }

  ngOnInit() {
    this.ordersService.orderUpdateChngObservable.subscribe(()=>{
      this.filterPendingOrders();
    })
  }

  filterPendingOrders(){
    this.ordersService.getAllOrders().subscribe(
      {
          next:(data: Object) => {
           this.allOrders = data as any[];
       this.rejectedOrders=this.allOrders.filter(order => order.status === "rejected");
   
           this.dataSource = new MatTableDataSource(this.rejectedOrders);
           this.dataSource.paginator = this.paginator;
         },
         error:(error) => {
           console.log(error);
         }}
       );
  }


}
