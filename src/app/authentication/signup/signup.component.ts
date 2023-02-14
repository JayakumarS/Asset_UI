import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { Authentication } from "../authentication-model";
import { AuthenticationService } from "../authentication.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private authenticationService : AuthenticationService,
  ) {

    this.authForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      emailId: ["", [Validators.required, Validators.email, Validators.minLength(5)], ],
      telephoneNo:[ "",[Validators.required,  Validators.minLength(5)],],
      website: ["", Validators.required],
      country: ["", Validators.required],
      address:[""],
      contactPerson:["",Validators.required],
      role:[""]
    });
  }
  ngOnInit() {

          // Location dropdown
          this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
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
}
