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
import { element } from 'protractor';

// For bar chart

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
} from "ng-apexcharts";
import { MainService } from 'src/app/admin/dashboard/main.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-asset-profile-view',
  templateUrl:'./asset-profile-view.component.html',
  styleUrls: ['./asset-profile-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
  columnsToDisplay = ["assetName", "categoryName", "locationName", "quantity"];
  imagePath: any;
  innerDisplayedColumns = ["transferDate","transferQuantity","sourceLocation","destinationLocation"];
  profileImg: any;
  qrCodeImg: any;
  expandedElement: MainList | null;
  expandedElements: any[] = [];
  innerExpandedElements: any[] = [];
 
  assetNameForList: any;

  // For Bar Chart Code

  public projectOptions: Partial<ChartOptions>;

  constructor( public router:Router,private fb: FormBuilder,private  assetService: AssetService,
    public route: ActivatedRoute,public dialog: MatDialog,private httpService: HttpServiceService, private sanitizer: DomSanitizer,private snackBar: MatSnackBar,private spinner: NgxSpinnerService,
    public auditableAssetService:AuditableAssetService,private commonService: CommonService,private cd: ChangeDetectorRef,
    private cmnService:CommonService,private inventoryReportService: InventoryReportsService,private mainService:MainService) {

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
      assetType:[true],
      //tab4
      department:[""],
      allottedUpto:[""],
      transferredTo:[""],
      remarks:[""],
      assetUser:[""],
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
      this.fetchAssetName(this.requestId);
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

this.projectChart();
this.checkFullLife(true);
 
}

fetchAssetName(asset:any){

  this.httpService.get<any>(this.mainService.getAssetSurveyURL + "?assetId=" +asset+"&asset="+'').subscribe(
    (data) => {
      this.projectOptions.series=data.getAssetListGraph
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
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
      if(this.mainList!=null){
      this.mainList.forEach(data => {
        if (data.subList && Array.isArray(data.subList) && data.subList.length) {
          this.gllist = [...this.gllist,
            { ...data, subList: new MatTableDataSource(data.subList) }
          ];
        } 
      
        else {
          this.gllist = [...this.gllist, data];
        }
      });
    }
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
    element.subList &&(element.subList as MatTableDataSource<SubList>)? this.toggleElement(element): null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<SubList>).sort = this.innerSort.toArray()[index])
    );
  }

  toggleElement(row1: MainList) {
    const index = this.expandedElements.findIndex(x => x.aName == row1.aName);
    if (index === -1) {
      this.expandedElements.push(row1);
    } else {
      this.expandedElements.splice(index, 1);
    }
  }

  isExpanded(row1: MainList): string {
    const index = this.expandedElements.findIndex(x => x.aName == row1.aName);
    if (index !== -1) {
      return 'expanded';
    }
    return 'collapsed';
  }

  viewprofile(id: any){

    const obj = {
      editId: id
    }

    this.assetService.viewAsset(obj).subscribe({
      next: (res: any) => {
        
   this.profileViewDetails=res.addAssetBean;
   this.auditableAsset=res.getAuditableAssetDetails;
   this.assetNameForList=this.profileViewDetails.assetName;

   //For Img added by gokul
   if (res.addAssetBean.profileFile != undefined && res.addAssetBean.profileFile != null && res.addAssetBean.profileFile != '') {
    let objectProfileURL = 'data:image/png;base64,' + res.addAssetBean.profileFile;
    this.profileImg = this.sanitizer.bypassSecurityTrustUrl(objectProfileURL);
   }
   if (res.addAssetBean.qrCodeFile != undefined && res.addAssetBean.qrCodeFile != null && res.addAssetBean.qrCodeFile != '') {
    let objectQRCodeURL = 'data:image/png;base64,' + res.addAssetBean.qrCodeFile;
    this.qrCodeImg = this.sanitizer.bypassSecurityTrustUrl(objectQRCodeURL);
   }
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
    if(event.checked || event==true){
      // this.fullLifeFlag = true;
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
      this.financialChangeDetails=[]
      // this.fullLifeFlag = false;
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

  back()
  {
    if(sessionStorage.getItem("Inventory")=="true"){
       sessionStorage.setItem("Inventory","false");
       this.router.navigate(['/inventory/inventory-reports/list-inventory-reports']);
    } else {
    this.router.navigate(['/asset/assetMaster/listAssetMaster']);
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

  private projectChart() {
    this.projectOptions = {
      series: [
        {
          name: "Book Value",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: "Depreciation",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "Accrued Depreciation",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      chart: {
        height: 180,
        type: "line",
        stacked: false,
        foreColor: "#9aa0ac",
      },
      colors: ["#7F7D7F", "#AC93E5", "#FEA861"],
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "25%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      // labels: [
      //   "01/01/2003",
      //   "02/01/2003",
      //   "03/01/2003",
      //   "04/01/2003",
      //   "05/01/2003",
      //   "06/01/2003",
      //   "07/01/2003",
      //   "08/01/2003",
      //   "09/01/2003",
      //   "10/01/2003",
      //   "11/01/2003",
      // ],
      labels: [
        "01/01/2023",
        "01/01/2024",
        "01/01/2025",
        "01/01/2026",
        "01/01/2027",
        "01/01/2028",
        "01/01/2029",
        "01/01/2030",
        "01/01/2031",
        "01/01/2032",
        "01/01/2033",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Revenue",
        },
        min: 0,
      },
      tooltip: {
        theme: "dark",
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              // return y.toFixed(0) + "k" + " dollars";
              return y.toFixed(2);
            }
            return y;
          },
        },
      },
    };
  }

}




export interface MainList {
  assetName:String;
  aName:String;
  locationName:String;
  categoryName:String;
  quantity:String;
  subList?: SubList[] | MatTableDataSource<SubList>;
}

export interface SubList {
  // date:String;
  // docType:String;
  // docRef:String;
  // inQty:String;
  // outQty:String;
  transferDate:String;
  transferQuantity:String;
  sourceLocation:String;
  destinationLocation:String;
}