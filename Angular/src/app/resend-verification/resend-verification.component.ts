import { Component } from '@angular/core';
import { VerifyService } from '../services/verify.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.css']
})
export class ResendVerificationComponent {
  email = ""
  constructor(private toastr: ToastrService, private verifyService: VerifyService) { }
  send() {
    console.log(this.email)
    this.verifyService.sendVerification(this.email).subscribe({
      next: () => {
        this.toastr.success("Verification sent", "Feedback");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      },
      error: (error) => {
        this.toastr.error(error, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    })
  }
}
