import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserMasterService} from '../user-master.service';
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
import { DeleteUserMasterComponent } from './delete-user-master/delete-user-master.component';
import { UserMaster } from '../user-master.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AddMultipleUserComponent } from '../add-multiple-user/add-multiple-user.component';
// import { DeleteCurrencyComponent } from './delete-currency/delete-currency.component';

@Component({
  selector: 'app-list-user-master',
  templateUrl: './list-user-master.component.html',
  styleUrls: ['./list-user-master.component.sass']
})
export class ListUserMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "fullName",
    "emailId",
    "contNumber",
    "accountStatus",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: UserMasterService | null;
  selection = new SelectionModel<UserMaster>(true, []);
  index: number;
  id: number;
  permissionList: any;
  UserMaster: UserMaster | null;
  userId: string;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public userMasterService: UserMasterService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    const permissionObj = {
      formCode: 'F1025',
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

  onSubmit(){
    this.userId = this.tokenStorage.getUserId();
    console.log(this.userId);
    this.loadData();
}

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new UserMasterService(this.httpClient, this.serverUrl, this.httpService,this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.userId
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


 // edit
 editCall(row) {
  if (this.permissionList?.modify){
  this.router.navigate(['/master/userMaster/add-user-master/' + row.empid]);
  }
}


deleteItem(i: number, row,activeFlag) {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeleteUserMasterComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data == true) {
      const obj = {
        deletingid: row.empid,
        activeFlag:activeFlag
      }
      this.userMasterService.userdelete(obj).subscribe({
        next: (data) => {
          if (data.success) {
            this.loadData();
            this.showNotification(
              "snackbar-success",
              "Record Updated Successfully...!!!",
              "bottom",
              "center"
            );
          }else {
            this.showNotification(
              "snackbar-danger",
              data.message,
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
        }
      });

    }
  });
}
multipleuploadpopupCall(){
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(AddMultipleUserComponent, {
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
private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);

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
  onContextMenu(event: MouseEvent, item: UserMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}

export class ExampleDataSource extends DataSource<UserMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserMaster[] = [];
  renderedData: UserMaster[] = [];
  constructor(
    public exampleDatabase: UserMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public userId
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList(this.userId);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
        .slice()
          .filter((userMaster:any) => {
            const searchStr = (
              userMaster.userId +
              userMaster.fullName +
              userMaster.emailId +
              userMaster .contNumber +
              userMaster.role +
              userMaster . department +
              userMaster.repmanager +
              userMaster.language +
              userMaster.location +
              userMaster.otp +
              userMaster.userLocation +
              userMaster.accountStatus
              

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
  sortData(data: UserMaster[]): UserMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "fullName":
          [propertyA, propertyB] = [a.fullName, b.fullName];
          break;
        case "emailId":
          [propertyA, propertyB] = [a.emailId, b.emailId];
          break;
        case "accountStatus":
          [propertyA, propertyB] = [a.accountStatus, b.accountStatus];
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