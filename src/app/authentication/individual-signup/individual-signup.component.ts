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
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-individual-signup',
  templateUrl: './individual-signup.component.html',
  styleUrls: ['./individual-signup.component.sass'],

  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
      },
  } },CommonService
  ]
})
export class IndividualSignupComponent implements OnInit {

  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  countryDdList=[];
  hide = true;
  chide = true;
  authentication : Authentication;
  companyId: any;
  minFromDate: Date;
  maxFromDate: Date | null;

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
  ) {

    this.authForm = this.formBuilder.group({
      name: ["", Validators.required],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      telephoneNo:[ "",[Validators.required,  Validators.minLength(10)],],
     // webSite: ['', [Validators.pattern (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i)]], country: ["", Validators.required],
      address:[""],
      //contactPerson:["",Validators.required],
      country: new FormControl('', Validators.required),
      role:[""],
      dob:[""],
      dobObj:[""],
    });
  }
  ngOnInit() {

    const currentYear = moment().year();
    this.minFromDate = new Date(currentYear);
    this.maxFromDate = new Date(currentYear -10, 0, 1);
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

   
 
   get f() {
     return this.authForm.controls;
   }
  


  
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    } else {

    this.authForm.value.role = "7";
    this.authentication = this.authForm.value;
    console.log(this.authentication);

    this.authenticationService.addIndividualSignUp(this.authentication,this.router);

      // this.router.navigate(["/asset/assetMaster/listAssetMaster"]);
    }
  }
  

  getDateString(event,inputFlag,index){

    let currDate=new Date();
    let cdate = this.commonService.getDate(event.target.value);

    if(inputFlag=='dob'){
      if(event.target.value>currDate){
        let s = this.commonService.getDate(currDate);
        this.authForm.patchValue({
          dob:s,
          dobObj:s
        });
        this.showNotification(
          "snackbar-danger",
          "Future date is not allowed!",
          "top",
          "right"
        );
      }
      else {
        this.authForm.patchValue({dob:cdate});
      }
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
