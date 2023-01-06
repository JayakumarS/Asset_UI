import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { InventoryReports } from '../inventory-reports-model';
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
export class ListInventoryReportsComponent implements OnInit {
  [x: string]: any;
  displayedColumns=[

    "itemCode",
    "itemWise",
    "itemdescription",
    "location",
    "maxquality",
    "minquality",
    "size",
    "cost",
    "defaultprice"
  ];
  dataSource:ExampleDataSource|null;
  selection = new SelectionModel<InventoryReports>(true, []);
  inventoryReports: InventoryReports | null;
  viewReportList: any;
  isTblLoading: boolean;
  docForm:FormGroup;
  index: number;
  id: number;
  itemList:[""];
  requestId: any;
  edit:Boolean=false;
  httpClient: HttpClient;
  serverUrl: serverLocations;
  exampleDatabase: InventoryReportsService;

  constructor(private fb: FormBuilder,
    public inventoryReportsService:InventoryReportsService,
    private httpService: HttpServiceService,
    private notificationService : NotificationService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    public route: ActivatedRoute,)  
  { 
  
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.docForm = this.fb.group({
      fromDateObj:[""],
      toDateObj:[""],
      item:[""],
      itemCode:[""],
      itemWise:[""],
      itemdescription:[""],
      location:[""],
      maxquality:[""],
      minquality:[""],
      size:[""],
      cost:[""],
      defaultprice:[""],
      fromDate:[""],
      toDate:[""],
    });

    
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        this.fetchDetails(this.requestId);
      }
    });

    this.httpService.get<any>(this.cmnService.getItemNameDropdown).subscribe({
      next: (data) => {
        this.itemList = data;
      },
      error: (error) => {
      }
    });

  }

  public loadData() {
    this.exampleDatabase = new InventoryReportsService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

 

  exportExcel(){
    this.httpService.post<any>(this.inventoryReportsService.excelExportUrl,this.docForm.value).subscribe(data => {
      console.log(data);
      if(data.success){
      window.open(this.serverUrl.apiServerAddress+data.filePath, '_blank');
      }
      else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
      
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  onSubmit(){
    this.inventoryReports = this.docForm.value;
    console.log(this.inventoryReports);
    this.loadData();


  }
  
  fetchDetails(id:any):void{

  }
  searchData(){

  }
  reset(){

  }

  getDateString(event,inputFlag){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='fromDate'){
      this.docForm.patchValue({fromDate:cdate});
    }else if(inputFlag == 'toDate'){
      this.docForm.patchValue({toDate:cdate});
    }
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
// context menu
  onContextMenu(event: MouseEvent, item: InventoryReports) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
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

export class ExampleDataSource extends DataSource<InventoryReports> {
 filterChange = new BehaviorSubject("");
 get filter(): string {
   return this.filterChange.value;
 }
 set filter(filter: string) {
   this.filterChange.next(filter);
 }
 filteredData: InventoryReports[] = [];
 renderedData: InventoryReports[] = [];
 constructor(
   public exampleDatabase: InventoryReportsService,
   public paginator: MatPaginator,
   public _sort: MatSort
 ) {
   super();
  
   this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
 }
 connect(): Observable<InventoryReports[]> {
   const displayDataChanges = [
     this.exampleDatabase.dataChange,
     this._sort.sortChange,
     this.filterChange,
     this.paginator.page,
   ];
   this.exampleDatabase.getAllList();
   return merge(...displayDataChanges).pipe(
     map(() => {
       // Filter data
       this.filteredData = this.exampleDatabase.data
         .slice()
         .filter((inventoryReports: InventoryReports) => {
           const searchStr = (
            inventoryReports.fromDateObj+
            inventoryReports.toDate+
            inventoryReports.item+
            inventoryReports.itemCode+
            inventoryReports.itemWise+
            inventoryReports.itemdescription+ 
            inventoryReports.location+ 
            inventoryReports.maxquality+ 
            inventoryReports.minquality+ 
            inventoryReports.cost+ 
            inventoryReports.size+ 
            inventoryReports.defaultprice
            
           ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
         });
       // Sort filtered data
       const sortedData = this.sortData(this.filteredData.slice());
       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
       this.renderedData = sortedData.splice(
         startIndex,
         this.paginator.pageSize
       );
       return this.renderedData;
     })
   );
 }
 disconnect() {}
 sortData(data: InventoryReports[]): InventoryReports[] {
   if (!this._sort.active || this._sort.direction === "") {
     return data;
   }
   return data.sort((a, b) => {
     let propertyA: number | string |boolean= "";
     let propertyB: number | string |boolean= "";
     switch (this._sort.active) {
      
       case "fromDateObj":
         [propertyA, propertyB] = [a.fromDateObj, b.fromDateObj];
         break;
       case "toDateObj":
         [propertyA, propertyB] = [a.toDateObj, b.toDateObj];
         break;
         case "item":
          [propertyA, propertyB] = [a.item, b.item];
          break;
       case "itemCode":
         [propertyA, propertyB] = [a.itemCode, b.itemCode];
         break;
       case "itemWise":
           [propertyA, propertyB] = [a.itemWise, b.itemWise];
         break;  
         case "itemdescription":
          [propertyA, propertyB] = [a.itemdescription, b.itemdescription];
        break;  
        case "location":
          [propertyA, propertyB] = [a.location, b.location];
        break;  
        case "maxquality":
          [propertyA, propertyB] = [a.maxquality, b.maxquality];
        break;  
        case "minquality":
          [propertyA, propertyB] = [a.minquality, b.minquality];
        break;  
        case "size":
          [propertyA, propertyB] = [a.size, b.size];
        break;  
        case "cost":
          [propertyA, propertyB] = [a.cost, b.cost];
        break;  
        case "defaultprice":
          [propertyA, propertyB] = [a.defaultprice, b.defaultprice];
        break;  
      
      
     }
     const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
     const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
     return (
       (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
     );
   });
 }


}
