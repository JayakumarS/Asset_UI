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
import { CategoryMasterService } from '../../category/category.service';
import { serverLocations } from 'src/app/auth/serverLocations';

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
  stateList = [];
  companyId: any;
  CompanyEnployeeList = [];
  dynamicDropDownList1 = [];
  dynamicDropDownList2 = [];
  CountryCodeList=[];
  depreciationlist=[];
  GstFlag:boolean=true;
  private acceptImageTypes = ["image/jpg", "image/png", "image/jpeg"]
  logoPathUrl: any;
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
    private categoryMasterService:CategoryMasterService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private serverUrl:serverLocations) {

    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      shortName: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      phoneCode: [""],
      telephoneNo: ["", [Validators.required]],
      webSite: ["", Validators.pattern('^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$')],
      panNo: ["", Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
      gstNo: ["", Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}')],
      ifscCode: ["", Validators.pattern('[A-Za-z]{4}[0-9]{7}')],
      country: ["", [Validators.required]],
      isactive: [true],
      depreciation:[""],
      // address:["",[Validators.required]],
      // personIncharge:["",[Validators.required]],
      companyId: [""],
      userId: [""],
      noOFdaysMonth:["", Validators.pattern('[0-9]{2}')],
      noOFdaysYear:["", Validators.pattern('[0-9]{3}')],
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
      companyLogo:[""],
      branchCount: [""],
      branchList: this.fb.array([
        this.fb.group({
          branch: [""],
          branchName: [""],
          branchGstNo: ["",Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}')],
          branchCode: [""],
          branchAddress: [""],
          branchCountry: [""],
          branchState: [""],
          branchCity: [""],
          branchZipcode: [""],
          branchPhoneNo: [""],
          gstFlag:[true]
        })
      ]),
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUserId();
    // Country dropdown
    this.companyId=0;
    this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.countryDdList = data;
      },
      error: (error) => {

      }
    }
    );


    // Country Code Dropdown List
    this.httpService.get<any>(this.commonService.getCountryCodeDropdown).subscribe({
      next: (data) => {
        this.CountryCodeList = data;
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

    this.httpService.get<any>(this.categoryMasterService.getAssetDepreciationDropdown+ "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe(
      (data) => {
        this.depreciationlist = data.depreciationlist;
        this.docForm.patchValue({
          'depreciation':52
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    
    );
      
    this.companyId = this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.companyService.getCompanyEnployee + "?companyId=" + this.companyId).subscribe({
      next: (data) => {
        this.CompanyEnployeeList = data;
      },
      error: (error) => {

      }
    }
    );


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
        } else {
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
        'branchCount': res.companyBean.branchCount,
        'isactive': res.companyBean.isactive,

      })
      let BranchListDtlArray = this.docForm.controls.branchList as FormArray;
      BranchListDtlArray.removeAt(0);
      res.branchListDtlBean.forEach((element, index) => {
        let BranchListDtlArray = this.docForm.controls.branchList as FormArray;
        let arraylen = BranchListDtlArray.length;
        this.fetchDynamicDropDown1(element.branchCountry, index);
        this.fetchDynamicDropDown2(element.branchState, index);
        let newUsergroup: FormGroup = this.fb.group({
          branchName: [element.branchName],
          branchAddress: [element.branchAddress],
          branchPhoneNo: [element.branchPhoneNo]
        })
        BranchListDtlArray.insert(arraylen, newUsergroup);

      });
    });
  }

  //// country ,state and city dropdowns /////////////////////
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
  ////////////////////////////////////////////////////////////
  fetchDynamicDropDown1(country, i) {
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.dynamicDropDownList1[i] = res;
    });
  }
  fetchDynamicDropDown2(state, i) {
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.dynamicDropDownList2[i] = res;
    })
  }
  ////////////////////////////////////////////////////////////////
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
  //// country ,state and city dropdowns end ////////////////////////



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

    if ((parseInt(this.docForm.value.branchCount)) > this.docForm.controls.branchList.value.length) {
      for (let i = 0; i < this.docForm.value.branchCount - this.docForm.controls.branchList.value.length; ) {
        if ((parseInt(this.docForm.value.branchCount) - this.docForm.controls.branchList.value.length) <= 10) {
          this.flag = true;
          let branchListDetailArray = this.docForm.controls.branchList as FormArray;
          let arraylen = this.docForm.value.branchCount - this.docForm.controls.branchList.value.length;
          let newUsergroup: FormGroup = this.fb.group({
            branch: [""],
            branchName: [""],
            branchGstNo:[""],
            branchCode: [""],
            branchAddress: [""],
            branchCountry: [""],
            branchState: [""],
            branchCity: [""],
            branchZipcode: [""],
            branchPhoneNo: [""],
            gstFlag:true
          })
          // this.removeRow(i)
          branchListDetailArray.insert(arraylen + 1, newUsergroup);
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


  }

  removeRow(i) {
    let branchListArray = this.docForm.controls.branchList as FormArray;
    branchListArray.removeAt(i);
    this.docForm.patchValue({
      'branchCount':i
    })
  }

  fetchDetails(company: any): void {
    if (this.docForm.value.branchCount == "") {
      this.flag = false;
    }
    const obj = {
      editId: company
    }
    this.spinner.show();
    this.companyService.editCompany(obj).subscribe({
      next: (res: any) => {
        if(res.companyBean.depreciation ==null){
          this.docForm.patchValue({
            'depreciation':52
          });
        }else{
          this.docForm.patchValue({
            'depreciation':res.companyBean.depreciation
          });
        }
        if (res.companyBean.branchCount == null || res.companyBean.branchCount == 0) {
          this.flag = false;
        } else if (res.companyBean.branchCount != null || res.companyBean.branchCount != 0) {
          this.flag = true;
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

          'noOFdaysMonth': res.companyBean.noOFdaysMonth,
          'noOFdaysYear': res.companyBean.noOFdaysYear,

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
          'companyLogo':res.companyBean.companyLogo,
        })

        if (res.companyBean.companyLogo != undefined && res.companyBean.companyLogo != null && res.companyBean.companyLogo != '') {
          this.logoPathUrl = res.companyBean.companyLogo;
        }

        if (res.branchListDtlBean != null && res.branchListDtlBean.length >= 1) {
          let BranchListDtlArray = this.docForm.controls.branchList as FormArray;
          BranchListDtlArray.clear();
        res.branchListDtlBean.forEach((element, index) => {
          let BranchListDtlArray = this.docForm.controls.branchList as FormArray;
          let arraylen = BranchListDtlArray.length;
          this.fetchDynamicDropDown1(element.branchCountry, index);
          this.fetchDynamicDropDown2(element.branchState, index);
         
          let newUsergroup: FormGroup = this.fb.group({
            branch: [element.branch],
            branchName: [element.branchName],
            branchCode: [element.branchCode],
            branchGstNo: [element.branchGstNo],
            branchAddress: [element.branchAddress],
            branchCountry: [element.branchCountry],
            branchState: [element.branchState],
            branchCity: [element.branchCity],
            branchZipcode: [element.branchZipcode],
            branchPhoneNo: [element.branchPhoneNo],
            gstFlag:element.branchCode!=null?false:true

          })
          BranchListDtlArray.insert(arraylen, newUsergroup);

        });
      }
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }

  reset() {
    if (!this.edit) {
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
        companyLogo:[""],
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
            branch:[""],
            branchName:[""],
            branchCode:[""],
            branchAddress:[""],
            branchCountry:[""],
            branchState:[""],
            branchCity:[""],
            branchZipcode:[""],
            branchPhoneNo:[""],
          })
        ]),
      })
    } else {
      this.fetchDetails(this.requestId);
    }
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
      this.companyService.UpdateOrder(this.company, this.router, this.notificationService,this.logoPathUrl);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }

  }


  onCancel() {
    history.back();

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
  keyPressNumeric2(event: any) {
    const pattern = /[0-9 +]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressNumeric3(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressName(event: any) {
    const pattern = /[ a-z A-Z ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  valueValidation(event:any){
    if(parseInt(event) <=31)
    {
      this.docForm.controls['noOFdaysMonth'].setErrors(null);
    }else{
      this.docForm.controls['noOFdaysMonth'].setErrors({month: true});
    }
   
  }

  yearValidation(event:any){
    if(parseInt(event) <=365)
      {
        this.docForm.controls['noOFdaysYear'].setErrors(null);

    }else{
    this.docForm.controls['noOFdaysYear'].setErrors({year: true});
    }
  }

  GSTValidation(data: any) {
    if (data.get('branchGstNo').value != undefined && data.get('branchGstNo').value != null && data.get('branchGstNo').value != '') {
      data.controls.branchGstNo.setValidators(Validators.compose([Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}')]));
    }
    // else {
    //   data.controls.branchGstNo.clearValidators();
    //   data.controls['branchGstNo'].updateValueAndValidity();
    // }
  }

  onSelectFile(event) {
    var docfile = event.target.files[0];
    if (!this.acceptImageTypes.includes(docfile.type)) {
      this.docForm.get('companyLogo').setValue("");
      this.showNotification(
        "snackbar-danger",
        ".jpeg, .jpg, .png only allowed",
        "top",
        "right"
      );
      return;
    }
    if (docfile.size > 5242880) {
      this.docForm.get('companyLogo').setValue("");
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 5mb",
        "top",
        "right"
      );
      return;
    }
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "CompanyLogoImg");

    this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'companyLogo': data.filePath
            })
            this.logoPathUrl = data.filePath;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload File",
            "top",
            "right"
          );
          this.docForm.get('companyLogo').setValue("");
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "top",
          "right"
        );
        this.docForm.get('companyLogo').setValue("");
      }
    });
  }


  viewDocuments(filePath: any, fileName: any) {
    var a = document.createElement("a");
    a.href = this.serverUrl.apiServerAddress + "asset_upload/" + filePath;
    a.target = '_blank';
    a.download = fileName;
    a.click();
  }
}
