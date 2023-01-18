import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { CommonService } from 'src/app/common-service/common.service';
import { InventoryReports } from 'src/app/inventory/inventory-reports/inventory-reports-model';
import { MainList } from 'src/app/inventory/inventory-reports/list-inventory-reports/list-inventory-reports.component';
import { InventoryReportsService } from 'src/app/inventory/inventory-reports/inventory-reports.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-asset-profile-view',
  templateUrl: './asset-profile-view.component.html',
  styleUrls: ['./asset-profile-view.component.scss']
})
export class AssetProfileViewComponent implements OnInit {

 @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  docForm: FormGroup;
  requestId: any;
  profileViewDetails: any;
  id: number;
  assetMaster:AssetMaster;
  auditableAsset:AuditableAsset;
  fullLifeFlag:boolean=false;
  financialChangeDetails:[];
  itemNameDdList: any;
  locationDdList: any;
  customerMaster: InventoryReports | null;
  mainList =[];
  glList=[];
  gllist: MainList[] = [];
  dataSource: MatTableDataSource<MainList>;
  columnsToDisplay = ["assetName", "categoryName", "location", "quantity"];

  constructor( public router:Router,private fb: FormBuilder,private  assetService: AssetService,
    public route: ActivatedRoute,public dialog: MatDialog,private httpService: HttpServiceService,
    public auditableAssetService:AuditableAssetService,private commonService: CommonService,
    private cmnService:CommonService,private inventoryReportService: InventoryReportsService,) {

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
      depreciationMethod:[""],
      //tab5
      item: [""],
      fromDateObj: [""],
      toDateObj:[""],
      
      
    });
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
    
       this.viewprofile(this.requestId) ;
    
      }
     });

     this.viewReport();

      // Location dropdown
 this.httpService.get<any>(this.commonService.getItemNameDropdown).subscribe({
  next: (data) => {
    this.itemNameDdList = data;
  },
  error: (error) => {

  }
}
);


 // Location dropdown
 this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
  next: (data) => {
    this.locationDdList = data;
  },
  error: (error) => {

  }
}
);
  }


  getDateString(event,inputFlag){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='fromDate'){
      this.docForm.patchValue({fromDate:cdate});
    }else if(inputFlag == 'toDate'){
      this.docForm.patchValue({toDate:cdate});
    }

  };

  viewReport(){
    this.customerMaster = this.docForm.value;
    this.mainList=[];
    this.gllist=[];
    this.httpService.post(this.inventoryReportService.getInvemtoryReports, this.customerMaster).subscribe((res: any) => {
      console.log(res.inventoryReportsDetails);
      this.mainList=res.inventoryReportsDetails;
    //   if(this.mainList!=null){
    //   this.mainList.forEach(data => {
    //     if (data.subList && Array.isArray(data.subList) && data.subList.length) {
    //       this.gllist = [...this.gllist,
    //         { ...data, subList: new MatTableDataSource(data.subList) }
    //       ];
    //     } 
      
    //     else {
    //       this.gllist = [...this.gllist, data];
    //     }
    //   });
    // }
      this.dataSource = new MatTableDataSource(this.mainList);
      this.dataSource.sort = this.sort;
    });
 
  }


  reset(){
   
    this.docForm = this.fb.group({
      item: [""],
      fromDateObj: [""],
      toDateObj:[""],
      location: [""]
    });
    this.mainList=[];
    this.gllist=[];
    this.viewReport();
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
