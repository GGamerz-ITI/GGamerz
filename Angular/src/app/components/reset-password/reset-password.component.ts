import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public mainInfo:any;
  public myPass:any;
  public myPass2:any;
  public matchPass: boolean | boolean = true;
  public isPass: boolean | boolean = false;
  userId: any;
  token: any;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private UserService: UserService,
    private toastr:ToastrService
    ){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.userId = params['userId'];
        this.token = params['token'];
      });

      this.mainInfo = this.fb.group({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password2: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }

    updateView() {
      this.cdr.detectChanges();
    }

    get password() {return this.mainInfo.get("password"); }

    checkPasswords(){
        if(this.myPass != this.myPass2)
        {
          this.matchPass = false;
        }else{
          this.matchPass = true;
          this.isPass = true
        }
        this.updateView()
    }

    onSubmit(){
      const body = {
        id : this.userId,
        token: this.token,
        password: this.myPass
      }
      this.UserService.updatePassword(body).subscribe({
        next:()=>{
          this.toastr.success('Password Updated');
          this.router.navigate(['/login']);
         },
        error:(err)=>{
          if(err.status = 401)
          {
            this.toastr.error('Invalid Token');

          }else if(err.status = 404){
            this.toastr.error('Please request new password reset');
          }
          else{
            this.toastr.error('Failed to update password');
          }
        }
    });
    }
}
