import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../asset.service';
import { MatDialog } from "@angular/material/dialog";
import { AuditableAssetPopUpComponent } from 'src/app/audit/auditable-asset/auditable-asset-pop-up/auditable-asset-pop-up.component';
import { AssetMaster } from '../asset-model';
import { AuditableAsset } from 'src/app/audit/auditable-asset/auditable-asset-model';
import { AuditableAssetResultBean } from 'src/app/audit/auditable-asset/auditable-asset-result-bean';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-asset-profile-view',
  templateUrl: './asset-profile-view.component.html',
  styleUrls: ['./asset-profile-view.component.scss']
})
export class AssetProfileViewComponent implements OnInit {

  docForm: FormGroup;
  requestId: any;
  profileViewDetails: any;
  id: number;
  assetMaster:AssetMaster;
  auditableAsset:AuditableAsset;
  fullLifeFlag:boolean=false;
  financialChangeDetails:[];

  constructor( public router:Router,private fb: FormBuilder,private  assetService: AssetService,
    public route: ActivatedRoute,public dialog: MatDialog,private httpService: HttpServiceService,
    public auditableAssetService:AuditableAssetService,) {

    this.docForm = this.fb.group({

      
      //info
      assetName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      assetCode: ["",[Validators.required]],
      location: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      id: [""],
      uploadImg: [""],
      //tab1
      brand: [""],
      model:[""],
      serialNo:[""],
      condition:[""],
      linkedAsset:[""],
      description:[""],
      uploadFiles:[""],
      //tab2
      vendor:[""],
      poNumber: [""],
      selfOrPartner:[""],
      invoiceDate: [""],
      invoiceNo: [""],
      purchasePrice: [""],
      //tab3
      captitalizationPrice:[""],
      captitalizationDate:[""],
      endLife:[""],
      scrapValue:[""],
      depreciation:[""],
      //tab4
      department:[""],
      allottedUpto:[""],
      transferredTo:[""],
      remarks:[""],
      invoiceDateobj:[""],
      captitalizationDateobj:[""],
      allottedUptoobj:[""],
      fileUploadUrl:[""],
      imgUploadUrl:[""],

      depreciationMethod:[""]
      
      
    });
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
    
       this.viewprofile(this.requestId) ;
    
      }
     });
  }

  viewprofile(id: any){

    const obj = {
      editId: id
    }

    this.assetService.editAsset(obj).subscribe({
      next: (res: any) => {
        
   this.profileViewDetails=res.addAssetBean;
   this.auditableAsset=res.getAuditableAssetDetails;

   console.log(this.profileViewDetails);
     
    },
    error: (error) => {
    
     // error code here
   }
    
  });
  
   
  }

  financialChange(){
    console.log(this.docForm.value);
    console.log(this.docForm.value.depreciationMethod);
    this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.financialChangeUrl + "?assetId=" + this.requestId+"&asset="+this.docForm.value.depreciationMethod).subscribe((res: any) => {
        
        this.financialChangeDetails = res.financialChangeDetails;
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
  }

  checkFullLife(event:any){
    if(event.checked){
      this.fullLifeFlag = true;
      this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.financialChangeUrl + "?assetId=" + this.requestId+"&asset="+'').subscribe((res: any) => {
        console.log();
        this.financialChangeDetails = res.financialChangeDetails;
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
    }
    else{
      this.fullLifeFlag = false;
    }
  }

  accurredDepreciationPopUp(row) {

    console.log(row.tab.textLabel);

    // if(row.tab.textLabel.startsWith("Accurred Depreciation")){
    // this.index = i;
    // this.id = row.scheduleId;
    // let tempDirection;
    // if (localStorage.getItem("isRtl") === "true") {
    //   tempDirection = "rtl";
    // } else {
    //   tempDirection = "ltr";
    // }
    // const dialogRef = this.dialog.open(AuditableAssetPopUpComponent, {
    //   data: row,
    //   direction: tempDirection,
    // });
  // }
  }

  // accurredDepreciationPopUp(){

  // }

}
