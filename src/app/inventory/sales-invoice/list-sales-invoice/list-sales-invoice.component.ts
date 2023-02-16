import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { SalesInvoice } from '../sales-invoice.model';
import { SalesInvoiceService } from '../sales-invoice.service';
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { serverLocations } from 'src/app/auth/serverLocations';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { DeleteSalesInvoiceComponent } from './delete-sales-invoice/delete-sales-invoice.component';









@Component({
  selector: 'app-list-sales-invoice',
  templateUrl: './list-sales-invoice.component.html',
  styleUrls: ['./list-sales-invoice.component.sass']
})
export class ListSalesInvoiceComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    // "select",
     "companyName",
     "customerName",
     "currencyName",
     "narration",
     "actions"
   ];
   dataSource: ExampleDataSource | null;
   exampleDatabase: SalesInvoiceService | null;
   selection = new SelectionModel<SalesInvoice>(true, []);
   index: number;
   id: number;
   permissionList: any;
   salesInvoice: SalesInvoice | null;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public salesInvoiceService: SalesInvoiceService,
              private snackBar: MatSnackBar,
              private serverUrl: serverLocations,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private spinner: NgxSpinnerService,
              public commonService: CommonService,
              private httpService: HttpServiceService
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
      formCode: 'F1059',
      roleId: this.tokenStorage.getRoleId()
    };
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

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new SalesInvoiceService(this.httpClient, this.serverUrl, this.tokenStorage, this.httpService);
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

    this.router.navigate(['/inventory/salesInvoice/add-sales-invoice/' + row.salesInvoiceNo]);
  }


deleteItem(row) {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeleteSalesInvoiceComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data === true) {
      const obj = {
        deletingid: row.salesInvoiceNo
      };
      this.salesInvoiceService.delete(obj).subscribe({
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
  this.snackBar.open(text, " ", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

// context menu

onContextMenu(event: MouseEvent, item: SalesInvoice) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  // tslint:disable-next-line:object-literal-shorthand
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}

}


export class ExampleDataSource extends DataSource<SalesInvoice> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: SalesInvoice[] = [];
  renderedData: SalesInvoice[] = [];
  constructor(
    public exampleDatabase: SalesInvoiceService,
    public paginator: MatPaginator,
    // tslint:disable-next-line:variable-name
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SalesInvoice[]> {
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
          .filter((salesInvoice: SalesInvoice) => {
            const searchStr = (
              salesInvoice.companyName +
              salesInvoice.customerName
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
  sortData(data: SalesInvoice[]): SalesInvoice[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "companyName":
          [propertyA, propertyB] = [a.companyName, b.companyName];
          break;
        case "customerName":
          [propertyA, propertyB] = [a.customerName, b.customerName];
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
