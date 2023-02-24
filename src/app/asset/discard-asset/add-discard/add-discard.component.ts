import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DiscardAsset } from '../discard-asset-model';
import { DiscardAssetService } from '../discard-asset.service';
import { AssetService } from '../../asset-master/asset.service';
import { threadId } from 'worker_threads';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
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
  selector: 'app-add-discard',
  templateUrl: './add-discard.component.html',
  styleUrls: ['./add-discard.component.sass'],
    // Date Related code
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
export class AddDiscardComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  filePathUrl: string;
  discardAsset : DiscardAsset;
  locationDdList = [];
  moveToDdList = [];
  requestId: any;
  assetId:any;
  edit: boolean = false;
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  moveToLocation: string;
  moveToLocationId: number;
  branchId: any;
  companyId: any;
  discardList:any;


  constructor(private fb: FormBuilder,private cmnService: CommonService, 
    
    public route: ActivatedRoute,
    private assetService: AssetService,private token:TokenStorageService,
    private snackBar: MatSnackBar,  private discardService: DiscardAssetService,
     private httpService: HttpServiceService,private commonService: CommonService,
     private discardAssetService: DiscardAssetService,
     private spinner: NgxSpinnerService,
     private router:Router) { 
    super();
    this.docForm = this.fb.group({
  
      assetId:[""],
      assetCode: [""],
      assetName: [""],
      soldValue:[""],
      purchasePrice:[""],
      priceDifference:[""],
      reason:[""],
      discardDateobj:[""],
      discardDate:[""],
      vendorName:[""],
      others:[""],
      remarks:[""],
      taxGroup:[""],
      uploadFile:[""],
      location:[""],
      moveTo:[""],
      moveToId:[""],
     
  });
  }

  ngOnInit(): void {

    this.branchId= this.token.getBranchId();
    this.companyId= this.token.getCompanyId();

    // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );


   //move to dropdown
   this.httpService.get<any>(this.commonService.getMoveToDropdown+"?companyId="+parseInt(this.companyId)).subscribe({
    next: (data) => {
      this.moveToDdList = data;
    },
    error: (error) => {

    }
  }
  );
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        this.fetchDetails(this.requestId);
        // this.getInLine(event);

      }
    });
    // this.moveToLocation="DISCARDLOCATION";
    // this.moveToLocationId=98;
  }



  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='discardDate'){
      this.docForm.patchValue({discardDateObj:cdate});
    }
    

  };

  onSelectFile(event) {
    var docfile = event.target.files[0];
    if (!this.acceptFileTypes.includes(docfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "bottom",
        "center"
      );
      return;
    }
    if (docfile.size > 5242880) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 5mb",
        "bottom",
        "center"
      );
      return;
    }

    
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "AssetProfileFile");

    this.httpService.post<any>(this.commonService.commonUploadFile, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'uploadFile': data.filePath
            })
            this.filePathUrl = data.filePath;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload File",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "bottom",
          "center"
        );
      }
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit(){
    if(this.docForm.valid){
    this.docForm.value.assetId=this.requestId
    this.docForm.value.moveToId=this.moveToLocationId
    this.discardAsset = this.docForm.value;
    console.log(this.discardAsset);
    // this.discardService.addDiscard(this.discardAsset);
    this.discardService.addDiscard(this.discardAsset).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.onCancel();
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "bottom",
          "center"
        );
      }
    });
    
    // this.showNotification(
    //   "snackbar-success",
    //   "Add Record Successfully...!!!",
    //   "bottom",
    //   "center"
    // );
    // this.router.navigate(['/asset/assetMaster/listAssetMaster']);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please Fill Required Fields",
        "bottom",
        "center"
      );
    }
  }

  onCancel() {
    this.router.navigate(['/asset/assetMaster/listAssetMaster']);
  }

  reset() {
    
      
      this.docForm.patchValue({
        
      
        reason:[""],
        discardDateobj:[""],
        discardDate:[""],
        others:[""],
        moveTo:[""]
      
        
      })
    
  }

  // Edit
  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }

    this.assetService.editAsset(obj).subscribe({
      next: (res: any) => {
        this.discardList =  res.addAssetBean;
        this.docForm.patchValue({
          'assetName': res.addAssetBean.assetName,
          'assetCode': res.addAssetBean.assetCode,
          'soldValue' : res.addAssetBean.captitalizationPrice,
          'location': res.addAssetBean.locationName,
          'purchasePrice': res.addAssetBean.purchasePrice,
          'priceDifference' : res.addAssetBean.priceDifference,
          'vendorName' : res.addAssetBean.vendor,
          
          
        })

        // this.getInLine(res.addAssetBean.isLine);

        if (res.addAssetBean.uploadFiles != undefined && res.addAssetBean.uploadFiles != null && res.addAssetBean.uploadFiles != '') {
          this.filePathUrl = res.addAssetBean.uploadFiles;
        }


        // if (res.detailList != null && res.detailList.length >= 1) {
        //   let detailListArray = this.docForm.controls.assetMasterBean as FormArray;
        //   detailListArray.clear();
        //   res.detailList.forEach(element => {
        //     let detailListArray = this.docForm.controls.assetMasterBean as FormArray;
        //     let arraylen = detailListArray.length;
        //     let newUsergroup: FormGroup = this.fb.group({
        //       assName: [element.assName],
        //       assCode: [element.assCode],
        //       assLocation: [element.assLocation],
        //       assCategory: [element.assCategory],
        //       assStatus: [element.assStatus],
        //     })
        //     detailListArray.insert(arraylen, newUsergroup);
        //   });
        // }
      },
      error: (error) => {

      }
    });
  }

}
