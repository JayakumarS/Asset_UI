import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DeletePurchaseOrderComponent } from '../../purchase-order/list-purchase-order/delete-purchase-order/delete-purchase-order.component';
import { PurchaseOrder } from '../../purchase-order/purchase-order-model';
import { PurchaseOrderService } from '../../purchase-order/purchase-order.service';
import { BankReceipt } from '../bank-reciepts.model';
import { BankReceiptservice } from '../bank-reciepts.service';

@Component({
  selector: 'app-list-bank-reciepts',
  templateUrl: './list-bank-reciepts.component.html',
  styleUrls: ['./list-bank-reciepts.component.sass']
})
export class ListBankRecieptsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
 
  displayedColumns = [
  'voucherNo', 
  'chequeDate',
  'Payment',
  'chequeno',
  'companyname',
  'actions'];

  dataSource: ExampleDataSource | null;
  exampleDatabase: BankReceiptservice | null;
  selection = new SelectionModel<BankReceipt>(true, []);
  index: number;
  id: number;
  BankReceipt : BankReceipt | null;
  permissionList: any;

  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public purchaseOrderService: BankReceiptservice,
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
    const permissionObj = {
      formCode: 'F1012',
      roleId: this.tokenStorage.getRoleId()
    }
    this.spinner.show();
    this.commonService.getAllPagePermission(permissionObj).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.permissionList=data;
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
    this.exampleDatabase = new BankReceiptservice(this.httpClient, this.serverUrl,this.tokenStorage, this.httpService);
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
      this.router.navigate(['/inventory/Bank-Reciepts/add-BankReciept/' + row.id]);
    }
  }

  deleteItem(row) {
    // let tempDirection;
    // if (localStorage.getItem("isRtl") === "true") {
    //   tempDirection = "rtl";
    // } else {
    //   tempDirection = "ltr";
    // }
    // const dialogRef = this.dialog.open(DeletePurchaseOrderComponent, {
    //   height: "270px",
    //   width: "400px",
    //   data: row,
    //   direction: tempDirection,
    //   disableClose: true
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

    //   if (data.data == true) {
    //     const obj = {
    //       deletingId: row.purchaseOrderId
    //     }
    //     this.spinner.show();
    //     this.purchaseOrderService.deletePurchaseOrder(obj).subscribe({
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: PurchaseOrder) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<BankReceipt> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: BankReceipt[] = [];
  renderedData: BankReceipt[] = [];
  constructor(
    public exampleDatabase: BankReceiptservice,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<BankReceipt[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllPurchaseOrders();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((bankReceipt: BankReceipt) => {
            const searchStr = (
              bankReceipt.voucherNo 
            
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
  sortData(data: BankReceipt[]): BankReceipt[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA.toString().toLowerCase() < valueB.toString().toLowerCase() ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
