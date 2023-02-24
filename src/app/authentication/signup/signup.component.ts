import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { Authentication } from "../authentication-model";
import { AuthenticationService } from "../authentication.service";
import { CompanyService } from "src/app/master/company/company.service";
import { UserMasterService } from "src/app/master/user-master/user-master.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  countryDdList=[];
  hide = true;
  chide = true;
  authentication : Authentication;
  companyId: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private authenticationService : AuthenticationService,
    private companyService : CompanyService,
    private userMasterService: UserMasterService,
  ) {

    this.authForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      telephoneNo:[ "",[Validators.required,  Validators.minLength(5)],],
      webSite: ['', [
        Validators.required,
        Validators.pattern (/^https?:\/\/.+$/)
      ]],
      country: ["", Validators.required],
      address:[""],
      contactPerson:["",Validators.required],
      role:[""]
    });
  }
  ngOnInit() {

          // Location dropdown
          this.companyId=0;
          this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+this.companyId).subscribe({
            next: (data) => {
              this.countryDdList = data;
            },
            error: (error) => {

            }
          }
          );

    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {

    this.authForm.value.role = "2";
    this.authentication = this.authForm.value;
    console.log(this.authentication);

    this.authenticationService.addCompanySignUp(this.authentication,this.router);

      // this.router.navigate(["/asset/assetMaster/listAssetMaster"]);
    }
  }

  // validateCompanyName(event) {
  //   if (event != undefined && event != null && event != "") {
  //     this.httpService.get<any>(this.companyService.uniqueValidateUrl + "?tableName=" + "company" + "&columnName=" + "company_name" + "&columnValue=" + event).subscribe((res: any) => {
  //       if (res) {
  //         this.authForm.controls['companyName'].setErrors({ company: true });
  //       } else {
  //         this.authForm.controls['companyName'].setErrors(null);
  //       }
  //     });
  //   }
  // }

  validateCompanyName(event) {
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.companyService.uniqueValidateUrl + "?companyName=" + event).subscribe((res: any) => {
        if (res.validateCompany) {
          this.authForm.controls['companyName'].setErrors({ company: true });
        } else {
          this.authForm.controls['companyName'].setErrors(null);
        }
      });
    }
  }

  validateEmail(event) {
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.companyService.uniqueValidateEmail + "?emailId=" + event).subscribe((res: any) => {
        if (res.validateEmail) {
          this.authForm.controls['emailId'].setErrors({ emailId: true });
        } else {
          this.authForm.controls['emailId'].setErrors(null);
        }
      });
    }
  }

  // validateEmail(event){
  //   this.httpService.get<any>(this.userMasterService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
  //     if (res){
  //       this.authForm.controls['emailId'].setErrors({ employee: true });
  //     }else{
  //      // this.docForm.controls['emailId'].setErrors(null);
  //     }
  //   });
  // }

  keyPressNumeric1(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z,' ']/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  
}
