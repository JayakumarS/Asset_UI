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
  edit:boolean=false;
  locationList:[];
  employeeList: [];
  assetItemList:[];
  companyList:[];
  showassetDtl=false;
  assetTrackList:[];
  totalCheckedCount = 0;
  chkAll = false;
  constructor(private fb: FormBuilder,
    public assetRequisitionService:AssetRequisitionService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    private commonService: CommonService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,) 
    {
      this.docForm = this.fb.group({
        requisitionNumber:[""],
        requisitionDate:[""],
        requisitionDateObj:[""],
        requestedBy:[""],
        requisitionType:[""],
        sourceLocation:[""],
        destinationLocation:[""],
        requisitionStatus:[""],
        itemId:[""],
        quantity:[""],
        companyId:[""],
        eddDateObj:[""],
        eddDate:[""],
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
                    userId:[""]
          }) 
        ])
          
      });
  }

  ngOnInit(): void {

    

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
    this.edit=true;
    this.fetchDetails(this.requestId) ;

   }
  });

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
    this.httpService.get<any>(this.assetRequisitionService.assetTrackListUrl+"?itemId="+itemId+"&sourceLocation="+this.docForm.get('sourceLocation').value).subscribe(
      (data) => {
        console.log(data);
        if(data.success){
          this.assetTrackList = data.assetTrackList;

          if(data.assetTrackList!=null){
            let DtlArray = this.docForm.controls.assetRequisitionDtl as FormArray;
            DtlArray.removeAt(0);
     
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
                    userId:[element.userId]
                  });
                DtlArray.insert(arraylen,newUsergroup);
              });
            }

          this.showassetDtl  = true;
        }else{
          this.showNotification(
            "snackbar-danger",
            data.errors,
            "top",
            "right"
          );
        }
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}


       

getAssetItemList(id){
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
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='requisitionDate'){
      this.docForm.patchValue({requisitionDate:cdate});
    }else if(inputFlag=='eddDate'){
      this.docForm.patchValue({eddDate:cdate});
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
  }


  update(){
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
        user:[""]
      }) 
    ])
      
  });

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