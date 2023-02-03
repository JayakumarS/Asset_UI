import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { StockVerificationResultBean } from '../../stock-verification/stock-verification-result-bean';
import { StockVerificationService } from '../../stock-verification/stock-verification.service';
import { InventoryReports } from '../inventory-reports-model';
import { InventoryResultBean } from '../inventory-reports-resiltBean';
import { InventoryReportsService } from '../inventory-reports.service';

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
  selector: 'app-list-inventory-reports',
  templateUrl: './list-inventory-reports.component.html',
  styleUrls: ['./list-inventory-reports.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

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
export class ListInventoryReportsComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<SubList>>;
 
  dataSource: MatTableDataSource<MainList>;
  table:boolean=false;
  //dataSource: ExampleDataSource | null;
  exampleDatabase: InventoryReportsService | null;
  selection = new SelectionModel<InventoryReports>(true, []);
  index: number;
  id: number;
  customerMaster: InventoryReports | null;
  groupHeadList = [];
  docForm: FormGroup;
  itemList = [];
  inventoryReport :InventoryReports
  countValue: any;
  viewReportList: any;
  isTblLoading: boolean;
  locationList =[];
  mainList =[];
  companyId: string;

  columnsToDisplay = ["assetName", "categoryName", "location", "quantity","actions"];
  innerDisplayedColumns = ["transferDate","transferQuantity","sourceLocation","destinationLocation"];

  expandedElement: MainList | null;
  expandedElements: any[] = [];
  innerExpandedElements: any[] = [];
  glList=[];
  gllist: MainList[] = [];
  locationDdList: any;
  itemNameDdList: any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private notificationService : NotificationService,
    private fb: FormBuilder,
    private inventoryReportService: InventoryReportsService,
    private cmnService:CommonService,
    private stockVerificationService: StockVerificationService,
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private tokenStorage:TokenStorageService


    
  ) {
  super();{ 
  }
    this.docForm = this.fb.group({
     
      item: [""],
      fromDateObj: [""],
      toDateObj:[""],
      fromDate: [""],
      toDate: [""],
      itemWise: [""],
      availableQty: [""],
      orderQty: [""],
      workInQty: [""],
      location: [""],
   
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
  
// this.httpService.get<InventoryResultBean>(this.inventoryReportService.inventoryDetails,).subscribe(
//   (data) => {
//     console.log(data);
//     this.itemList = data.itemList;
//   },
//   (error: HttpErrorResponse) => {
//     console.log(error.name + " " + error.message);
//   }
// );

    
this.viewReport();



 // Location dropdown
 this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
  next: (data) => {
    this.locationDdList = data;
  },
  error: (error) => {

  }
}
);


 // Location dropdown
 this.companyId=this.tokenStorage.getCompanyId();
 this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe({
  next: (data) => {
    this.itemNameDdList = data;
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
        console.log(res.receivableAgewiseDetails);
        this.mainList=res.inventoryReportsDetails;
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
        this.dataSource = new MatTableDataSource(this.gllist);
        this.dataSource.sort = this.sort;
      });
   
    }

    profileView(id){
      sessionStorage.setItem("Inventory","true");
      this.router.navigate(['/asset/assetMaster/viewAssetMaster/' + id]);
    }
 
    print(){
      this.customerMaster=this.docForm.value;

      sessionStorage.setItem("item",this.customerMaster.item);
      sessionStorage.setItem("location",this.customerMaster.location);
      sessionStorage.setItem("dateValue",this.customerMaster.fromDate);
      this.router.navigate(['/inventory/inventory-reports/print-inventory-report']);
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
}

export interface MainList {
  assetName:String;
  location:String;
  categoryName:String;
  quantity:String;
  subList?: SubList[] | MatTableDataSource<SubList>;
}

export interface SubList {
  transferDate:String;
  transferQuantity:String;
  sourceLocation:String;
  destinationLocation:String;
}

