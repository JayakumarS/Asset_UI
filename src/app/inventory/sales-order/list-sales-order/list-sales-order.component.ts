import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Company } from 'src/app/master/company/company-model'; 
import { CompanyService } from 'src/app/master/company/company.service'; 
import { SelectionModel } from "@angular/cdk/collections";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { DeleteCompanyComponent } from 'src/app/master/company/list-company/delete-company/delete-company.component'; 
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SalesOrderService } from '../sales-order.service';
import { SalesOrder } from '../sales-order-model';
import { DeleteSalesOrderComponent } from './delete-sales-order/delete-sales-order.component';

@Component({
  selector: 'app-list-sales-order',
  templateUrl: './list-sales-order.component.html',
  styleUrls: ['./list-sales-order.component.sass']
})
export class ListSalesOrderComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   
    "customer",
    "currency",
    "dateofdelivery",
    "termsandcondition",
    "actions"
    
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: SalesOrderService | null;
  selection = new SelectionModel<SalesOrder>(true, []);
  index: number;
  id: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public salesOrderService: SalesOrderService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private tokenStorage: TokenStorageService
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
    this.exampleDatabase = new SalesOrderService(this.httpClient,this.serverUrl,this.tokenStorage,this.httpService,);
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

    this.router.navigate(['/inventory/sales-order/add-sales-order/'+row.salesOrderNo]);

  }

  deleteItem(row){

     let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteSalesOrderComponent, {
      height: "270px",
      width: "400px",
      data: row.salesOrderNo,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      if (data.data === true) {
        const obj = {
          deletingId: row.salesOrderNo
        };
        this.salesOrderService.delete(obj).subscribe({
          // tslint:disable-next-line:no-shadowed-variable
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

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
              salesOrder.currency +
              salesOrder.dateofdelivery +
              salesOrder.termsandcondition 
             

             
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
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "customer":
          [propertyA, propertyB] = [a.customer, b.customer];
          break;
        //case "departmentName":
         // [propertyA, propertyB] = [a.departmentName, b.departmentName];
         // break;
          case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
          break;

          case "dateofdelivery":
          [propertyA,propertyB]=[a.dateofdelivery,b.dateofdelivery];
          break;

          case "termsandcondition":
          [propertyA,propertyB]=[a.termsandcondition,b.termsandcondition];
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
