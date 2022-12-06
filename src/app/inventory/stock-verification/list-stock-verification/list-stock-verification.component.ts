import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { StockVerification } from '../stock-verification-model';
import { StockVerificationService } from '../stock-verification.service';
import { MatMenu } from '@angular/material/menu';
@Component({
  selector: 'app-list-stock-verification',
  templateUrl: './list-stock-verification.component.html',
  styleUrls: ['./list-stock-verification.component.sass']
})
export class ListStockVerificationComponent implements OnInit {
  displayedColumns = [
    "stockVerificationNo",
    "location",
    "organizationName",
    "date",
    "verifiedBy",
    "jobTitle",
    "getJobTitle",
    "actions"

  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: StockVerificationService | null;
  selection = new SelectionModel<StockVerification>(true, []);
  index: number;
  id: number;
  stockVerification: StockVerification | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public stockVerificationService: StockVerificationService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
  ) {
    //super();
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
    this.exampleDatabase = new StockVerificationService(this.httpClient, this.serverUrl, this.httpService);
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
  editCall(row: { currencyCode: string; }) {

    this.router.navigate(['/inventory/stockVerification/addStockVerification/' + row.currencyCode]);

  }
  // deleteItem(row){

  //   this.id = row.currencyCode;
  //   let tempDirection;
  //   if (localStorage.getItem("isRtl") === "true") {
  //     tempDirection = "rtl";
  //   } else {
  //     tempDirection = "ltr";
  //   }
  //   const dialogRef = this.dialog.open(DeleteCurrencyComponent, {
  //     height: "270px",
  //     width: "400px",
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

  //     this.loadData();
  //       this.showNotification(
  //         "snackbar-success",
  //         "Delete Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );

  //     // else{
  //     //   this.showNotification(
  //     //     "snackbar-danger",
  //     //     "Error in Delete....",
  //     //     "bottom",
  //     //     "center"
  //     //   );
  //     // }
  //   });

  // }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: StockVerification) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<StockVerification> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: StockVerification[] = [];
  renderedData: StockVerification[] = [];
  constructor(
    public exampleDatabase: StockVerificationService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<StockVerification[]> {
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
          .filter((stockVerification: StockVerification) => {
            const searchStr = (
              stockVerification.stockVerificationNo +
              stockVerification.location +
              stockVerification.organizationName +
              stockVerification.date +
              stockVerification.verifiedBy +
              stockVerification.jobTitle

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
  sortData(data: StockVerification[]): StockVerification[] {
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
        case "stockVerificationNo":
          [propertyA, propertyB] = [a.stockVerificationNo, b.stockVerificationNo];
          break;
        case "location":
          [propertyA, propertyB] = [a.location, b.location];
          break;
        case "organizationName":
          [propertyA, propertyB] = [a.organizationName, b.organizationName];
          break;
        case "date":
          [propertyA, propertyB] = [a.date, b.date];
          break;
        case "verifiedBy":
          [propertyA, propertyB] = [a.verifiedBy, b.verifiedBy];
          break;
        case "jobTitle":
          [propertyA, propertyB] = [a.jobTitle, b.jobTitle];
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