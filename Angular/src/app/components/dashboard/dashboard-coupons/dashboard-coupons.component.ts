import { Component, OnInit, ViewChild } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard-coupons',
  templateUrl: './dashboard-coupons.component.html',
  styleUrls: ['./dashboard-coupons.component.css']
})
export class DashboardCouponsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'amount', 'points', 'actions'];
  productsTitle: string = "Coupons";
  dataSource!: MatTableDataSource<any>;
  coupons: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toastr: ToastrService, private couponService: CouponsService) {
    this.dataSource = new MatTableDataSource<any[]>([]);
  }

  ngOnInit() {
  this.getCoupons();
  }

  getCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (data: any[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  deleteCoupon(id: any) {
    this.couponService.deleteCoupon(id).subscribe({
      next: () => {
        // Remove the deleted coupon from the list
        this.coupons = this.coupons.filter(coupon => coupon.id !== id);
        // Update the dataSource with the updated list of coupons
        this.dataSource.data = this.coupons;
        this.toastr.success("Coupon deleted successfully", "Success");
        this.getCoupons()
      },
      error: (err) => {
        this.toastr.error(err, "Error");
        setTimeout(() => {
          this.toastr.clear();
        }, 3000);
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
