import { DeletePurchaseInvoiceComponent } from './delete-purchase-invoice/delete-purchase-invoice.component';
import { PurchaseInvoiceService } from '../purchase-invoice.service';
import { PurchaseInvoice } from '../purchase-invoice.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-purchase-invoice',
  templateUrl: './list-purchase-invoice.component.html',
  styleUrls: ['./list-purchase-invoice.component.sass']
})
export class ListPurchaseInvoiceComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "purchaseInvoiceNo",
    "purchaseInvoiceDate",
    "vendorName",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: PurchaseInvoiceService | null;
  selection = new SelectionModel<PurchaseInvoice>(true, []);
  index: number;
  id: number;
  purchaseInvoice: PurchaseInvoice | null;
  permissionList: any;
  docForm: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public purchaseInvoiceService: PurchaseInvoiceService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private tokenStorage: TokenStorageService,
    public commonService: CommonService,
    private fb: FormBuilder,

  ) {
    super();

    this.docForm = this.fb.group({
     
      purchaseInvoiceNo: [""],
      purchaseInvoiceDate: [""],
      vendorName:[""],
      currency: [""],
      actions: [""],
      companyId:parseInt(this.tokenStorage.getCompanyId()),
      branchId:parseInt(this.tokenStorage.getBranchId())

    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    const permissionObj = {
      formCode: 'F1014',
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

  print(){
    this.exampleDatabase=this.docForm.value;

    // sessionStorage.setItem("item",this.exampleDatabase.item);
    // sessionStorage.setItem("location",this.exampleDatabase.location);
    // sessionStorage.setItem("dateValue",this.exampleDatabase.fromDate);
    this.router.navigate(['/inventory/purchaseInvoice/printPurchaseInvoice']);
  }

  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  public loadData() {
    this.exampleDatabase = new PurchaseInvoiceService(this.httpClient, this.serverUrl, this.httpService,this.tokenStorage);
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
      this.router.navigate(['/inventory/purchaseInvoice/addPurchaseInvoice/'+row.purchaseInvoiceId]);
    }
  }

  deleteItem(row) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeletePurchaseInvoiceComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      if (data.data == true) {
        const obj = {
          deletingId: row.purchaseInvoiceId
        }
        this.spinner.show();
        this.purchaseInvoiceService.deletePurchaseInvoice(obj).subscribe({
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: PurchaseInvoice) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<PurchaseInvoice> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PurchaseInvoice[] = [];
  renderedData: PurchaseInvoice[] = [];
  constructor(
    public exampleDatabase: PurchaseInvoiceService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PurchaseInvoice[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];


    this.exampleDatabase.getAllPurchaseInvoices();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((purchaseInvoice: PurchaseInvoice) => {
            const searchStr = (
              purchaseInvoice.purchaseInvoiceDate +
              purchaseInvoice.purchaseInvoiceNo +
              purchaseInvoice.vendorName +
              purchaseInvoice.amount 
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
  sortData(data: PurchaseInvoice[]): PurchaseInvoice[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "purchaseInvoiceDate":
          [propertyA, propertyB] = [a.purchaseInvoiceDate, b.purchaseInvoiceDate];
          break;
        case "purchaseInvoiceNo":
          [propertyA, propertyB] = [a.purchaseInvoiceNo, b.purchaseInvoiceNo];
          break;
        case "vendorName":
          [propertyA, propertyB] = [a.vendorName, b.vendorName];
          break;
        case "amount":
          [propertyA, propertyB] = [a.amount, b.amount];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA.toString().toLowerCase() < valueB.toString().toLowerCase() ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
