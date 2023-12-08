import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
// import { ExampleDataSource } from 'src/app/admin/employees/allEmployees/allemployees.component';
import { EmployeesService } from 'src/app/admin/employees/allEmployees/employees.service';
import { PurchaseRequest } from '../purchase-request.model';
import { PurchaseRequestService } from '../purchase-request.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DeletePurchaseComponent } from './delete-purchase/delete-purchase.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-purchase',
  templateUrl: './list-purchase.component.html',
  styleUrls: ['./list-purchase.component.sass']
})
export class ListPurchaseComponent  extends UnsubscribeOnDestroyAdapter  implements OnInit {


  displayedColumns = ['prNo', 'requestDate','vendor','requestTypeName','remarks','actions'];


  // exampleDatabase: AppService | null;
  dataSource: ExampleDataSource | null;
  exampleDatabase: PurchaseRequestService | null;
  selection = new SelectionModel<PurchaseRequest>(true, []);
  index: number;
  id: number;
  purchaseRequest: PurchaseRequest | null;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public purchaseRequestService: PurchaseRequestService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,private spinner: NgxSpinnerService,
    private httpService:HttpServiceService,
    public router: Router, private tokenStorage: TokenStorageService,
    public route: ActivatedRoute
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
    this.exampleDatabase = new PurchaseRequestService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
  this.router.navigate(['/purchase/purchaseRequest/addPurchase/'+row.purchaseRequestId]);
}

deleteItem(row) {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeletePurchaseComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

    if (data.data == true) {
      const obj = {
        deletingId: row.purchaseRequestId
      }
      this.spinner.show();
      this.purchaseRequestService.DeletePurchase(obj).subscribe({
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
onContextMenu(event: MouseEvent, item: PurchaseRequest) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}
}

export class ExampleDataSource extends DataSource<PurchaseRequest> {
 
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PurchaseRequest[] = [];
  renderedData: PurchaseRequest[] = [];
  constructor(
    public exampleDatabase: PurchaseRequestService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
   /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<PurchaseRequest[]> {
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
          .filter((purchaseRequest: PurchaseRequest) => {
            const searchStr = (
              purchaseRequest.prNo +
              purchaseRequest.requestDate +
              purchaseRequest.vendorName +
              purchaseRequest.requestTypeName +
              purchaseRequest.remarks

                         
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
  sortData(data: PurchaseRequest[]): PurchaseRequest[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        
        case "company":
          [propertyA, propertyB] = [a.company, b.company];
          break;
        case "requestType":
          [propertyA, propertyB] = [a.requestType, b.requestType];
          break;
        case "requestedBy":
          [propertyA, propertyB] = [a.requestedBy, b.requestedBy];
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


