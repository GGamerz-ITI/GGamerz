import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public validMainInfo: boolean | boolean = false;
  public matchPass: boolean | boolean = true;
  public mainInfo:any;
  public errorMsg:any = null;

  constructor(private UserService: UserService, private router: Router, private VerifyService: VerifyService, private toastr:ToastrService){}

  getData(data:any){
    this.validMainInfo = data;
  }

  getMain(data:any){
    this.mainInfo = data;
  }
  matchPassword(match:any){
    this.matchPass = match;
  }

  onSubmit(){
    const formData = this.mainInfo.value;
    console.log(formData);
    this.UserService.Register(formData).subscribe({
      next:()=>{
        this.sendVerification(formData.email.toLowerCase())
       },

      error:(err)=>{
        if(err.status = 409 )
        {
          console.log(err);
          this.errorMsg = err.error.message;
        }else{
          console.log("else "+err);

          this.errorMsg = "Registration Failed";
        }
      }
  });
  }

  sendVerification(email:any) {
    this.VerifyService.sendVerification(email).subscribe({
      next: (data)=>{
        this.toastr.success('Sent Verification to Email');
        this.router.navigate(['/login']);
      },
      error: (err)=>{
        if(err.status = 409)
        {

          this.toastr.error('User Already Verified');
          this.router.navigate(['/']);

        }else
        if(err.status = 404){

          this.toastr.error('Error User Not Registered');
          this.router.navigate(['/register']);
        }
        else{
          this.toastr.error('Verification Failed');
          // Navigate to verification component
        }
      }
    });
  }
}
