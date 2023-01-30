import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AssetRequisitionService } from '../asset-requisition.service';
import { AssetRequisition } from '../asset-requisition.model';
import { NotificationService } from 'src/app/core/service/notification.service';
import * as moment from 'moment';
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
  selector: 'app-add-asset-requisition',
  templateUrl: './add-asset-requisition.component.html',
  styleUrls: ['./add-asset-requisition.component.sass'],

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
export class AddAssetRequisitionComponent implements OnInit {

  docForm: FormGroup;
  assetRequisition:AssetRequisition;
  requestId: any;
  requestType:any;
  edit:boolean=false;
  change:boolean=false;
  locationList:[];
  employeeList: [];
  assetItemList:[];
  companyList:[];
  showassetDtl=false;
  assetTrackList:[];
  totalCheckedCount = 0;
  chkAll = false;
  userName: any;
  userId: string;
  branchId: string;
  companyId: string;
  constructor(private fb: FormBuilder,
    public assetRequisitionService:AssetRequisitionService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private token: TokenStorageService,
    public route: ActivatedRoute,) 
    {
      this.docForm = this.fb.group({
        requisitionNumber:[""],
        requisitionDate:[moment().format('DD/MM/YYYY')],
        requisitionDateObj:[moment().format('YYYY-MM-DD')],
        requestedBy:[""],
        requisitionType:[""],
        sourceLocation:[""],
        destinationLocation:[""],
        requisitionStatus:[""],
        itemId:[""],
        quantity:[""],
        companyId:[""],
        branchId:[""],
        eddDateObj:[""],
        eddDate:[""],
        assetRequisitionId:[""],
        assetRequisitionDtl: this.fb.array([
          this.fb.group({
            assetTrackConfirm:[""],
                    assettrackName:[""],
                    assettrackNo:[""],
                    asstDetailId:[""],
                    asstlocation:[""],
                    asstlocationId:[""],
                    resAsset:[""],
                    resAssetId:[""],
                    serialNo:[""],
                    user:[""],
                    userId:[""],
                    ledgerId:[""],
                    assetCategory:[""],
                    assetId:[""]
          }) 
        ])
          
      });
  }

