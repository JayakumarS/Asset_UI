import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Payments } from '../../payments.model';
import { PaymentsHistoryService } from '../payments-history.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.sass']
})
export class PaymentsHistoryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "receiptno",
    "subscriptiontype",
    "orderid",
    "userid",
    "amount",
    "transactiondate",
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: PaymentsHistoryService | null;
  selection = new SelectionModel<Payments>(true, []);
  index: number;
  id: number;
  payments: Payments | null;


  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public PaymentsHistoryService: PaymentsHistoryService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
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

  }

  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  public loadData() {
    this.exampleDatabase = new PaymentsHistoryService(this.httpClient, this.serverUrl, this.httpService, this.tokenStorage);
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Payments) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}

export class ExampleDataSource extends DataSource<Payments> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Payments[] = [];
  renderedData: Payments[] = [];
  constructor(
    public exampleDatabase: PaymentsHistoryService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Payments[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getPaymentsHistory();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((payments: Payments) => {
            const searchStr = (
              payments.receiptno +
              payments.subscriptiontype +
              payments.orderid +
              payments.userid +
              payments.amount +
              payments.transactiondate 
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
  sortData(data: Payments[]): Payments[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      //For to sort number or string Added by GOKUL
      let isNumber: boolean = false;
      switch (this._sort.active) {
        case "receiptno":
          [propertyA, propertyB] = [a.receiptno, b.receiptno];
          break;
          case "subscriptiontype":
          [propertyA, propertyB] = [a.subscriptiontype, b.subscriptiontype];
          break;
        case "orderid":
          [propertyA, propertyB] = [a.orderid, b.orderid];
          break;
        case "userid":
          [propertyA, propertyB] = [a.userid, b.userid];
          break;
        case "amount":
          [propertyA, propertyB] = [a.amount, b.amount];
          break;
        case "transactiondate":
          [propertyA, propertyB] = [a.transactiondate, b.transactiondate];
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
