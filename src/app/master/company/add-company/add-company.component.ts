import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Company } from '../company-model';
import { CompanyService } from '../company.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DepartmentMasterService } from '../../department-master/department-master.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserMasterService } from '../../user-master/user-master.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.sass']
})
export class AddCompanyComponent implements OnInit {
  docForm: FormGroup;
  company: Company;
  countryDdList = [];
  userDdList = [];
  requestId: any;
  edit: boolean = false;
  userId: any;
  flag: boolean = false;
  countrybasedStateList = [];
  countrybasedStateList1 = [];
  stateBasedCityList = [];
  stateBasedCityList1 = [];
  countrybasedStateList2 = [];

  constructor(private fb: FormBuilder,
    private companyService: CompanyService,
    private departmentMasterService: DepartmentMasterService,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    private userMasterService: UserMasterService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) {

    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      shortName: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      phoneCode: [""],
      telephoneNo: ["", [Validators.required]],
      webSite: [""],
      panNo: [""],
      gstNo: [""],
      ifscCode: [""],
      country: ["", [Validators.required]],
      isactive: [true],
      //address:["",[Validators.required]],
      // personIncharge:["",[Validators.required]],
      companyId: [""],
      userId: [""],

      addressOne: [""],
      addressOneCountry: [""],
      addressOneState: [""],
      addressOneCity: [""],
      addressOneZipCode: [""],

      addressTwo: [""],
      addressTwoCountry: [""],
      addressTwoState: [""],
      addressTwoCity: [""],
      addressTwoZipCode: [""],

      branchCount: [""],
      branchList: this.fb.array([
        this.fb.group({
          branch: '',
          branchName: '',
          branchCode: '',
          branchAddress: '',
          branchCountry: '',
          branchState: '',
          branchCity: '',
          branchZipcode: '',
          branchPhoneNo: '',
        })
      ]),
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUserId();

    // Country dropdown
    this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
      next: (data) => {
        this.countryDdList = data;
      },
      error: (error) => {

      }
    }
    );

    // Contact Person dropdown
    //  this.httpService.get<any>(this.commonService.getpersoninchargeDropdown).subscribe({
    //   next: (data) => {
    //     this.userDdList = data;
    //   },
    //   error: (error) => {

    //   }
    // }
    // );

    this.httpService.get<any>(this.companyService.userBasedCompanyDDList + "?userId=" + this.userId).subscribe(
      (data) => {
        this.userDdList = data.getuserBasedCompanyDDList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = parseInt(params.id);
        this.edit = true;
        if (window.sessionStorage.getItem("findFrom") == 'Opened') {
          this.edit = true;
          this.fetchCompanyDetails(this.requestId);
          this.fetchDetails(this.requestId);
          window.sessionStorage.setItem("findFrom", "");
        }else{
        // For Editable mode
        this.fetchDetails(this.requestId);
        
      }
    }
    });

  }

  fetchCompanyDetails(userId: any): void {
    this.httpService.get(this.companyService.fetchCompanyList + "?userId=" + userId).subscribe((res: any) => {
      console.log(res);
      this.docForm.patchValue({
        'companyName': res.companyBean.companyName,
        'shortName': res.companyBean.shortName,
        'emailId': res.companyBean.emailId,
        'telephoneNo': res.companyBean.telephoneNo,
        'webSite': res.companyBean.webSite,

      })
    });
  }

  //// country ,state and city dropdowns 
  fetchCountryBasedState(country: any): void {
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList = res;
    })
  }
  fetchCountryBasedState1(country: any): void {
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList1 = res;
    })
  }
  fetchCountryBasedState2(country: any): void {
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList2 = res;
    })
  }

  stateBasedCity(state: any) {
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.stateBasedCityList = res;
    })
  }
  stateBasedCity1(state: any) {
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.stateBasedCityList1 = res;
    })
  }
  //// country ,state and city dropdowns end 

  // onSubmit(){
  //   if(this.docForm.valid){
  //   this.docForm.value.userId = this.tokenStorage.getUserId();
  //   this.company = this.docForm.value;
  //   console.log(this.company);
  //   this.companyService.addCompany(this.company,this.router);
  //     this.showNotification(
  //       "snackbar-success",
  //       "Add Record Successfully...!!!",
  //       "bottom",
  //       "center"
  //     );
  //   }else{
  //     this.showNotification(
  //       "snackbar-danger",
  //       "Not Added!!!",
  //       "bottom",
  //       "center"
  //     );
  //   }
  // }
  onSubmit() {
    if (this.docForm.valid) {
      this.docForm.value.userId = this.tokenStorage.getUserId();
      this.company = this.docForm.value;
      this.companyService.addCompany(this.company, this.router, this.notificationService);
    }
    else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  addBranch() {
    for (let i = 0; i < this.docForm.value.branchCount; i++) {
      if (parseInt(this.docForm.value.branchCount) <= 10) {
        this.flag = true;
        let branchListDetailArray = this.docForm.controls.branchList as FormArray;
        let arraylen = this.docForm.value.branchCount;
        let newUsergroup: FormGroup = this.fb.group({
          branch: '',
          branchName: '',
          branchCode: '',
          branchAddress: '',
          branchCountry: '',
          branchState: '',
          branchCity: '',
          branchZipcode: '',
          branchPhoneNo: '',
        })
        this.removeRow(i)
        branchListDetailArray.insert(arraylen, newUsergroup);
      } else {
        this.showNotification(
          "snackbar-danger",
          "PLEASE ADD BRANCH BELOW 10...!!!",
          "bottom",
          "center"
        );
      }
    }
  }

  removeRow(i) {
    let branchListArray = this.docForm.controls.branchList as FormArray;
    branchListArray.removeAt(i);
  }

  fetchDetails(company: any): void {
    if(this.docForm.value.branchCount ==""){
      this.flag=false;
    }

    const obj = {
      editId: company
    }
    this.spinner.show();
    this.companyService.editCompany(obj).subscribe({
      next: (res: any) => {
        if( res.companyBean.branchCount ==null|| res.companyBean.branchCount==0){
          this.flag=false;
        }else if(res.companyBean.branchCount !=null||res.companyBean.branchCount!=0){
          this.flag=true;
        }
        this.fetchCountryBasedState(res.companyBean.addressOneCountry);
        this.fetchCountryBasedState1(res.companyBean.addressTwoCountry);
        this.stateBasedCity(res.companyBean.addressOneState);
        this.stateBasedCity1(res.companyBean.addressTwoState);
        
        this.spinner.hide();
        this.docForm.patchValue({
          'companyId': res.companyBean.companyId,
          'companyName': res.companyBean.companyName,
          'shortName': res.companyBean.shortName,
          'emailId': res.companyBean.emailId,
          'phoneCode': res.companyBean.phoneCode,
          'telephoneNo': res.companyBean.telephoneNo,
          'webSite': res.companyBean.webSite,
          'panNo': res.companyBean.panNo,
          'gstNo': res.companyBean.gstNo,
          'ifscCode': res.companyBean.ifscCode,
          'country': res.companyBean.country,
          'isactive': res.companyBean.isactive,

          'addressOne': res.companyBean.addressOne,
          'addressOneCountry': res.companyBean.addressOneCountry,
          'addressOneState': res.companyBean.addressOneState,
          'addressOneCity': res.companyBean.addressOneCity,
          'addressOneZipCode': res.companyBean.addressOneZipCode,

          'addressTwo': res.companyBean.addressTwo,
          'addressTwoCountry': res.companyBean.addressTwoCountry,
          'addressTwoState': res.companyBean.addressTwoState,
          'addressTwoCity': res.companyBean.addressTwoCity,
          'addressTwoZipCode': res.companyBean.addressTwoZipCode,
          'branchCount': res.companyBean.branchCount,

        })
        let BranchListDtlArray = this.docForm.controls.branchList as FormArray;
        BranchListDtlArray.removeAt(0);
        res.branchListDtlBean.forEach(element => {
          let BranchListDtlArray = this.docForm.controls.branchList as FormArray;
          let arraylen = BranchListDtlArray.length;
          this.fetchCountryBasedState2(element. branchCountry);
          let newUsergroup: FormGroup = this.fb.group({
            branch: [element.branch],
            branchName: [element.branchName],
            branchCode: [element.branchCode],
            branchAddress: [element.branchAddress],
            branchCountry: [element.branchCountry],
            branchState: [element.branchState],
            branchCity: [element.branchCity],
            branchZipcode: [element.branchZipcode],
            branchPhoneNo: [element.branchPhoneNo]


          })
          BranchListDtlArray.insert(arraylen, newUsergroup);

        });
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }

  reset() {
    //location.reload()
    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      shortName: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      phoneCode: [""],
      telephoneNo: ["", [Validators.required]],
      webSite: [""],
      panNo: [""],
      gstNo: [""],
      ifscCode: [""],
      country: ["", [Validators.required]],
      isactive: [true],
      companyId: [""],
      userId: [""],

      addressOne: [""],
      addressOneCountry: [""],
      addressOneState: [""],
      addressOneCity: [""],
      addressOneZipCode: [""],

      addressTwo: [""],
      addressTwoCountry: [""],
      addressTwoState: [""],
      addressTwoCity: [""],
      addressTwoZipCode: [""],
      branchCount: [""],
        branchList: this.fb.array([
          this.fb.group({
            branch: '',
            branchName: '',
            branchCode: '',
            branchAddress: '',
            branchCountry: '',
            branchState: '',
            branchCity: '',
            branchZipcode: '',
            branchPhoneNo: '',
          })
        ]),
      })
    
  }

  // validateEmail(event){
  //   this.httpService.get<any>(this.companyService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
  //     if (res){
  //       this.docForm.controls['emailId'].setErrors({ employee: true });
  //     }else{
  //      // this.docForm.controls['emailId'].setErrors(null);
  //     }
  //   });
  // }



  update() {
    if (this.docForm.valid) {
      this.company = this.docForm.value;
      this.companyService.UpdateOrder(this.company, this.router, this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }

  }


  onCancel() {
    this.router.navigate(['/master/company/listCompany']);

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // validateCompanyName(event) {
  //   if (event != undefined && event != null && event != "") {
  //     this.httpService.get<any>(this.companyService.uniqueValidateUrl + "?tableName=" + "company" + "&columnName=" + "company_name" + "&columnValue=" + event).subscribe((res: any) => {
  //       if (res) {
  //         this.docForm.controls['companyName'].setErrors({ company: true });
  //       } else {
  //         this.docForm.controls['companyName'].setErrors(null);
  //       }
  //     });
  //   }
  // }

  keyPressNumeric1(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
