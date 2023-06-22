import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
import { CouponsService } from 'src/app/services/coupons.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent {
  createdGame: string = "New Coupon";

  constructor(private couponService: CouponsService, private router: Router, private toastr: ToastrService,) {}

  couponForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    expDate: new FormControl(null, Validators.required),
    points: new FormControl(null, Validators.required),
  })

  add() {
    if (this.couponForm.valid) {
      let name = this.couponForm.controls['name'].value;
      let amount = this.couponForm.controls['amount'].value;
      let expDate = this.couponForm.controls['expDate'].value;
      let points = this.couponForm.controls['points'].value;

      let couponData = {
        name,
        amount,
        expDate,
        points,
      }

      this.couponService.createCoupon(couponData).subscribe({
        next: () => {
          this.toastr.success("Coupon created successfully", "Success");
          this.router.navigate(['/dashboard/coupons']);
        },

        error:(err)=>{
          this.toastr.error(err, "Error");
          setTimeout(() => {
            this.toastr.clear()
          }, 3000);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
