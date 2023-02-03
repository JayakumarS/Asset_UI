import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PaymentHistoryAuditor } from './payment-history-auditor.model';
import { PaymentHistoryAuditorService } from './payment-history-auditor.service';

@Component({
  selector: 'app-payment-history-auditor',
  templateUrl: './payment-history-auditor.component.html',
  styleUrls: ['./payment-history-auditor.component.sass']
})
export class PaymentHistoryAuditorComponent implements OnInit {
  displayedColumns = [   
    "receiptNo",  
    "companyName",
    "noOfUsers",
    "subAmount", 
    "auditorCommission",
    "actualPayment",
    "paymentDate"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: PaymentHistoryAuditorService | null;
  subs: any;

  userId : string;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    private paymentService : PaymentHistoryAuditorService,
    private tokenStorage : TokenStorageService,
    public router:Router) { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
      

  ngOnInit(): void {
  //  this.getTotal();
    this.loadData();
   
  }

  public loadData() {
    this.exampleDatabase = new PaymentHistoryAuditorService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.tokenStorage
    );
    
      
   
  }


}

export class ExampleDataSource extends DataSource<PaymentHistoryAuditor> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PaymentHistoryAuditor[] = [];
  renderedData: PaymentHistoryAuditor[] = [];
  userId : any;
  constructor(
    public exampleDatabase: PaymentHistoryAuditorService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public tokenStorage : TokenStorageService,
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    //this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PaymentHistoryAuditor[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,     
      
    ];
    this.exampleDatabase.getAllPayments(this.tokenStorage.getUserId());
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((paymentHistoryAud: PaymentHistoryAuditor) => {
            const searchStr = (
              paymentHistoryAud.receiptNo +
              paymentHistoryAud.companyName +
              paymentHistoryAud.noOfUsers +
              paymentHistoryAud.subAmount +
              paymentHistoryAud.auditorCommission +
              paymentHistoryAud.actualPayment +
              paymentHistoryAud.paymentDate             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
       // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
         this.renderedData = sortedData;
         //.splice(
        //   startIndex,
        //   this.paginator.pageSize
        // );
        return this.renderedData;
      })
    );

    
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: PaymentHistoryAuditor[]): PaymentHistoryAuditor[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string  = "";
      let propertyB: number | string  = "";
      switch (this._sort.active) {
        case "receiptNo":
          [propertyA, propertyB] = [a.receiptNo, b.receiptNo];
          break;
     
          case "companyName":
          [propertyA, propertyB] = [a.companyName, b.companyName];
          break;

          case "noOfUsers":
          [propertyA,propertyB]=[a.noOfUsers,b.noOfUsers];
          break;

          case "subAmount":
          [propertyA,propertyB]=[a.subAmount,b.subAmount];
          break;

          case "auditorCommission":
            [propertyA,propertyB]=[a.auditorCommission,b.auditorCommission];
            break;

          case "paymentDate":
          [propertyA,propertyB]=[a.paymentDate,b.paymentDate];
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

