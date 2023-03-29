import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../reports.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Reportscategory } from '../reports-model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-add-depreciation-report',
  templateUrl: './add-depreciation-report.component.html',
  styleUrls: ['./add-depreciation-report.component.sass'],
  
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
export class AddDepreciationReportComponent extends  UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
  'categoryId',
  'categoryName',
  'asset_code',
  'asset_name',
  'departmentName',
  'invoiceDate',
  'name',
  'captitalizationPrice',
  'captitalizationDate',
  'scrapValue',
  'endLife',
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: ReportsService | null;
  selection = new SelectionModel<Reportscategory>(true, []);

  docForm: FormGroup;
  depreciationList: any = [];
  assetcategoryList = [];
  reportscategory: Reportscategory;
  searchList = [];
  locationList = [];
  requestId: any;
  departmentList = [];


  constructor(
    public httpClient: HttpClient,
    public route : ActivatedRoute,
    private fb: FormBuilder,
    private cmnService: CommonService,
    public commonService: CommonService,
    public reportsService: ReportsService,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,



) {

    super();
    this.docForm = this.fb.group({
    depreciationMethod: [""],
    date: [""],
    fromDateObj: [""],
    category: [""],
    assetLocation: [""],
    department: [""],
    discardFromDate: [""],
    companyId:this.tokenStorage.getCompanyId(),

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
      depreciationMethod: [""],
      fromDateObj: [""],
      category: [""],
      assetLocation: [""],
      department: [""],
      discardFromDate: [""],
      companyId:this.tokenStorage.getCompanyId(),

  });

    // depreciation dropdown
this.httpService.get<any>(this.commonService.getdepreciationdropdown).subscribe({
      next: (data) => {
        this.depreciationList = data;
      },
      error: (error) => {

      }
    });

       // assetcategory dropdown
this.httpService.get<any>(this.commonService.getassetcategorydropdown).subscribe({
        next: (data) => {
          this.assetcategoryList = data;
        },
        error: (error) => {

        }
      });

    // tslint:disable-next-line:max-line-length
this.httpService.get(this.commonService.getCompanybasedlocationDropdown + "?companyId="  + this.tokenStorage.getCompanyId() + "").subscribe((res: any) => {
        this.locationList = res.addressBean;

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

        // Department Dropdown List
this.httpService.get<any>(this.userMasterService.departmentListUrl + "?company=" + this.tokenStorage.getCompanyId() + "").subscribe(
      (data) => {
        this.departmentList = data.departmentList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
this.searchData();
  }
 

  loadData() {
    this.exampleDatabase = new ReportsService(this.httpClient, this.serverUrl, this.httpService,this.tokenStorage);
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
   // context menu
 onContextMenu(event: MouseEvent, item: Reportscategory) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}
// searchData() {
//   this.reportscategory = this.docForm.value;
//   this.loadData();
// }

 

searchData(){
  this.reportscategory = this.docForm.value;
  this.loadData();


      // this.reportsService.depreciationTotalSearch(this.reportscategory).subscribe({
      //   next: (data) => {
      //     if (data.success) {
      //       this.showNotification(
      //         "snackbar-success",
      //         "Edit Record Successfully",
      //         "top",
      //         "right"
      //       );
      //     } else {
      //       this.showNotification(
      //         "snackbar-danger",
      //         "Not Updated Successfully...!!!",
      //         "top",
      //         "right"
      //       );
      //     }
      //   },
      //   error: (error) => {
      //     this.showNotification(
      //       "snackbar-danger",
      //       error.message + "...!!!",
      //       "top",
      //       "right"
      //     );
      //   }
      // });

//   // tslint:disable-next-line:max-line-length
//   this.httpService.post(this.reportsService.depreciationTotalSearch, this.reportscategory).subscribe((res: any) => {
//     console.log(res);
//     this.searchList = res.depreciationList;
//   },
//   (err: HttpErrorResponse) => {
//   }
// );
}


showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 6000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

  reset()
  {
    location.reload();

    this.docForm.patchValue({
      depreciationMethod : '',
      discardFromDate : '',
      fromDateObj : '',
      category : '',
      assetLocation : '',
      department : '',
      search : '',

   });
    this.searchData();
  }
  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='discardFromDate'){
      this.docForm.patchValue({discardFromDate:cdate});
    }
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
    this.exampleDatabase.getDepreciationList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((reportscategory: Reportscategory) => {
            const searchStr = (
              reportscategory.categoryId +
              reportscategory.categoryName

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
        case "categoryId":
          [propertyA, propertyB] = [a.categoryId, b.categoryId];
          break;
        case "categoryName":
            [propertyA, propertyB] = [a.categoryName, b.categoryName];
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

