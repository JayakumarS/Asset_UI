
import { ElementRef,  ViewChild} from '@angular/core';
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
import { serverLocations } from 'src/app/auth/serverLocations';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/common-service/common.service';
import { Reportscategory } from '../reports-model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ReportsService } from '../reports.service';
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
  selector: 'app-assets-return',
  templateUrl: './assets-return.component.html',
  styleUrls: ['./assets-return.component.sass'],
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
export class AssetsReturnComponent  extends  UnsubscribeOnDestroyAdapter implements OnInit{
  confirmDelete(): void {
    this.dueList.close({ data: true })
  }

  
  displayedColumns=[

    "asset_code",
    "asset_name",
    "departments",
    "asset_locations",
    "transferred_to",
    "allotted_upto",

  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: ReportsService | null;
  selection = new SelectionModel<Reportscategory>(true, []);
  hi= "asset_name"
  index: number;
  id: number;
  docForm: FormGroup;
  dueList: any = [];
 
  reportscategory: Reportscategory;

  companyId: string;
  showAlertMessage = false;



 
 

  constructor(
    private cmnService:CommonService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public   reportsService: ReportsService,
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
      enddateObj: [""],
  
      allotted_upto:[""],
      departments: [""],
       transferred_to:[""],
       asset_code:[""],
       asset_name:[""],
       asset_locations:[""],
       enddate:[""],
       startdate:[""],

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
      asset_locations:[""],
      asset_category:[""],
      asset_code:[""],
      asset_name :[""],
      allotted_upto:[""],
      transferred_to:[],
      departments:[""],

    });
    this.searchData();

  
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

  o

//   list(){
//     this.httpService.get<any>(this.reportsService . assetdueListUrl).subscribe({
//     next: (data) => {
//       this.duelist = data.itSupportBean;
      
//     },
//     error: (error) => {
//     }
//   });
// }


//  myFunction() {
//   var txt;
//   if (confirm("Press a button!")) {
//     txt = "You pressed OK!";
//   } else {
//     txt = "You pressed Cancel!";
//   }
//   document.getElementById("demo").innerHTML = txt;
// }

// getRowColor(row){
//   if (row.transferred_to === '1') {
//     return "red";
//   } else if (row.status_2 === '1') {
//     return "green";
//   }
// }
 allotted_upto: {
      new : FileSystem;
      prototype: FileSystem;
  }

// };

onSubmit(){
   
    //  this.getUtilityList = this.docForm.value;
    //  console.log(this.duelist);
    //  this.loadData();
   
    this.dueList = this.docForm.value;
    this.loadData();


  //    this.httpService.post(this.locationMasterService.DueSerach, this.duelist).subscribe((res: any) => {
  //     console.log(res);
  //     this.getUtilityList = res.getUtilityList;
  //  },
  //   (err: HttpErrorResponse) => {
  //   }
  // );
  }
 

  viewCall(row) {
   
  }

 deleteItem(i, row) {
   
  }
 
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

  searchData() {
    this.reportscategory = this.docForm.value;
    this.loadData();
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
  };
  Reset(){
    location.reload();
  
    this.docForm.patchValue({
      'startdateObj' : '',
      'enddate' : '',
      'startdate' : '',
      'enddateObj' : '',
    
      'asset_code':'',
      'asset_name':'',
     
      'asset_locations':'',
      'transferred_to':'',
      'departments':'',
      'allotted_upto':'',
  
      
  
   });
   this.searchData(); 
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
    this.exampleDatabase.getDueList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((duelist: Reportscategory) => {
            const searchStr = (

              duelist.startdate +
              duelist.enddate +
              duelist.asset_code +
              duelist.asset_name +
               duelist.companyId +
              duelist.asset_category +
              duelist.allotted_upto +
              duelist.transferred_to +
              duelist.departments
             
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
           case "asset_name":
            [propertyA, propertyB] = [a.asset_name, b.asset_name];
          break;
          case "asset_code":
            [propertyA, propertyB] = [a.asset_code, b.asset_code];
            break;
          case "asset_category":
            [propertyA, propertyB] = [a.asset_category, b.asset_category];
            break;
          
       
       
        
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }

  status(){

  }
}
