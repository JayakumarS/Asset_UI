import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SalesOrderService} from '../sales-order.service'
import { SalesOrder} from '../sales-order.model';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteOrderComponent } from './delete-order/delete-order.component';

@Component({
  selector: 'app-list-sales-order',
  templateUrl: './list-sales-order.component.html',
  styleUrls: ['./list-sales-order.component.sass']
})
export class ListSalesOrderComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "customer",
    "validFrom","validTo","currency","deliveryDate",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: SalesOrderService | null;
  selection = new SelectionModel<SalesOrder>(true, []);
  index: number;
  id: number;
  salesOrder : SalesOrder | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public salesOrderService: SalesOrderService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router : Router,
    public route : ActivatedRoute
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
    this.exampleDatabase = new SalesOrderService(this.httpClient, this.serverUrl, this.httpService);
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
    this.router.navigate(['/marketing/salesOrder/addOrder/'+row.countValue]);
  }

  deleteItem(row){
    this.id = row.countValue;
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeleteOrderComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    
    this.loadData();
      this.showNotification(
        "snackbar-success",
        "Delete Record Successfully...!!!",
        "bottom",
        "center"
      );

     // else{
        // this.showNotification(
        //   "snackbar-danger",
        //   "Error in Delete....",
        //   "bottom",
        //   "center"
        // );
      //}
    });
    
}
private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
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
  onContextMenu(event: MouseEvent, item: SalesOrder) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<SalesOrder> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: SalesOrder[] = [];
  renderedData: SalesOrder[] = [];
  constructor(
    public exampleDatabase: SalesOrderService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SalesOrder[]> {
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
          .filter((salesOrder: SalesOrder) => {
            const searchStr = (
              salesOrder.customer +
              salesOrder.validFrom +
              salesOrder.validTo +
              salesOrder.currency +
              salesOrder.deliveryDate 
             
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
  sortData(data: SalesOrder[]): SalesOrder[] {
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
        case "customer":
          [propertyA, propertyB] = [a.customer, b.customer];
          break;
        case "validFrom":
          [propertyA, propertyB] = [a.validFrom, b.validFrom];
          break;
        case "validTo":
          [propertyA, propertyB] = [a.validTo, b.validTo];
          break;
        case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
          break;
        case "deliveryDate":
          [propertyA, propertyB] = [a.deliveryDate, b.deliveryDate];
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