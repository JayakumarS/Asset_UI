import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthLoginInfo } from "src/app/auth/login-info";
import { AuthService } from "src/app/auth/auth.service";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = "";
  loading = false;
  private loginInfo: AuthLoginInfo;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: [""],
      password: [""],
      emailId: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  // onSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.authForm.invalid) {
  //     return;
  //   } else {
  //     this.router.navigate(["/dashboard/main"]);
  //   }
  // }

  onSubmit(){
    if(this.authForm.valid){
      this.loginInfo = new AuthLoginInfo(
        this.f.username.value, this.f.password.value,this.f.emailId.value);
      this.authService.forgotPasswordService(this.loginInfo).subscribe(
        data => {        
         if(data) {
            if(data.success){
                this.error = data.message;
            }else{
              setTimeout(() => {
                this.submitted = false;
                this.loading = false;
                this.error = data.message;
  
          }, 1000);
            }
         }
        },
          
        );
    }
    
  }

  loginPage(){
    this.dialogRef.close();
  }

  
}
