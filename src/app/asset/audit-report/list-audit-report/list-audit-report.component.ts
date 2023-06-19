import { Component, OnInit,ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from "@angular/material/menu";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuditReportService } from '../audit-report.service';
import { AuditReport } from '../audit-report-model';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  selector: 'app-list-audit-report',
  templateUrl: './list-audit-report.component.html',
  styleUrls: ['./list-audit-report.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class ListAuditReportComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "manageAuditNo", "auditName","startDate","endDate","makerSubmittedDate","checkerSubmittedDate",
    "companyStatus","auditType","companyActions"
  ];

  docForm: FormGroup;
//  [x: string]: any;
 dataSource: ExampleDataSource | null;
  exampleDatabase: AuditReportService | null;
  selection = new SelectionModel<AuditReport>(true, []);
  index: number;
  id: number;
  edit:boolean=false;
  permissionList: any;
  auditReport: AuditReport | null;
  roleId: string;
  FYList =[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  constructor(private fb: FormBuilder,private cmnService: CommonService, public httpClient: HttpClient,
              public dialog: MatDialog,
              public auditReportService: AuditReportService,
              private snackBar: MatSnackBar,
              private serverUrl: serverLocations,
              private httpService: HttpServiceService,
              private tokenStorage: TokenStorageService,
              private spinner: NgxSpinnerService,
              public commonService: CommonService,
              private router: Router)



  {

    super();
   this.docForm = this.fb.group({
    companyIdToken: this.tokenStorage.getCompanyId(),
    branchIdToken: this.tokenStorage.getBranchId(),
    discardDateFromObj:[""],
    discardFromDate:[""],
    discardDateToObj:[""],
    discardToDate:[""],
    companyId:this.tokenStorage.getCompanyId(),
    branchId:this.tokenStorage.getBranchId(),
    financialYear:[""],



  });

}

  
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.onSubmit()
          this.roleId=this.tokenStorage.getRoleId();

    if (this.roleId=='2') {
      this.displayedColumns = [
        "manageAuditNo", "auditName","startDate","endDate","makerSubmittedDate","checkerSubmittedDate",
        "companyStatus","auditType","companyActions"
      ];
    } else if (this.roleId=='3') {
      this.displayedColumns = [
        "manageAuditNo", "auditName","startDate","endDate","makerSubmittedDate","checkerSubmittedDate",
        "checkerStatus","auditType","checkerActions"
      ];
    } else if (this.roleId=='4') {
      this.displayedColumns = [
        "manageAuditNo", "auditName","startDate","endDate","makerSubmittedDate","checkerSubmittedDate",
        "makerStatus","auditType","makerActions"
      ];
    }

    const permissionObj = {
      formCode: 'F1003',
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

    // FY List
    this.httpService.get<any>(this.commonService.getFinancialDropDown).subscribe({
      next: (data) => {
        this.FYList = data;
      },
      error: (error) => {
      }
    });

  }
  refresh(){

    this.docForm = this.fb.group({
      companyIdToken: this.tokenStorage.getCompanyId(),
      branchIdToken: this.tokenStorage.getBranchId(),
      discardDateFromObj:[""],
      discardFromDate:[""],
      discardDateToObj:[""],
      discardToDate:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      financialYear:[""],
  
  
  
    });
    this.loadData();
  }
  public loadData() {
    this.exampleDatabase = new AuditReportService(this.httpClient, this.serverUrl, this.httpService, this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm
    );
    // this.subs.sink = fromEvent(this.filter?.nativeElement, "keyup").subscribe(
    //   () => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   }
    // );
  }
  onSubmit(){

    this.auditReport = this.docForm.value;
    console.log(this.auditReport);
    this.loadData();
}

viewCall(row) {
  this.router.navigate(['/audit/scheduledaudits/scheduled-view/' + row.manageAuditId]);
}
printCall(row) {
  this.router.navigate(['/asset/auditReport/printAuditReport/' + row.manageAuditId]);
}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}


  getDateString(event,inputFlag,item){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='discardFromDate'){
      this.docForm.patchValue({discardFromDate:cdate});
    }
    else if (inputFlag == 'discardToDate') {
      this.docForm.patchValue({ discardToDate: cdate });
    }

  };


// context menu
onContextMenu(event: MouseEvent, item: AuditReport) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}
}

export class ExampleDataSource extends DataSource<AuditReport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AuditReport[] = [];
  renderedData: AuditReport[] = [];
  constructor(
    public exampleDatabase: AuditReportService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AuditReport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllLists(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((auditReport: AuditReport) => {
            const searchStr = (
              auditReport.auditName +
              auditReport.manageAuditNo +
              auditReport.startDate +
              auditReport.endDate +
              auditReport.makerStatus +
              auditReport.checkerStatus +
              auditReport.companyStatus +
              auditReport.auditType

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
  sortData(data: AuditReport[]): AuditReport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "auditName":
          [propertyA, propertyB] = [a.auditName, b.auditName];
          break;
        case "manageAuditNo":
          [propertyA, propertyB] = [a.manageAuditNo, b.manageAuditNo];
          break;
        case "startDate":
          [propertyA, propertyB] = [a.startDate, b.startDate];
          break;

        case "endDate":
          [propertyA, propertyB] = [a.endDate, b.endDate];
          break;
          case "makerStatus":
            [propertyA, propertyB] = [a.makerStatus, b.makerStatus];
            break;
            case "checkerStatus":
            [propertyA, propertyB] = [a.makerStatus, b.makerStatus];
            break;
            case "companyStatus":
            [propertyA, propertyB] = [a.makerStatus, b.makerStatus];
            break;
          case "auditType":
          [propertyA, propertyB] = [a.auditType, b.auditType];
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


export interface MainList {
  manageAuditNo:String;
  auditName:String;
  startDate:String;
  endDate:String;
  makerStatus:String;
  checkerStatus:String;
  companyStatus:String;
  auditType:String;
  // subList?: SubList[] | MatTableDataSource<SubList>;
}

