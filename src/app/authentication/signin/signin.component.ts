import { Component, OnInit } from "@angular/core";
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User } from "src/app/core/models/user";
import { BehaviorSubject,Observable } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { CompanyMapPopupComponent } from "src/app/admin/dashboard/main/company-map-popup/company-map-popup.component";
import { CompanyLogoResultBean } from "src/app/master/company-logo/companyLogoResultBean";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  userName : string ='';
   userObj = {};
   private currentUserSubject: BehaviorSubject<User>;
  private loginInfo: AuthLoginInfo;
  logoList: any;
  path: any;
  bgList: any;
  bgImg: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private app: AppService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,
    private httpService: HttpServiceService,


  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      emailId: [""],
    });
    this.httpService.get<CompanyLogoResultBean>(this.authService.companyUrl).subscribe(
      (data: any) => {
        // console.log(data);
        this.logoList = data.companyLogo;
        this.path = this.logoList;
        this.bgList = data.backGroundImg;
        this.bgImg = this.bgList;

        // let pathLength = this.logoList.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }


  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@software.com");
    this.authForm.get("password").setValue("admin@123");
  }
  employeeSet() {
    this.authForm.get("username").setValue("employee@software.com");
    this.authForm.get("password").setValue("employee@123");
  }
  clientSet() {
    this.authForm.get("username").setValue("client@software.com");
    this.authForm.get("password").setValue("client@123");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {

      this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.emailId.value);


      this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        if (data) {
              if(data.success){
                  setTimeout(() => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);
                this.tokenStorage.saveUserId(data.email);

                this.tokenStorage.saveCompanyId(data.userDetails.companyId);
                this.tokenStorage.saveCompanyText(data.userDetails.company);
                this.tokenStorage.saveRoleId(data.userDetails.roleId);
                this.tokenStorage.saveRoleText(data.userDetails.role);
                this.tokenStorage.saveBranchId(data.userDetails.branchId);
                this.tokenStorage.saveCompanies(data.userDetails.companies);
                this.tokenStorage.saveRoles(data.userDetails.roles);
                this.loginSuccessUserLog();
                // if(data.userDetails.companies.length>0){
                //   this.showPopUp();
                // }
                this.loading = false;
                if(data.userDetails.roleId == 1 || data.userDetails.roleId == 2 ){
                  this.router.navigate(["/admin/dashboard/main"]);
                }
                else if(data.userDetails.roleId == 4){
                  this.router.navigate(["/asset/assetMaster/listAssetMaster"]);
                }
                else if (data.userDetails.roleId == 6) {
                  this.router.navigate(["/payments/initiatePayment/subscription"]);
              }else if(data.userDetails.roleId == 3){
                this.router.navigate(["/audit/scheduledaudits/list-scheduledaudits"]);
              }

              }, 1000);
              }else{
                 this.submitted = false;
                  this.loading = false;
                  this.error = "Invalid Login";
                console.log(data.message);
              }

            } else {
              this.error = "Invalid Login";
            }

      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error);

        }
      );



      // this.subs.sink = this.authService
      //   .login(this.f.username.value, this.f.password.value)
      //   .subscribe(
      //     (res) => {
      //       if (res) {
      //         setTimeout(() => {
      //           const role = this.authService.currentUserValue.role;
      //           if (role === Role.All || role === Role.Admin) {
      //             this.router.navigate(["asset/assetMaster/listAssetMaster"]);
      //           } else if (role === Role.Employee) {
      //             this.router.navigate(["/employee/dashboard"]);
      //           } else if (role === Role.Client) {
      //             this.router.navigate(["/client/dashboard"]);
      //           } else {
      //             this.router.navigate(["/authentication/signin"]);
      //           }
      //           this.loading = false;
      //         }, 1000);
      //       } else {
      //         this.error = "Invalid Login";
      //       }
      //     },
      //     (error) => {
      //       this.error = error;
      //       this.submitted = false;
      //       this.loading = false;
      //     }
      //   );
    }
  }

  forgottenPassword(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: "70%",
      width: "50%",
    });
  }

  loginSuccessUserLog() {

    const obj = {
      userName: this.tokenStorage.getUserId,
      companyid: this.tokenStorage.getCompanyId,

    }
    console.log(obj);
    this.authService.getSuccessuserLog(obj).subscribe((result: any) => {

    });
  }
}
