import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard-coupons',
  templateUrl: './dashboard-coupons.component.html',
  styleUrls: ['./dashboard-coupons.component.css']
})
export class DashboardCouponsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'amount', 'points', 'actions'];
  productsTitle: string = "Coupons";
  dataSource!: MatTableDataSource<any>;

  constructor(private couponService: CouponsService) {
    this.dataSource = new MatTableDataSource<any[]>([]);
  }

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (data: any[]) => {
        this.dataSource.data = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} - ${month} - ${year}`;
  }
}
