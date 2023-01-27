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


@Component({
  selector: 'app-add-discard',
  templateUrl: './add-discard.component.html',
  styleUrls: ['./add-discard.component.sass']
})
export class AddDiscardComponent implements OnInit {
  docForm: FormGroup;
  filePathUrl: string;
  discardAsset : DiscardAsset;
  locationDdList = [];
  requestId: any;
  assetId:any;
  edit: boolean = false;
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  moveToLocation: string;
  moveToLocationId: number;


  constructor(private fb: FormBuilder,private cmnService: CommonService, 
    
    public route: ActivatedRoute,
    private assetService: AssetService,
    private snackBar: MatSnackBar,  private discardService: DiscardAssetService,
     private httpService: HttpServiceService,private commonService: CommonService,
     private router:Router) { 
    this.docForm = this.fb.group({
  
      assetId:[""],
      assetCode: [""],
      assetName: [""],
      soldValue:[""],
      purchasePrice:[""],
      priceDifference:[""],
      reason:["",[Validators.required]],
      discardDateobj:["",[Validators.required]],
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

    // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
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
    this.moveToLocation="DISCARDLOCATION";
    this.moveToLocationId=98;
  }


  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'captitalizationDate') {
      this.docForm.patchValue({ captitalizationDate: cdate });
    }
   
  }

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
    this.discardService.addDiscard(this.discardAsset);
    
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/asset/assetMaster/listAssetMaster']);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Invalid Data...!!!",
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
        
      })
    
  }

  // Edit
  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }

    this.assetService.editAsset(obj).subscribe({
      next: (res: any) => {
        this.docForm.patchValue({
          'assetName': res.addAssetBean.assetName,
          'assetCode': res.addAssetBean.assetCode,
          'location': res.addAssetBean.location,
          'purchasePrice': res.addAssetBean.purchasePrice,
          
          
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
