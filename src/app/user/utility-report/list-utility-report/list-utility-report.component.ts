import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UtilityReport } from '../utility-report-model';
import { UtilityReportService } from '../utility-report.service';

@Component({
  selector: 'app-list-utility-report',
  templateUrl: './list-utility-report.component.html',
  styleUrls: ['./list-utility-report.component.sass'],
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
export class ListUtilityReportComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  [x: string]: any;

  displayedColumns = [
    "categoryName", "assetId","location", "assetName", "startDate","endDate",
    "status", "brand","model", "purchasePrice","capitalizationPrice", "endLife",
    "putuseDate", "assetUser","totalHours"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: UtilityReportService | null;
  selection = new SelectionModel<UtilityReport>(true, []);
  index: number;
  id: number;
  categoryList: [];
  permissionList: any;
  utility: UtilityReport | null;
  docForm: FormGroup;

  assetCategoryList: [{code: 'Tangible', text: 'Tangible'}, {code: 'Intangible', text: 'Intangible'}];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private token: TokenStorageService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    private fb: FormBuilder,
    private cmnService:CommonService,
  ) {
     super();

     this.docForm = this.fb.group({
      startdate:[""],
      startdateObj:[""],
      enddate:[""],
      endingDate:[""],
      categoryName: [""],
      startingDate:[""],
      enddateObj:[""],
      warningSearch:[""],
      locationSearch:[""],
      search:[""],
      companyId:parseInt(this.tokenStorage.getCompanyId())

    })
  }

 

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

    // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    });

      //category Type list
      this.httpService.get<any>(this.commonService.getAssetCategoryDropdown+  "?companyId=" + this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {

      }
    }
    );

    const permissionObj = {
      formCode: 'F1006',
      roleId: this.tokenStorage.getRoleId()
    }
    this.spinner.show();
    this.commonService.getAllPagePermission(permissionObj).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.permissionList = data;
        }
      },
      error: (error) => {
        this.spinner.hide();
      }
    });
    this.onSubmit();
  }

  reset(){
    this.docForm = this.fb.group({
      startdate:[""],
      startdateObj:[""],
      enddate:[""],
      endingDate:[""],
      startingDate:[""],
      enddateObj:[""],
      warningSearch:[""],
      locationSearch:[""],
      search:[""],
      categoryName:[""],
      companyId:parseInt(this.tokenStorage.getCompanyId())

    })
    this.onSubmit();
  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
  }

  refresh(){
    this.loadData();
  }

  onSubmit(){

    this.assetType = this.docForm.value;
    console.log(this.assetType);
    this.loadData();
}


  public loadData() {
    this.exampleDatabase = new UtilityReportService(this.httpClient, this.serverUrl,this.token, this.httpService);
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
    if (this.permissionList?.modify){
    this.router.navigate(['/asset/assetRequisition/addAssetRequisition/' + row.assetRequisitionId + '/' + row.requisitionType]);
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

// context menu
  onContextMenu(event: MouseEvent, item: UtilityReport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<UtilityReport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UtilityReport[] = [];
  renderedData: UtilityReport[] = [];
  constructor(
    public exampleDatabase: UtilityReportService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UtilityReport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getUtilityList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((utility: UtilityReport) => {
            const searchStr = (
              utility.warningName +
              utility.meterType +
              utility.location +
              utility.assetName +
              utility.startDate  + 
              utility.endDate +
              utility.totalReading +
              utility.extraUnit +
              utility.unitRate +
              utility.mf  + 
              utility.warning +
              utility.occurence +
              utility.totalConsumption +
              utility.variance

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
  sortData(data: UtilityReport[]): UtilityReport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "warningName":
          [propertyA, propertyB] = [a.warningName, b.warningName];
          break;
        case "meterType":
          [propertyA, propertyB] = [a.meterType, b.meterType];
          break;
        case "location":
          [propertyA, propertyB] = [a.location, b.location];
          break;

        case "assetName":
          [propertyA, propertyB] = [a.assetName, b.assetName];
          break;

          case "startDate":
          [propertyA, propertyB] = [a.startDate, b.startDate];
          break;

          case "endDate":
          [propertyA, propertyB] = [a.endDate, b.endDate];
          break;

         case "totalReading":
          [propertyA, propertyB] = [a.totalReading, b.totalReading];
          break;

         case "extraUnit":
          [propertyA, propertyB] = [a.extraUnit, b.extraUnit];
          break;

          case "unitRate":
          [propertyA, propertyB] = [a.unitRate, b.unitRate];
          break;

          case "mf":
          [propertyA, propertyB] = [a.mf, b.mf];
          break;

          case "warning":
          [propertyA, propertyB] = [a.warning, b.warning];
          break;

          case "occurence":
          [propertyA, propertyB] = [a.occurence, b.occurence];
          break;

         case "totalConsumption":
          [propertyA, propertyB] = [a.totalConsumption, b.totalConsumption];
          break;

          case "variance":
          [propertyA, propertyB] = [a.variance, b.variance];
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
