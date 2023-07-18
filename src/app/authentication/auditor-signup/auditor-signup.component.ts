import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Authentication } from '../authentication-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { CompanyService } from 'src/app/master/company/company.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';




@Component({
  selector: 'app-auditor-signup',
  templateUrl: './auditor-signup.component.html',
  styleUrls: ['./auditor-signup.component.sass'],
 
})

export class AuditorSignupComponent implements OnInit {

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
    private snackBar:MatSnackBar,
    private token:TokenStorageService,

  ) {

    this.authForm = this.formBuilder.group({
      name: ["", Validators.required],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      telephoneNo:[ "",[Validators.required,  Validators.minLength(5)],],
     // webSite: ['', [Validators.pattern (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i)]], country: ["", Validators.required],
      address:[""],
      //contactPerson:["",Validators.required],
      country: new FormControl('', Validators.required),
      role:[""],
      company:['201']
    });
  }
  ngOnInit(): void {
    this.companyId=0;
    this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.countryDdList = data;
      },
      error: (error) => {
      }
    }
    );
  }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    } else {

    this.authForm.value.role = "3";
    this.authentication = this.authForm.value;
    console.log(this.authentication);

    this.authenticationService.addAuditorSignUp(this.authentication,this.router);

      // this.router.navigate(["/asset/assetMaster/listAssetMaster"]);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  

  validateEmail(event) {
    if (event != undefined && event != null && event != "") {
      
      this.httpService.get<any>(this.companyService.uniqueValidateEmail + "?emailId=" + event).subscribe((res: any) => {
        if (res.validateEmail) {
          this.authForm.controls['emailId'].setErrors({ emailId: true });
        }
      });
    }
  }

  

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
 

