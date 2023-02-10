import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuditableAssetResultBean } from '../auditable-asset-result-bean';
import { AuditableAssetService } from '../auditable-asset.service';
import { AuditableAsset } from '../auditable-asset-model';
import { NotificationService } from 'src/app/core/service/notification.service';
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
  selector: 'app-add-auditable-asset',
  templateUrl: './add-auditable-asset.component.html',
  styleUrls: ['./add-auditable-asset.component.sass'],
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
export class AddAuditableAssetComponent implements OnInit {
  docForm: FormGroup;
  auditableAsset:AuditableAsset;
  requestId: any;
  edit:boolean=false;
  assetFlag:boolean=false;
  assetList:[];
  currencyList: [];
  assetTypeList:[];
  depreciationMethodList:[];
  companyId: string;
  branchId: string;

  constructor(private fb: FormBuilder,
    public auditableAssetService:AuditableAssetService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    private commonService: CommonService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,
    private tokenStorage:TokenStorageService) 
    {
    this.docForm = this.fb.group({
      assetid:[""],
      assetname:[""],
      currency:[""],
      lifeInYears:[""],
      value:[""],
      salvageValue:[""],
      assetType:[""],
      depreciationMethod:[""],

      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    });
  }

  ngOnInit(): void {

    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }

  this.docForm = this.fb.group({
    assetid:["",[Validators.required]],
    assetname:[""],
    currency:["",[Validators.required]],
    lifeInYears:["",[Validators.required]],
    value:["",[Validators.required]],
    salvageValue:["",[Validators.required]],
    assetType:["",[Validators.required]],
    depreciationMethod:["",[Validators.required]],
    loginedUser: this.tokenStorage.getUserId(),
    companyId: this.tokenStorage.getCompanyId(),
    branchId: this.tokenStorage.getBranchId(),
  });

  // console.log(this.dfdfd.getUserId());
  console.log(this.tokenStorage.getUserId());
  // Currency list dropdown
  this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.assetListUrl).subscribe(
    (data) => {
      this.assetList = data.assetList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // Asset Type list dropdown
  this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.assetTypeListUrl).subscribe(
    (data) => {
      this.assetTypeList = data.assetTypeList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // Depreciation Method list dropdown
  this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.depreciationMethodUrl).subscribe(
    (data) => {
      this.depreciationMethodList = data.depreciationMethodList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  //Currency  Dropdown List
  this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.currencyListUrl).subscribe(
    (data) => {
      this.currencyList = data.currencyList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );
  
  this.route.params.subscribe(params => {
   if(params.id!=undefined && params.id!=0){
    this.requestId = params.id;
    this.edit=true;
    this.fetchDetails(this.requestId) ;

   }
  });

}

fetchAssetName(asset:any){

    this.httpService.get<any>(this.auditableAssetService.validateAssetIdUrl+ "?tableName=" +"asset_depreciation"+"&columnName="+"asset_id"+"&columnValue="+asset).subscribe((res: any) => {
      if(res){
        this.docForm.controls['assetid'].setErrors({ country: true });
        this.assetFlag = false;
      }else{
        this.docForm.controls['assetid'].setErrors(null);
        this.assetFlag = true;
      }
    });
  
    // if(this.assetFlag == true){
      this.httpService.get(this.auditableAssetService.fetchAssetNameUrl + "?asset=" + asset).subscribe((res: any) => {
        console.log(asset);
  
        console.log(res.getAssetName.assetname);
  
        this.docForm.patchValue({
          'assetname': res.getAssetName.assetname
       })
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
    // }

}

  onSubmit(){

  if(this.docForm.valid){
    this.auditableAsset = this.docForm.value;
    console.log(this.auditableAsset);
    this.auditableAssetService.addAuditableAsset(this.auditableAsset,this.router,this.notificationService);
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right"
    );
  }

  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
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

  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  valueValidation(event:any){
    if(parseInt(event) > parseInt(this.docForm.get("value").value)){
      this.docForm.controls['salvageValue'].setErrors({ country: true });
    }else{
      this.docForm.controls['salvageValue'].setErrors(null);
    }
  }

  salvageValueValidation(event:any){
    if(parseInt(event) < parseInt(this.docForm.get("salvageValue").value)){
      this.docForm.controls['salvageValue'].setErrors({ country: true });
    }else{
      this.docForm.controls['salvageValue'].setErrors(null);
    }
  }

  fetchDetails(id: any): void {

    this.httpService.get(this.auditableAssetService.editAuditableAsset+"?asset="+id).subscribe((res: any)=> {
      console.log(id);
      
      this.docForm.patchValue({
        
        'assetid': res.auditableAssetBean.assetid,
        'currency': res.auditableAssetBean.currency,
        'assetname' : res.auditableAssetBean.assetname,
        'lifeInYears': res.auditableAssetBean.lifeInYears,
        'value' : res.auditableAssetBean.value,
        'salvageValue' : res.auditableAssetBean.salvageValue,
        'assetType' : res.auditableAssetBean.assetType,
        'depreciationMethod' : res.auditableAssetBean.depreciationMethod,
        'companyId': this.tokenStorage.getCompanyId(),
        'branchId': this.tokenStorage.getBranchId(),
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

  }


  update(){

    this.auditableAsset = this.docForm.value;
    this.auditableAssetService.auditableUpdate(this.auditableAsset,this.router,this.notificationService);

  }

  onCancel(){
    this.router.navigate(['/audit/auditableAsset/listAuditableAsset']);
   }

   reset(){
    this.docForm = this.fb.group({
    assetid:[""],
    assetname:[""],
    currency:[""],
    lifeInYears:[""],
    value:[""],
    salvageValue:[""],
    assetType:[""],
    depreciationMethod:[""],
    'companyId': this.tokenStorage.getCompanyId(),
    'branchId': this.tokenStorage.getBranchId(),
  });}
  

  
}
