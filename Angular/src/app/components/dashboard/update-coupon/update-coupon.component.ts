import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
import { CouponsService } from 'src/app/services/coupons.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent {
  createdGame: string = "Update Coupon";
  updatedProductId!:string;
  dataSource!: MatTableDataSource<any>;
  coupons: any[] = [];
  oldName = "";
  oldAmount = "";
  oldPoints = "";
  oldExpdate = "";
  couponForm!: FormGroup;

  constructor(private couponService: CouponsService,
    private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute,) {
    //selected coupon by its id
    this.updatedProductId = this.route.snapshot.params["id"];
    this.dataSource = new MatTableDataSource<any[]>([]);
    this.getCoupons(); // move getCoupons() call here
  }

  ngOnInit() {
    this.couponForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      expDate: new FormControl(null, Validators.required),
      points: new FormControl(null, Validators.required)
    });

    // set initial values
    this.couponForm.patchValue({
      name: this.oldName,
      amount: this.oldAmount,
      expDate: this.oldExpdate,
      points: this.oldPoints
    });
    console.log(this.oldName)
  }




  getCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (data: any[]) => {
        this.dataSource.data = data;
        const selectedCoupon = this.dataSource.data.find(coupon => coupon.id === parseInt(this.updatedProductId));
          if (selectedCoupon) {
            this.oldName = selectedCoupon.name
            this.oldAmount = selectedCoupon.amount
            this.oldPoints = selectedCoupon.points
            this.oldExpdate = selectedCoupon.expDate
          } else {
            console.log('No coupon found with id:', this.updatedProductId);
          }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  edit() {
    if (this.couponForm.valid) {
      let name = this.couponForm.controls['name'].value;
      let amount = this.couponForm.controls['amount'].value;
      let expDate = this.couponForm.controls['expDate'].value;
      let points = this.couponForm.controls['points'].value;

      let updatedCouponData = {
        name,
        amount,
        expDate,
        points,
      }


        this.couponService.updateCoupon(this.updatedProductId, updatedCouponData).subscribe({
         next: () => {
          this.toastr.success("Coupon updated successfully", "Success");
          this.router.navigate(['/dashboard/coupons']);
        }, // handle success response
        error:(err)=>{
          this.toastr.error(err.message, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        } // handle error response
      });
    }else {
      console.log('Form is not valid');
    }
  }

  // edit() {
  //   if (this.couponForm.valid) {
  //     let name = this.couponForm.controls['name'].value;
  //     let amount = this.couponForm.controls['amount'].value;
  //     let expDate = this.couponForm.controls['expDate'].value;
  //     let points = this.couponForm.controls['points'].value;

  //     let updatedCouponData = {
  //       name: name,
  //       amount: amount,
  //       expDate: expDate,
  //       points: points
  //     };

  //     this.couponService.updateCoupon(this.updatedProductId, updatedCouponData).subscribe({
  //       next: () => {
  //         this.toastr.success("Coupon updated successfully", "Success");
  //         this.router.navigate(['/dashboard/coupons']);
  //       },
  //       error: (err) => {
  //         this.toastr.error(err, "Error");
  //       },
  //       complete: () => {
  //         this.toastr.clear();
  //       }
  //     });
  //   }
  // }

}
