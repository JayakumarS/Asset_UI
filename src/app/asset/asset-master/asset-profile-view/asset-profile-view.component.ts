import { Component, OnInit,ChangeDetectorRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InventoryReportsService } from 'src/app/inventory/inventory-reports/inventory-reports.service';

import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-asset-profile-view',
  templateUrl: './asset-profile-view.component.html',
  styleUrls: ['./asset-profile-view.component.scss']
})
export class AssetProfileViewComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<SubList>>;
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
  imagePath: any;

  innerDisplayedColumns = ["date","docType","docRef","inQty","outQty"];

  expandedElement: MainList | null;
  expandedElements: any[] = [];
  innerExpandedElements: any[] = [];
 
  assetNameForList: any;

  constructor( public router:Router,private fb: FormBuilder,private  assetService: AssetService,
    public route: ActivatedRoute,public dialog: MatDialog,private httpService: HttpServiceService, private sanitizer: DomSanitizer,private snackBar: MatSnackBar,private spinner: NgxSpinnerService,
    public auditableAssetService:AuditableAssetService,private commonService: CommonService,private cd: ChangeDetectorRef,
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

  viewReport(assetName){
    //alert(assetName);
    this.customerMaster = this.docForm.value;
    this.customerMaster.assetId = this.requestId;
    this.customerMaster.assetName = assetName;
    this.mainList=[];
    this.gllist=[];
    this.httpService.post(this.assetService.getAssetList, this.customerMaster).subscribe((res: any) => {
      console.log(res.assetList);
      this.mainList=res.assetList;
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
    this.viewReport(this.assetNameForList);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<SubList>).filter = filterValue.trim().toLowerCase())
    );
  }
  toggleRow(element: MainList) {
    element.subList &&(element.subList as MatTableDataSource<SubList>).data.length? this.toggleElement(element): null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<SubList>).sort = this.innerSort.toArray()[index])
    );
  }

  toggleElement(row1: MainList) {
    const index = this.expandedElements.findIndex(x => x.assetName == row1.assetName);
    if (index === -1) {
      this.expandedElements.push(row1);
    } else {
      this.expandedElements.splice(index, 1);
    }
  }

  isExpanded(row1: MainList): string {
    const index = this.expandedElements.findIndex(x => x.assetName == row1.assetName);
    if (index !== -1) {
      return 'expanded';
    }
    return 'collapsed';
  }

  viewprofile(id: any){

    const obj = {
      editId: id
    }

    this.assetService.editAsset(obj).subscribe({
      next: (res: any) => {
        
   this.profileViewDetails=res.addAssetBean;
   this.auditableAsset=res.getAuditableAssetDetails;
   this.assetNameForList=this.profileViewDetails.assetName;

   //For Img added by gokul
   if (res.addAssetBean.imgFile != undefined && res.addAssetBean.imgFile != null && res.addAssetBean.imgFile != '') {
    let objectURL = 'data:image/png;base64,' + res.addAssetBean.imgFile;
    this.imagePath = this.sanitizer.bypassSecurityTrustUrl(objectURL);
}
   console.log(this.profileViewDetails);
   this.viewReport(this.assetNameForList);
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
      this.financialChangeDetails=[],
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


  
  //FOR DOCUMENT VIEW ADDED BY GOKUL
  viewDocuments(filePath: any, fileName: any) {
    this.spinner.show();
    this.commonService.viewDocument(filePath).pipe().subscribe({
      next: (result: any) => {
        this.spinner.hide();
        var blob = result;
        var fileURL = URL.createObjectURL(blob);
        if (fileName.split('.').pop().toLowerCase() === 'pdf') {
          window.open(fileURL);
        } else {
          var a = document.createElement("a");
          a.href = fileURL;
          a.target = '_blank';
          a.download = fileName;
          a.click();
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          "Failed to View File",
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

}

export interface MainList {
  assetName:String;
  location:String;
  categoryName:String;
  quantity:String;
  subList?: SubList[] | MatTableDataSource<SubList>;
}

export interface SubList {
  date:String;
  docType:String;
  docRef:String;
  inQty:String;
  outQty:String;
}