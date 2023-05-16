import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MutualFundService } from '../../mutualfund/mutualfund.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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
  selector: 'app-individual-information',
  templateUrl: './individual-information.component.html',
  styleUrls: ['./individual-information.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class IndividualInformationComponent implements OnInit {
  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  userId:any;
  submitted: boolean;
  countryList=[];
  stateList=[];
  cityList=[];
  
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
   
    private cmnService:CommonService,private httpService: HttpServiceService,
    private notificationService: NotificationService,
    private mutualFundService: MutualFundService,
    private router:Router,public route: ActivatedRoute, private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,)
     {   
       this.docForm = this.fb.group({
       name:[""],
       email: [''],
       dob:[""],
       dobObj:[""],
       mobileNumber:[""],
       address:[""],
       country:[""],
       state:[""],
       city:[""],
       bloodGroup:[""],
       idNumber:[""],
       passportNumber:["",[Validators.required]],
       panNumber: ["",Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
       licenseNo:["",[Validators.required]],
       company:[""],
       companyAddress:[""],
       telephone:[""],
       fax:[""],
       mobile:[""],
       companyEmail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
       website: ["", Validators.pattern('^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$')],
      })
  }
  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    
      if(inputFlag=='premiumDueDate'){
        this.docForm.patchValue({premiumDueDate:cdate});
      } 
      if(inputFlag=='maturityDate'){
        this.docForm.patchValue({maturityDate:cdate});
      } 
      if(inputFlag=='nextPremiumDate'){
        this.docForm.patchValue({nextPremiumDate:cdate});
      } 
      if(inputFlag=='dob'){
        this.docForm.patchValue({dob:cdate});
      }
    
    // if (inputFlag == 'inceptiondate') {
    //   this.docForm.patchValue({inceptiondate: cdate });
    // }
    //   let sampleDtl = this.docForm.controls.sampleDtl as FormArray;
    //   sampleDtl.at(index).patchValue({
    //     inceptiondate: cdate});
      
    }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });

  
     this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+ this.tokenStorage.getCompanyId()).subscribe((res: any) => {
      this.countryList = res;
    });

    this.httpService.get<any>(this.mutualFundService.getProfileDetails+"?userId="+ this.tokenStorage.getUsername()).subscribe((res: any) => {
     
     if(res.country != null){
      this.fetchCountryBasedState(res.country); 
     }
     if(res.state != null){
     this.stateBasedCity(res.state);
     }
      this.docForm.patchValue({
          'name': res.name,
          'email': res.email,
          'dob':res.dob,
          'dobObj': res.dob != null ? this.commonService.getDateObj(res.dob) : "",
          'mobileNumber':res.mobileNumber,
          'address':res.address,
          'country':res.country != null ? parseInt(res.country) : "",
          'state':res.state != null ? parseInt(res.state) : "",
          'city':res.city != null ? parseInt(res.city) : "",
          'bloodGroup':res.bloodGroup,
          'idNumber':res.idNumber,
          'passportNumber':res.passportNumber,
          'panNumber':res.panNumber,
          'licenseNo':res.licenseNo,
          'company':res.company,
          'companyAddress':res.companyAddress,
          'telephone':res.telephone,
          'fax':res.fax,
          'mobile':res.mobile,
          'companyEmail':res.companyEmail,
          'website':res.website,
      })
    });

  }

  fetchCountryBasedState(country: any){
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.stateList = res;
    })
  }
  stateBasedCity(state:any){
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.cityList = res;
  })
}
 
  onSubmit(){
    this.submitted = true;
 
     if(this.docForm.valid){ 
       this.mutualFundService.saveProfile(this.docForm.value,this.router,this.notificationService);
     } else {
       this.notificationService.showNotification(
         "snackbar-danger",
         "Please fill all the required details!",
         "top",
         "right");
     }
 
   }

  fetchDetails(fundNo: any) {
    const obj = {
      editId: fundNo
    };
    this.mutualFundService.editfund(obj).subscribe({
      next: (res) => {
         this.docForm.patchValue({
        'fundNo':res.fundBean.fundNo,
          'name': res.fundBean.name,
          'email': res.fundBean.email,
          'dob':res.fundBean.dob,
          'dobObj': res.fundBean.dob != null ? this.commonService.getDateObj(res.fundBean.dob) : "",
          'mobileNumber':res.fundBean.mobileNumber,
          'address':res.fundBean.address,
          'country':res.fundBean.country,
          'state':res.fundBean.state,
          'city':res.fundBean.city,
          'bloodGroup':res.fundBean.bloodGroup,
          'idNumber':res.fundBean.idNumber,
          'passportNumber':res.fundBean.passportNumber,
          'panNumber':res.fundBean.panNumber,
          'licenseNo':res.fundBean.licenseNo,
          'company':res.fundBean.company,
          'companyAddress':res.fundBean.companyAddress,
          'telephone':res.fundBean.telephone,
          'fax':res.fundBean.fax,
          'mobile':res.fundBean.mobile,
          'companyEmail':res.fundBean.companyEmail,
          'website':res.fundBean.website,
      });
      
    },
    error: (error) => {
    }
  });
  }

  

  update(){
    
    if(this.docForm.valid){
      this.spinner.show();
      this.mutualFundService.updatefund(this.docForm.value,this.router,this.notificationService);
    } 
    else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  reset(){
    if (!this.edit) {
      this.docForm.reset();
      location.reload();
      this.docForm = this.fb.group({
       name:[""],
       email: [""],
       dob:[""],
       dobObj:[""],
       mobileNumber:[""],
       address:[""],
       country:[""],
       state:[""],
       city:[""],
       bloodGroup:[""],
       idNumber:[""],
       passportNumber:[""],
       panNumber:[""],
       licenseNo:[""],
       company:[""],
       companyAddress:[""],
       telephone:[""],
       fax:[""],
       mobile:[""],
       companyEmail:[""],
       website:[""],
    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }
onCancel(){

  if(window.sessionStorage.getItem("mutualFrom")=="mutual"){
    window.sessionStorage.setItem("mutualFrom","");
    this.router.navigate(['/master/multiple/allMaster/0']);
  }else if(window.sessionStorage.getItem("mutualFrom")=="normal"){
    window.sessionStorage.setItem("mutualFrom","");
    this.router.navigate(['/master/mutualfund/list-fund']);
  } else {
    this.router.navigate(['/master/mutualfund/list-fund']);
  }
}

keyPressNumber(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressString(event: any){
  const pattern = /[A-Z,a-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressNumeric(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

keyPressName(event: any) {
  const pattern = /[ a-z A-Z,0-9 ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}