  ngOnInit(): void {

      this.userId = this.token.getUserId();
      this.userName=this.token.getUsername();
      this.branchId= this.token.getBranchId();
      this.companyId= this.token.getCompanyId();
      this.docForm.patchValue({
       'requestedBy':this.userId,
       'branchId':parseInt(this.branchId),
       'companyId':parseInt(this.companyId),
    })

    
  // this.httpService.get<any>(this.commonService.getCompanyByUser + "?user=" + this.userId).subscribe(
  //   (data) => {
  //     this.docForm.patchValue({
  //       'companyId':data
  //    })
  //   },
  //   (error: HttpErrorResponse) => {
  //     console.log(error.name + " " + error.message);
  //   }
  // );

  // Location list dropdown
  this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe(
    (data) => {
      this.locationList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  //Employee dropdown
  this.httpService.get<any>(this.commonService.getEmployeeDropdown).subscribe(
    (data) => {
      console.log(data);
      this.employeeList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  //Company List
  this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe(
    (data) => {
      console.log(data);
      this.companyList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  

  this.route.params.subscribe(params => {
   if(params.id!=undefined && params.id!=0){
    this.requestId = params.id;
    this.docForm.patchValue({
      'assetRequisitionId':this.requestId
   })
    this.edit=true;
    this.requestType = params.type;
    this.fetchDetails(this.requestId,this.requestType) ;

   }
  });

}


fetchDetails(id: any,type:any): void {
  this.httpService.get(this.assetRequisitionService.editUrl+"?assetRequistionId="+id+"&type="+type).subscribe((res: any)=> {
    console.log(res);
    this.getAssetItemList(res.assetRequisition.sourceLocation,'false');
    this.docForm.patchValue({
      
      'requisitionNumber': res.assetRequisition.requisitionNumber,
      'requisitionDateObj': this.commonService.getDateObj(res.assetRequisition.requisitionDate),
      'requisitionDate': res.assetRequisition.requisitionDate,
      'requestedBy': res.assetRequisition.requestedBy,
      'sourceLocation': res.assetRequisition.sourceLocation,
      'destinationLocation': res.assetRequisition.destinationLocation,
      'itemId': res.assetRequisition.itemId,
      'quantity': res.assetRequisition.quantity,
      'companyId':  res.assetRequisition.companyId,
      'eddDateObj':this.commonService.getDateObj(res.assetRequisition.eddDate),
      'eddDate': res.assetRequisition.eddDate
   });
   this.fetchAssetDtlsNew(res.assetRequisition.purchaseRequsitionDetailid);
  //  if(res.manageAuditBean.manageAuditDtlObjBean!=null){
  
     
  //   res.manageAuditBean.manageAuditDtlObjBean.forEach(element => {
  //         let manageAuditDtlArray = this.docForm.controls.manageAuditDtlObjBean as FormArray;
  //         let arraylen = manageAuditDtlArray.length;
  //         let newUsergroup: FormGroup = this.fb.group({
  //           category:[element.category],
  //           location:[element.location],
  //           department:[element.department]
  //       })
  //       manageAuditDtlArray.insert(arraylen,newUsergroup);
  //     });
  //   }

    },
    (err: HttpErrorResponse) => {
      this.showNotification(
        "snackbar-danger",
        "Error while getting information !",
        "top",
        "right"
      );
    }
  );
}

fetchAssetDtlsNew(id){
  this.httpService.get<any>(this.assetRequisitionService.assetTrackListUrlNew+"?detailId="+id).subscribe(
    (data) => {
      if(data.assetTrackList!=null){
        let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
        DtlArray.removeAt(0);
        DtlArray.clear();
        this.showassetDtl=true;
        data.assetTrackList.forEach(element => {
              let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
              let arraylen = DtlArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                assetTrackConfirm:[element.assetTrackConfirm],
                assettrackName:[element.assettrackName],
                assettrackNo:[element.assettrackNo],
                asstDetailId:[element.asstDetailId],
                asstlocation:[element.asstlocation],
                asstlocationId:[element.asstlocationId],
                resAsset:[element.resAsset],
                resAssetId:[element.resAssetId],
                serialNo:[element.serialNo],
                user:[element.user],
                userId:[element.userId],
                ledgerId:[element.ledgerId],
                assetCategory:[element.assetCategory],
                assetId:[element.assetId],
              });
            DtlArray.insert(arraylen,newUsergroup);
          });
        } else {
          let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
          DtlArray.removeAt(0);
          DtlArray.clear();
        }
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  )
}


fetchAssetDtls(itemId){
  
  if(this.docForm.get('sourceLocation').value ==""){
    this.showNotification(
      "snackbar-danger",
      "Please Select Source Location",
      "top",
      "right"
    );
  }else{
    this.httpService.get<any>(this.assetRequisitionService.assetTrackListUrl+"?itemId="+itemId+"&sourceLocation="+this.docForm.get('sourceLocation').value+"&companyId="+parseInt(this.companyId)).subscribe(
      (data) => {
        console.log(data);
        if(data.success){
          this.assetTrackList = data.assetTrackList;
         
          this.docForm.controls.assetRequisitionDtl.reset;
          if(data.assetTrackList!=null){
            let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
            DtlArray.removeAt(0);
            DtlArray.clear();
            
            data.assetTrackList.forEach(element => {
                  let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
                  let arraylen = DtlArray.length;
                  let newUsergroup: FormGroup = this.fb.group({
                    assetTrackConfirm:[element.assetTrackConfirm],
                    assettrackName:[element.assettrackName],
                    assettrackNo:[element.assettrackNo],
                    asstDetailId:[element.asstDetailId],
                    asstlocation:[element.asstlocation],
                    asstlocationId:[element.asstlocationId],
                    resAsset:[element.resAsset],
                    resAssetId:[element.resAssetId],
                    serialNo:[element.serialNo],
                    user:[element.user],
                    userId:[element.userId],
                    ledgerId:[element.ledgerId],
                    assetCategory:[element.assetCategory],
                    assetId:[element.assetId],
                  });
                DtlArray.insert(arraylen,newUsergroup);
              });
            } else {
            let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
            DtlArray.removeAt(0);
            DtlArray.clear();
            }

          this.showassetDtl  = true;
        } else {
          let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
            DtlArray.removeAt(0);
            DtlArray.clear();
        }
        // else{
        //   this.showNotification(
        //     "snackbar-danger",
        //     data.errors,
        //     "top",
        //     "right"
        //   );
        // }
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}


       

getAssetItemList(id,selected){
  this.change=true;
  if(this.docForm.get('sourceLocation').value!="" && this.docForm.get('destinationLocation').value!=""){
    if(this.docForm.get('sourceLocation').value == this.docForm.get('destinationLocation').value){
      this.showNotification(
        "snackbar-danger",
        "Source Location and Destination Location Should not be Same!",
        "top",
        "right"
      );
      this.showassetDtl  = false;
      this.docForm.get('destinationLocation').setValue('');

    }else{
      this.httpService.get<any>(this.assetRequisitionService.assetListUrl+"?id="+id).subscribe(
        (data) => {
          console.log(data);
          this.assetItemList = data.assetItemList;
          if(selected=='true'){
            this.fetchAssetDtls(0);
          }
       
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }
  }else{
    this.httpService.get<any>(this.assetRequisitionService.assetListUrl+"?id="+id).subscribe(
      (data) => {
        console.log(data);
        this.assetItemList = data.assetItemList;
        if(selected=='true'){
          this.fetchAssetDtls(0);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  
  
}

validationLocations(id){
  if(this.docForm.get('sourceLocation').value!="" && id ){
    if(this.docForm.get('sourceLocation').value == id){
      this.showNotification(
        "snackbar-danger",
        "Source Location and Destination Location Should not be Same!",
        "top",
        "right"
      );

      this.docForm.get('destinationLocation').setValue('');

    }
  }
} 
  onSubmit(){

  if(this.docForm.valid){
    if(parseInt(this.docForm.get('quantity').value)>0){
      if(parseInt(this.docForm.get('quantity').value) === this.totalCheckedCount){
        this.assetRequisitionService.save(this.docForm.value,this.router,this.notificationService);
      }else{
        this.showNotification(
          "snackbar-danger",
          "Check Fields Must equal to Quantity!",
          "top",
          "right"
        );
      }
      
    }else{
      this.showNotification(
        "snackbar-danger",
        "Quantity Cannot be zero!",
        "top",
        "right"
      );
    }
    
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

    let currDate=new Date();
    let cdate = this.cmnService.getDate(event.target.value);

    if(inputFlag=='requisitionDate'){
      this.docForm.patchValue({requisitionDate:cdate});
    }else if(inputFlag=='eddDate'){
      if(event.target.value<currDate){
        let s = this.cmnService.getDate(currDate);
        this.docForm.patchValue({
          eddDate:s,
          eddDateObj:s
        });
        this.showNotification(
          "snackbar-danger",
          "Please select future date!",
          "top",
          "right"
        );
      }
      else {
        this.docForm.patchValue({eddDate:cdate});
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


  update(){

    if(this.docForm.valid){
      if(parseInt(this.docForm.get('quantity').value)>0){
        if(parseInt(this.docForm.get('quantity').value) === this.totalCheckedCount){
          this.assetRequisitionService.update(this.docForm.value,this.router,this.notificationService);
        }else{
          this.showNotification(
            "snackbar-danger",
            "Check Fields Must equal to Quantity!",
            "top",
            "right"
          );
        }
        
      }else{
        this.showNotification(
          "snackbar-danger",
          "Quantity Cannot be zero!",
          "top",
          "right"
        );
      }
      
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

  onCancel(){
    this.router.navigate(['/asset/assetRequisition/listAssetRequisition']);
   }

   reset(){
    this.docForm = this.fb.group({
    requisitionNumber:[""],
    requisitionDate:[""],
    requestedBy:[""],
    requisitionType:[""],
    sourceLocation:[""],
    destinationLocation:[""],
    requisitionStatus:[""],
    itemId:[""],
    quantity:[""],
    companyId:[""],
    branchId:[""],
    eddDateObj:[""],
    eddDate:[""],
    assetRequisitionDtl: this.fb.array([
      this.fb.group({
        assetDetailId:[""],
        assettrackNo:["", [Validators.required]],
        assettrackName:[""],
        serialNo:[""],
        asstlocation:[""],
        resAsset:[""],
        user:[""],
        ledgerId:[""],
        assetCategory:[""]
      }) 
    ])
      
  });

  this.docForm.patchValue({
    'requestedBy':this.userId,
    'branchId':parseInt(this.branchId),
    'companyId':parseInt(this.companyId),
 })

}


 onCount(assetTrackConfirm,obj){
    if (assetTrackConfirm) {
      this.totalCheckedCount++;
      this.docForm.patchValue({'quantity':  this.totalCheckedCount  });
  } else if (!assetTrackConfirm) {
    this.totalCheckedCount--;
      this.docForm.patchValue({'quantity':  this.totalCheckedCount  });
  }
}


        checkAll (event,collection) {
          const checked = event.target.checked;
          var i=0;
          let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
          if (checked) {
                collection.forEach(element => {
                  DtlArray.at(i).patchValue({assetTrackConfirm:true});
                  i++;
              });
              this.totalCheckedCount = i;
              this.docForm.patchValue({'quantity':  i });
            } else {
              collection.forEach(element => {
                DtlArray.at(i).patchValue({assetTrackConfirm:false});
                i++;
              });
              this.totalCheckedCount = 0;
              this.docForm.patchValue({'quantity':  0  });
            }
            

        }
  
}
