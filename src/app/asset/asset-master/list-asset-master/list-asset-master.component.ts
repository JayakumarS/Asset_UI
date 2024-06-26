import { DeleteAssetMasterComponent } from './delete-asset-master/delete-asset-master.component';
import { AssetMaster } from '../asset-model';
import { AssetService } from '../asset.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ChangePasswordPopUpComponent } from 'src/app/user/change-password-pop-up/change-password-pop-up.component';
import { AddMultipleAssetMasterComponent } from '../add-multiple-asset-master/add-multiple-asset-master.component';

@Component({
  selector: 'app-list-asset-master',
  templateUrl: './list-asset-master.component.html',
  styleUrls: ['./list-asset-master.component.sass']
})
export class ListAssetMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "select",
    // "assetId",
    "assetCode",
    "assetId1",
    "assetName",
    "Location",
    "Category",
   // "status",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: AssetService | null;
  selection = new SelectionModel<AssetMaster>(true, []);
  index: number;
  id: number;
  permissionList: any;
  assetMaster: AssetMaster | null;
  checkedIDs: any = [];
  pwdStatus: any;

  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public assetService: AssetService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    public commonService: CommonService,
    private tokenStorage: TokenStorageService,
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
    this.loadData();
    const permissionObj = {
      formCode: 'F1005',
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
     if(window.sessionStorage.getItem("makerLogin")=="true"){
    this.httpService.get<any>(this.commonService.getPwdStatus + "?userId=" + this.tokenStorage.getUserId()).subscribe((result: any) => {
      this.pwdStatus=result.addressBean[0].pwdStatus;
      if(!this.pwdStatus){
        window.sessionStorage.setItem("makerLogin","");
        const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
          disableClose: true ,
          height: "500px",
          width: "465px",
      
        });
      }
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    }
    // this.loadData();

  }

  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  public loadData() {
    this.exampleDatabase = new AssetService(this.httpClient, this.serverUrl, this.httpService, this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter?.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter?.nativeElement?.value;
      }
    );
  }


  editCall(row) {
    if (this.permissionList?.modify){
    this.router.navigate(['/asset/assetMaster/addAssetMaster/' + row.id]);
  }
}

  discardCall(row) {
    this.router.navigate(['/asset/assetDiscard/addDiscardAsset/' + row.id]);
  }

  viewCall(row) {
    this.router.navigate(['/asset/assetMaster/viewAssetMaster/' + row.id]);
  }

  deleteItem(row) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteAssetMasterComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      if (data.data == true) {
        const obj = {
          deletingId: row.id
        }
        this.spinner.show();
        this.assetService.deleteAsset(obj).subscribe({
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
  onContextMenu(event: MouseEvent, item: AssetMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }

  singleAssetPopup(row) {
    console.log(row.tab.textLabel);
    if (row.tab.textLabel == 'Add Multiple Assets') {
      this.multipleuploadpopupCall();
    }
  }

  multipleuploadpopupCall() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(AddMultipleAssetMasterComponent, {
      data: {
        action: "edit",
      },
      width: "640px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
        // this.showNotification(
        //   "black",
        //   "Edit Record Successfully...!!!",
        //   "top",
        //   "right"
        // );
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  
  //FOR QR CODE PDF ADDED BY 
  assetQRcodeExportPdf() {
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
    });
    this.checkedIDs = [];
    if(this.selection.selected.length>=1){
      for (let i = 0; i < this.selection.selected.length; i++) {
        this.checkedIDs.push(this.selection.selected[i].id);
      }
    }
    const obj={
      checkedAssetListIDs: this.checkedIDs,
      companyId: this.tokenStorage.getCompanyId()
    }
    this.spinner.show();
    this.assetService.assetQRcodeExportPdf(obj).pipe().subscribe({
      next: (result: any) => {
        this.spinner.hide();
        if(result!=null){
          var file = new Blob([result], { type: 'application/pdf' });
          var fileURL = window.URL.createObjectURL(file);
          window.open(fileURL);
          this.checkedIDs = [];
          this.selection = new SelectionModel<AssetMaster>(true, []);
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          "Failed to Print QR code",
          "bottom",
          "center"
        );
      }
    });
  }

}

export class ExampleDataSource extends DataSource<AssetMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AssetMaster[] = [];
  renderedData: AssetMaster[] = [];
  constructor(
    public exampleDatabase: AssetService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AssetMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCustomers();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((assetMaster: AssetMaster) => {
            const searchStr = (
              assetMaster.assetName +
             // assetMaster.assetId +
              assetMaster.assetCode +
              assetMaster.assetId1 +
              assetMaster.locationName +
              assetMaster.categoryName +
              assetMaster.statusName +
              assetMaster.status +
              assetMaster.id
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
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: AssetMaster[]): AssetMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      //For to sort number or string Added by 
      let isNumber: boolean = false;
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
          // case "assetId":
          // [propertyA, propertyB] = [a.assetId, b.assetId];
          // break;
        case "assetName":
          [propertyA, propertyB] = [a.assetName, b.assetName];
          break;
        case "assetCode":
          [propertyA, propertyB] = [a.assetCode, b.assetCode];
          break;
        case "locationName":
          [propertyA, propertyB] = [a.locationName, b.locationName];
          break;
        case "categoryName":
          [propertyA, propertyB] = [a.categoryName, b.categoryName];
          break;
        case "statusName":
          [propertyA, propertyB] = [a.statusName, b.statusName];
          break;
        case "status":
            [propertyA, propertyB] = [a.status, b.status];
            break;
        case "assetId1":
              [propertyA, propertyB] = [a.assetId1, b.assetId1];
              break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      if (isNumber) {
        return (
          (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
        );
      } else {
        return (
          (valueA.toString().toLowerCase() < valueB.toString().toLowerCase() ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
        );
      }

    });
  }
}