// import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { DeleteDepreciationComponent } from 'src/app/master/depreciation/list-depreciation/delete-depreciation/delete-depreciation.component';
import { CommonService } from 'src/app/common-service/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReconciliationReportService } from '../reconciliation-report.service';
import { ReconciliationReport } from '../reconciliation-report-model';

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
  selector: 'app-list-reconciliation-report',
  templateUrl: './list-reconciliation-report.component.html',
  styleUrls: ['./list-reconciliation-report.component.sass'],
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
export class ListReconciliationReportComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  displayedColumns = [

    "manageAuditNo", "auditName","startDate","endDate","makerSubmittedDate","checkerSubmittedDate",
    "companyStatus","auditType","companyActions"

  ];
  docForm: FormGroup;

  dataSource: ExampleDataSource | null;
  exampleDatabase: ReconciliationReportService | null;
  selection = new SelectionModel<ReconciliationReport>(true, []);
  index: number;
  id: number;
  reconciliationReport: ReconciliationReport | null;
  permissionList: any;
  companyIdToken: any;
  branchIdToken: any;
  roleId: string;
  constructor(
    private fb: FormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public reconciliationReportService: ReconciliationReportService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService,
    public router:Router
  ) {
    super();
    this.docForm = this.fb.group({
      companyIdToken: this.tokenStorage.getCompanyId(),
      branchIdToken: this.tokenStorage.getBranchId(),
      discardDateFromObj:[""],
      discardFromDate:[""],
      discardDateToObj:[""],
      discardToDate:[""],
      companyId:this.companyIdToken,
      branchId:this.branchIdToken,




    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.onSubmit()
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
      formCode: 'F1049',
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
    this.loadData();
  }

  refresh(){
    this.loadData();
  }


  public loadData() {
    this.exampleDatabase = new ReconciliationReportService(this.httpClient,this.serverUrl,this.httpService);
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

    this.router.navigate(['/usage/utilityChangeLogReport/addUtilityChangeLogReport/'+row.id]);

  }


  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDepreciationComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.reconciliationReportService.deleteReconciliationReport+ "?depreciationCode=" + this.id).subscribe((res: any) => {
          this.showNotification(
            "snackbar-success",
            "Delete Record Successfully...!!!",
            "bottom",
            "center"
          );
          this.loadData();
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );


      } else{
        this.loadData();
      }




      // else{
      //   this.showNotification(
      //     "snackbar-danger",
      //     "Error in Delete....",
      //     "bottom",
      //     "center"
      //   );
      // }
    });

  }
  onSubmit(){

    this.exampleDatabase = this.docForm.value;
    console.log(this.exampleDatabase);
    this.loadData();
}

getDateString(event,inputFlag,item){
  let cdate = this.commonService.getDate(event.target.value);
  if(inputFlag=='discardFromDate'){
    this.docForm.patchValue({discardFromDate:cdate});
  }
  else if (inputFlag == 'discardToDate') {
    this.docForm.patchValue({ discardToDate: cdate });
  }

};
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

// context menu
  onContextMenu(event: MouseEvent, item: ReconciliationReport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<ReconciliationReport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ReconciliationReport[] = [];
  renderedData: ReconciliationReport[] = [];
  constructor(
    public exampleDatabase: ReconciliationReportService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();

    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<ReconciliationReport[]> {

    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((UsageMonitor: ReconciliationReport) => {
            const searchStr = (
              UsageMonitor.auditName +
              UsageMonitor.manageAuditNo +
              UsageMonitor.startDate +
              UsageMonitor.endDate +
              UsageMonitor.makerStatus +
              UsageMonitor.checkerStatus +
              UsageMonitor.companyStatus +
              UsageMonitor.auditType



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
  sortData(data: ReconciliationReport[]): ReconciliationReport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
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


