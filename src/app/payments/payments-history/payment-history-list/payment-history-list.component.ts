import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { PaymentHistoryList } from './payment-history-list.model';
import { PaymentHistoryListService } from './payment-history-list.service';

@Component({
  selector: 'app-payment-history-list',
  templateUrl: './payment-history-list.component.html',
  styleUrls: ['./payment-history-list.component.sass']
})
export class PaymentHistoryListComponent implements OnInit {

  displayedColumns = [   
    "paymentCode",  
    "paymentDate",
    "auditor",
    "amountPaid",
    "actions" 
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: PaymentHistoryListService | null;
  subs: any;
  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private paymentHistoryService : PaymentHistoryListService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router) { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
      

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new PaymentHistoryListService(this.httpClient,this.serverUrl,this.httpService);
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



  printCall(row) {
    //var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countValue);
    this.router.navigate(['/payments/paymentsHistory/printPayment/', row.paymentCode]);
  }
  
}

export class ExampleDataSource extends DataSource<PaymentHistoryList> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PaymentHistoryList[] = [];
  renderedData: PaymentHistoryList[] = [];
  constructor(
    public exampleDatabase: PaymentHistoryListService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PaymentHistoryList[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllPayments();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((paymentHistoryList: PaymentHistoryList) => {
            const searchStr = (
              paymentHistoryList.paymentCode +
              paymentHistoryList.paymentDate +
              paymentHistoryList.auditor +
              paymentHistoryList.amountPaid
             
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
  sortData(data: PaymentHistoryList[]): PaymentHistoryList[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string  = "";
      let propertyB: number | string  = "";
      switch (this._sort.active) {
        case "paymentCode":
          [propertyA, propertyB] = [a.paymentCode, b.paymentCode];
          break;
     
          case "paymentDate":
          [propertyA, propertyB] = [a.paymentDate, b.paymentDate];
          break;

          case "auditor":
          [propertyA,propertyB]=[a.auditor,b.auditor];
          break;

          case "amountPaid":
          [propertyA,propertyB]=[a.amountPaid,b.amountPaid];
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
