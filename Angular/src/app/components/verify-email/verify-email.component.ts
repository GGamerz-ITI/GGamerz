import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  userId: any;
  token: any;
  errorMsg: any;

  constructor(private VerifyService: VerifyService, private router: Router, private route: ActivatedRoute, private toastr:ToastrService){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];

      // Call the verifyUserEmail service method
      this.verifyUserEmail();
    });
  }

  verifyUserEmail() {
    this.VerifyService.verifyUserEmail(this.userId, this.token).subscribe({
      next: (data)=>{
        console.log(data);
        this.toastr.success('Verified Successfully');
        this.router.navigate(['/login']);
      },
      error: (err)=>{
        if(err.status = 401)
        {
          console.log(err);
          this.toastr.error('Invalid Token');

        }else if(err.status = 404){
          console.log(err);
          this.toastr.error('Token not found');
        }
        else{
          this.toastr.error('Verification Failed');
        }
      }
    });
  }

}
