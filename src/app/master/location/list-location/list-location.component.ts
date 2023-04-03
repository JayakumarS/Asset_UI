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
import { LocationMasterService } from '../location-master.service';
import { Router } from '@angular/router';
import { DeleteLocationComponent } from './delete-location/delete-location.component';
import { LocationMaster } from '../location-master.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AddMultiplecompanyEmployeesComponent } from '../../company-employees/add-multiplecompany-employees/add-multiplecompany-employees.component';
import { AddLocationMultipleUploadComponent } from '../add-location-multiple-upload/add-location-multiple-upload.component';


@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.sass']
})
export class ListLocationComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
   // "select",
    "locationCode",
    "locationName",
    "company",
    "branchname",
    "description",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: LocationMasterService | null;
  selection = new SelectionModel<LocationMaster>(true, []);
  index: number;
  id: number;
  permissionList: any;
  locationMaster: LocationMaster | null;
  company: string;
  url: string;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public locationMasterService: LocationMasterService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    private httpService: HttpServiceService
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
      formCode: 'F1031',
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
    this.exampleDatabase = new LocationMasterService(this.httpClient,this.serverUrl,this.tokenStorage,this.httpService);
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
    if (this.permissionList?.modify){
      this.url=this.router.url;
      if(this.url.includes("addCompany")){
        window.sessionStorage.setItem("LocationFrom", "location");
        this.router.navigate(['/master/location/addLocation/' + row.locationId]);
        }else if(this.url.includes('listLocation')){
        window.sessionStorage.setItem("LocationFrom", "normal");
        this.router.navigate(['/master/location/addLocation/' + row.locationId]);      
        };
    
    }
  }


deleteItem(row) {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeleteLocationComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data == true) {
      const obj = {
        deletingId: row.locationId
      }
      this.locationMasterService.delete(obj).subscribe({
        next: (data) => {
          if (data.success) {
            this.loadData();
            this.showNotification(
              "snackbar-success",
              "Delete Record Successfully...!!!",
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
addLoct(){
  this.company= this.tokenStorage.getCompanyId();
  this.url=this.router.url;
  if(this.url.includes("addCompany")){
  window.sessionStorage.setItem("LocationFrom", "location");
  this.router.navigate(['/master/location/addLocation/0']);
  }else if(this.url.includes('listLocation')){
  window.sessionStorage.setItem("LocationFrom", "normal");
  this.router.navigate(['/master/location/addLocation/0']);
  };

}
multipleuploadpopupCall() {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(AddLocationMultipleUploadComponent, {
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
    this.snackBar.open(text, " ", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// context menu

  onContextMenu(event: MouseEvent, item: LocationMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<LocationMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: LocationMaster[] = [];
  renderedData: LocationMaster[] = [];
  constructor(
    public exampleDatabase: LocationMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<LocationMaster[]> {
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
          .filter((locationMaster: LocationMaster) => {
            const searchStr = (
              locationMaster.locationCode +
              locationMaster.locationName+
              locationMaster.company
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
  sortData(data: LocationMaster[]): LocationMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "locationCode":
          [propertyA, propertyB] = [a.locationCode, b.locationCode];
          break;
        case "locationName":
          [propertyA, propertyB] = [a.locationName, b.locationName];
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