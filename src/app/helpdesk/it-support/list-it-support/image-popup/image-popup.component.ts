import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { CountryMaster } from 'src/app/master/country-master/country-master.model';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Itsupport } from '../../it-support.model';
import { Itsupportservice } from '../../it-support.service';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.sass']
})
export class ImagePopupComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "assetName",
    "assetCode",
    "assetLocation",
    "assetCategory",
    "status"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: Itsupportservice | null;
  selection = new SelectionModel<Itsupport>(true, []);
  index: number;
  id: number;
  //countryMaster: CountryMaster | null;
  permissionList: any;

  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public countryMasterService: CountryMasterService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private tokenStorage: TokenStorageService,
    public commonService: CommonService,
    public dialogRef: MatDialogRef<ImagePopupComponent>,
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
      formCode: 'F1027',
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


  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  public loadData() {
    this.exampleDatabase = new Itsupportservice(this.httpClient, this.serverUrl,this.tokenStorage, this.httpService);
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
    if(this.permissionList?.modify){
      this.router.navigate(['/master/countryMaster/addCountryMaster/'+row.countryId]);
    }
  }

  deleteItem(row) {
    // let tempDirection;
    // if (localStorage.getItem("isRtl") === "true") {
    //   tempDirection = "rtl";
    // } else {
    //   tempDirection = "ltr";
    // }
    // const dialogRef = this.dialog.open(DeleteCountryMasterComponent, {
    //   height: "270px",
    //   width: "400px",
    //   data: row,
    //   direction: tempDirection,
    //   disableClose: true
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

    //   if (data.data == true) {
    //     const obj = {
    //       deletingId: row.countryId
    //     }
    //     this.spinner.show();
    //     this.countryMasterService.deleteCountry(obj).subscribe({
    //       next: (data) => {
    //         this.spinner.hide();
    //         if (data.success) {
    //           this.loadData();
    //           this.showNotification(
    //             "snackbar-success",
    //             "Delete Record Successfully...!!!",
    //             "bottom",
    //             "center"
    //           );
    //         }
    //       },
    //       error: (error) => {
    //         this.spinner.hide();
    //       }
    //     });

    //   }
    // });

  }

  onCancel(){
    this.dialogRef.close();
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
  onContextMenu(event: MouseEvent, item: Itsupport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Itsupport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Itsupport[] = [];
  renderedData: Itsupport[] = [];
  constructor(
    public exampleDatabase: Itsupportservice,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Itsupport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getImageList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((itsupport: Itsupport) => {
            const searchStr = (
              itsupport.assetName +
              itsupport.assetCode +
              itsupport.assetLocation +
              itsupport.assetCategory +
              itsupport.status
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
  sortData(data: Itsupport[]): Itsupport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "assetName":
          [propertyA, propertyB] = [a.assetName, b.assetName];
          break;
        case "assetCode":
          [propertyA, propertyB] = [a.assetCode, b.assetCode];
          break;
        case "assetLocation":
          [propertyA, propertyB] = [a.assetLocation, b.assetLocation];
          break;
        case "assetCategory":
          [propertyA, propertyB] = [a.assetCategory, b.assetCategory];
          break;
        case "status":
          [propertyA, propertyB] = [a.status, b.status];
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
