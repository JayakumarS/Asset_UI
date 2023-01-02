import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CurrencyMasterService} from '../currency-master.service'
import { CurrencyMaster} from '../currency-master.model';
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
import { DeleteCurrencyComponent } from './delete-currency/delete-currency.component';
//import { DeleteCurrencyComponent } from './delete-currency/delete-currency.component';
@Component({
  selector: 'app-list-currency-master',
  templateUrl: './list-currency-master.component.html',
  styleUrls: ['./list-currency-master.component.sass']
})
export class ListCurrencyMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "currencyCode",
    "currencyName",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CurrencyMasterService | null;
  selection = new SelectionModel<CurrencyMaster>(true, []);
  index: number;
  id: number;
  customerMaster: CurrencyMaster | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public countryMasterService: CurrencyMasterService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
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

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CurrencyMasterService(this.httpClient, this.serverUrl, this.httpService);
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


 // edit
 editCall(row: { currencyId: string; }) {

  this.router.navigate(['/master/currencyMaster/addCurrency/' + row.currencyId]);

}
//   deleteItem(row){

//     this.id = row.currencyId;
//     let tempDirection;
//     if (localStorage.getItem("isRtl") === "true") {
//       tempDirection = "rtl";
//     } else {
//       tempDirection = "ltr";
//     }
//     const dialogRef = this.dialog.open(DeleteCurrencyComponent, {
//       height: "270px",
//       width: "400px",
//       data: row,
//       direction: tempDirection,
//     });
//     this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

//       this.loadData();
//         this.showNotification(
//           "snackbar-success",
//           "Delete Record Successfully...!!!",
//           "bottom",
//           "center"
//         );

//       // else{
//       //   this.showNotification(
//       //     "snackbar-danger",
//       //     "Error in Delete....",
//       //     "bottom",
//       //     "center"
//       //   );
//       // }
//     });
//  }


deleteItem(row) {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeleteCurrencyComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data == true) {
      const obj = {
        deletingId: row.currencyId
      }
      this.countryMasterService.currencydelete(obj).subscribe({
        next: (data) => {
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
  onContextMenu(event: MouseEvent, item: CurrencyMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<CurrencyMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CurrencyMaster[] = [];
  renderedData: CurrencyMaster[] = [];
  constructor(
    public exampleDatabase: CurrencyMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CurrencyMaster[]> {
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
          .filter((currencyMaster: CurrencyMaster) => {
            const searchStr = (
              currencyMaster.currencyCode +
              currencyMaster.currencyName

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
  sortData(data: CurrencyMaster[]): CurrencyMaster[] {
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
        case "currencyCode":
          [propertyA, propertyB] = [a.currencyCode, b.currencyCode];
          break;
        case "currencyName":
          [propertyA, propertyB] = [a.currencyName, b.currencyName];
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