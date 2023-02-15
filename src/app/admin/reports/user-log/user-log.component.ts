import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service'; 
import { Router } from '@angular/router';
import { DeleteLocationComponent } from 'src/app/master/location/list-location/delete-location/delete-location.component';
import { AuditableAsset } from 'src/app/audit/auditable-asset/auditable-asset-model'; 
import { DeleteScheduleActivityComponent } from 'src/app/admin/schedule-activity/list-schedule-activity/delete-schedule-activity/delete-schedule-activity.component'; 
import { AuditableAssetPopUpComponent } from 'src/app/audit/auditable-asset/auditable-asset-pop-up/auditable-asset-pop-up.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/common-service/common.service';
import { reportsresultbean } from '../reports-result-bean';
import { ReportsService } from '../reports.service';
import { Reportscategory } from '../reports-model';
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
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.sass'],
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
export class UserLogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "startdate",
    "status",
    "username",
   
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: ReportsService | null;
  selection = new SelectionModel<Reportscategory>(true, []);
  index: number;
  id: number;
  docForm: FormGroup;
  locationMaster: Reportscategory | null;
  companyList:[""];
  usernamelist:[];
  searchList:[];
  UserLogList:[];

  companyId: string;
  constructor(
    private cmnService:CommonService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public locationMasterService: ReportsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private router: Router,
    private httpService:HttpServiceService,
    private fb: FormBuilder,
    private  reportsserivce: ReportsService,
     private commonService: CommonService,
    public TokenStorage:TokenStorageService
  ) {
    super();

    this.docForm = this.fb.group({
      startdateObj: [""],
      startdate: [""],
      enddateObj: [""],
      enddate: [""],
      company_id:[""],
      username:[""],
      status:[""]

    });

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.docForm = this.fb.group({
      startdateObj: [""],
      enddate: [""],
      startdate: [""],
      enddateObj: [""],
      company_id:[""],
      username:[""],
      status:[""]

    });
    this.loadData();

    this.companyId = this.TokenStorage.getCompanyId();

       // Company  Dropdown List
   this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
    next: (data) => {
      this.companyList = data;
    },
    error: (error) => {
    }
  });

// user name Dd
this.httpService.get<reportsresultbean>(this.reportsserivce.getUserNameDropdown  + "?companyId=" + this.companyId).subscribe(
  (data) => {
    this.usernamelist = data.usernamelist;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);
  }

  Reset(){
    location.reload();

    this.docForm.patchValue({
      'startdateObj' : '',
      'enddate' : '',
      'startdate' : '',
      'enddateObj' : '',
      'status' : '',
      'username' : '',

      

   }); 
  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    let edate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:edate});
    }
  }

  public loadData() {
    this.exampleDatabase = new ReportsService(this.httpClient,this.serverUrl,this.httpService,this.TokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm
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
  editCall(row) {

  
  }

  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

 

  onSubmit(){
   
    // this.locationMaster = this.docForm.value;
    // console.log(this.locationMaster);
    // this.loadData();
   
    this.locationMaster = this.docForm.value;
    this.loadData();


  //   this.httpService.post(this.locationMasterService.UserSerach, this.locationMaster).subscribe((res: any) => {
  //     console.log(res);
  //     this.UserLogList = res.UserLogList;
  //   },
  //   (err: HttpErrorResponse) => {
  //   }
  // );
  }





  viewCall(row) {
   
  }

 deleteItem(i, row) {
   
  }
  // showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
  //   throw new Error('Method not implemented.');
  // }

  // private refreshTable() {
  //   this.paginator._changePageSize(this.paginator.pageSize);
  // }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, " ", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// context menu

  onContextMenu(event: MouseEvent, item: Reportscategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<Reportscategory> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Reportscategory[] = [];
  renderedData: Reportscategory[] = [];
  constructor(
    public exampleDatabase: ReportsService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Reportscategory[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.userloglist(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((locationMaster: Reportscategory) => {
            const searchStr = (
              locationMaster.startdate +
              locationMaster.enddate +
              locationMaster.username 
             
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
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
  /** Returns a sorted copy of the database data. */
  sortData(data: Reportscategory[]): Reportscategory[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "startdate":
          [propertyA, propertyB] = [a.startdate, b.startdate];
          break;
        case "enddate":
          [propertyA, propertyB] = [a.enddate, b.enddate];
          break;
        case "username":
          [propertyA, propertyB] = [a.username, b.username];
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