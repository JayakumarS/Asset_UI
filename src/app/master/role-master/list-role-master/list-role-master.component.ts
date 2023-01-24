import { DeleteRoleMasterComponent } from './delete-role-master/delete-role-master.component';
import { RoleMasterService } from '../role-master.service';
import { RoleMaster } from '../role-master.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-list-role-master',
  templateUrl: './list-role-master.component.html',
  styleUrls: ['./list-role-master.component.sass']
})
export class ListRoleMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "roleName",
    "remarks",
    "actions",
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: RoleMasterService | null;
  selection = new SelectionModel<RoleMaster>(true, []);
  index: number;
  id: number;
  roleMaster: RoleMaster | null;
  
  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public roleMasterService: RoleMasterService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
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
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  public loadData() {
    this.exampleDatabase = new RoleMasterService(this.httpClient, this.serverUrl, this.httpService);
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
    this.router.navigate(['/master/roleMaster/addRoleMaster/'+row.roleId]);
  }

  deleteItem(row) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteRoleMasterComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      if (data.data == true) {
        const obj = {
          deletingId: row.countryId
        }
        this.spinner.show();
        this.roleMasterService.deleteRole(obj).subscribe({
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
  onContextMenu(event: MouseEvent, item: RoleMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<RoleMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: RoleMaster[] = [];
  renderedData: RoleMaster[] = [];
  constructor(
    public exampleDatabase: RoleMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RoleMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllRoleMasters();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((roleMaster: RoleMaster) => {
            const searchStr = (
              roleMaster.roleName +
              roleMaster.remarks 
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
  sortData(data: RoleMaster[]): RoleMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "roleName":
          [propertyA, propertyB] = [a.roleName, b.roleName];
          break;
        case "remarks":
          [propertyA, propertyB] = [a.remarks, b.remarks];
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