import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { VerifyService } from '../../services/verify.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.css']
})
export class ResendVerificationComponent {
  public value:any
  public myEmail:any
  public mainInfo:any;
  public isEdited: boolean | boolean = false;

  constructor(
    private toastr: ToastrService,
    private verifyService: VerifyService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.value = params['value'];
    });

    this.mainInfo = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get email() {return this.mainInfo.get("email"); }
  updateView() {
    this.cdr.detectChanges();
    this.isEdited = true
    console.log(this.mainInfo.value.email)
  }

  onSubmit() {
    console.log(this.myEmail)
    if(this.value == "email")
    {
      this.sendEmailVerification(this.myEmail);
    }else if(this.value == "pass")
    {
      this.sendPasswordResetEmail(this.myEmail);
    }
  }

  sendEmailVerification(email:any){
    this.verifyService.sendVerification(email).subscribe({
      next: () => {
        this.toastr.success("Verification sent", "Feedback");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      },
      error: (error) => {
        console.log(error)
        this.toastr.error(error.error.message, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 5000);
      }
    })
  }

  sendPasswordResetEmail(email:any){
    this.verifyService.sendPasswordReset(email).subscribe({
      next: () => {
        this.toastr.success("Request Password sent", "Feedback");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error.message, "Error");
        setTimeout(() => {
          this.toastr.clear()
        }, 3000);
      }
    })
  }
}
