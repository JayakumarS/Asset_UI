import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { MaintenanceAndReport } from '../maintenance-and-repair-model';
import { MaintenanceAndRepairService } from '../maintenance-and-repair.service';
import { DeleteMaintenanceAndRepairComponent } from './delete-maintenance-and-repair/delete-maintenance-and-repair.component';

@Component({
  selector: 'app-list-maintenance-and-repair',
  templateUrl: './list-maintenance-and-repair.component.html',
  styleUrls: ['./list-maintenance-and-repair.component.sass']
})
export class ListMaintenanceAndRepairComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns=[
    "assetCode",
    "repairDate",
    "expDateOfReturn",
    "remarks",
    "actions"


  ];
  dataSource:ExampleDataSource|null;
 selection = new SelectionModel<MaintenanceAndReport>(true, []);
  exporter: any;
  isTblLoading: boolean;
  exampleDatabase: MaintenanceAndRepairService| null;
  permissionList: any;

    constructor( public httpClient: HttpClient,
                 private spinner: NgxSpinnerService,
                 public dialog: MatDialog,
                 public maintenanceAndRepairService: MaintenanceAndRepairService,
                 private snackBar: MatSnackBar,
                 private router: Router,
                 private serverUrl: serverLocations,
                 private httpService: HttpServiceService,
                 private tokenStorage: TokenStorageService,
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
      this.loadData();
    }

    refresh() {
      this.loadData();
    }

    public loadData() {
      this.exampleDatabase = new MaintenanceAndRepairService(this.httpClient, this.serverUrl, this.httpService,this.tokenStorage);
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
    this.router.navigate(['/asset/maintenanceAndReport/addMaintenanceAndReport/'+row.maintenanceId]);
  }
  deleteItem(row) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteMaintenanceAndRepairComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      this.loadData();
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
  onContextMenu(event: MouseEvent, item: MaintenanceAndReport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<MaintenanceAndReport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: MaintenanceAndReport[] = [];
  renderedData: MaintenanceAndReport[] = [];

  constructor(
    public exampleDatabase: MaintenanceAndRepairService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MaintenanceAndReport[]> {
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
          .filter((uCategory: MaintenanceAndReport) => {
            const searchStr = (
              uCategory.assetId +
              uCategory.repairDate+
              uCategory.repairReason+
              uCategory.moveLocation
              // countryMaster.clientType
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
  sortData(data: MaintenanceAndReport[]): MaintenanceAndReport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "assetId":
          [propertyA, propertyB] = [a.assetId, b.assetId];
          break;
        case "repairDate":
          [propertyA, propertyB] = [a.repairDate, b.repairDate];
          break;
        case "repairReason":
          [propertyA, propertyB] = [a.repairReason, b.repairReason];
          break;
        case "moveLocation":
          [propertyA, propertyB] = [a.moveLocation, b.moveLocation];
          break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA.toString().toLowerCase() < valueB.toString().toLowerCase() ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}

