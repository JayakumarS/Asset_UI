import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
import { ManageAuditService } from '../manage-audit.service';
import { ManageAudit } from '../manage-audit.model';
import { DeleteManageAuditComponent } from './delete-manage-audit/delete-manage-audit.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AddMultipleuploadManageAuditComponent } from '../add-multipleupload-manage-audit/add-multipleupload-manage-audit.component';

@Component({
  selector: 'app-list-manage-audit',
  templateUrl: './list-manage-audit.component.html',
  styleUrls: ['./list-manage-audit.component.sass']
})
export class ListManageAuditComponent implements OnInit {
  [x: string]: any;
  roleId: any;

  displayedColumns: any;
  dataSource: ExampleDataSource | null;
  exampleDatabase: ManageAuditService | null;
  selection = new SelectionModel<ManageAudit>(true, []);
  index: number;
  id: number;
  permissionList: any;
  customerMaster: ManageAudit | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public manageAuditService: ManageAuditService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
  ) {
    // super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.roleId=this.tokenStorage.getRoleId();

    if (this.roleId=='2') {
      this.displayedColumns = [
        "auditCode", "auditName","startDate","endDate",
        "companyStatus","auditType","companyActions"
      ];
    } else if (this.roleId=='3') {
      this.displayedColumns = [
        "auditCode", "auditName","startDate","endDate",
        "checkerStatus","auditType","checkerActions"
      ];
    } else if (this.roleId=='4') {
      this.displayedColumns = [
        "auditCode", "auditName","startDate","endDate",
        "makerStatus","auditType","makerActions"
      ];
    }
    
    const permissionObj = {
      formCode: 'F1001',
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
    this.exampleDatabase = new ManageAuditService(this.httpClient, this.serverUrl, this.tokenStorage, this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
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
    if (this.permissionList?.modify && this.roleId=='2' && row.companyStatus=='Pending'){
    this.router.navigate(['/audit/manageaudit/addManageAudit/' + row.auditId]);
  }
  }
  
  viewCall(row) {
    this.router.navigate(['/audit/manageaudit/manageAudit-view/' + row.auditId]);
  }

  multipleuploadpopupCall() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(AddMultipleuploadManageAuditComponent, {
      data: {
        action: "edit",
      },
      width: "640px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 0) {
        this.refreshTable();
        this.showNotification(
          "black",
          "Upload Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }


  deleteItem(row) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteManageAuditComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

      if (data.data == true) {
        const obj = {
          deletingId: row.auditId
        }
        this.spinner.show();
        this.manageAuditService.deleteManageAudit(obj).subscribe({
          next: (data) => {
            this.spinner.hide();
            if (data.success) {
              this.loadData();
              this.showNotification(
                "snackbar-success",
                "Delete Record Successfully...!!!",
                "bottom",
                "center"
              );
            }
          },
          error: (error) => {
            this.spinner.hide();
          }
        });

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

// context menu
  onContextMenu(event: MouseEvent, item: ManageAudit) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<ManageAudit> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ManageAudit[] = [];
  renderedData: ManageAudit[] = [];
  constructor(
    public exampleDatabase: ManageAuditService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ManageAudit[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
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
          .filter((manageAudit: ManageAudit) => {
            const searchStr = (
              manageAudit.auditName +
              manageAudit.auditCode +
              manageAudit.startDate +
              manageAudit.endDate +
              manageAudit.extDate +
              manageAudit.makerStatus +
              manageAudit.checkerStatus +
              manageAudit.companyStatus +
              manageAudit.auditType

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
  sortData(data: ManageAudit[]): ManageAudit[] {
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
        case "auditCode":
          [propertyA, propertyB] = [a.auditCode, b.auditCode];
          break;
        case "startDate":
          [propertyA, propertyB] = [a.startDate, b.startDate];
          break;

        case "endDate":
          [propertyA, propertyB] = [a.endDate, b.endDate];
          break;

          case "extDate":
          [propertyA, propertyB] = [a.extDate, b.extDate];
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

