// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-list-vendor',
//   templateUrl: './list-vendor.component.html',
//   styleUrls: ['./list-vendor.component.sass']
// })
// export class ListVendorComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VendorService } from '../vendor.service';
import { Commodity } from '../vendor-model';
import { DeleteVendorComponent } from './delete/delete.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-list-vendor',
  templateUrl: './list-vendor.component.html',
  styleUrls: ['./list-vendor.component.sass']
})
export class ListVendorComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    // "select",
    //  "commodity",
    //  "imdgClass",
    //  "unNo",
    //  "flashPoint",
    "vendorName",
    "vendorCountryName",
    "currency",
    "vendorPhoneNumber",
     "actions"
   ];

   dataSource: ExampleDataSource | null;
   exampleDatabase: VendorService | null;
   selection = new SelectionModel<Commodity>(true, []);
   index: number;
   id: number;
   permissionList: any;
   customerMaster: Commodity | null;
   constructor(
     public httpClient: HttpClient,
     public dialog: MatDialog,
     public vendorService: VendorService,
     private snackBar: MatSnackBar,
     private router: Router,
     private serverUrl: serverLocations,
     private httpService: HttpServiceService,
     private tokenStorage: TokenStorageService,
     private spinner: NgxSpinnerService,
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
      formCode: 'F1045',
      roleId: this.tokenStorage.getRoleId()
    }
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
     this.exampleDatabase = new VendorService(this.httpClient,this.serverUrl,this.httpService);
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
    if (this.permissionList?.modify){
     this.router.navigate(['/master/vendor/addVendor/' + row.empid]);
    }
   }

   deleteItem(i: number, row) {
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
       tempDirection = "rtl";
     } else {
       tempDirection = "ltr";
     }
      const dialogRef = this.dialog.open(DeleteVendorComponent, {
       height: "270px",
       width: "400px",
       data: row,
       direction: tempDirection,
       disableClose: true
     });
      this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
       if (data.data == true) {
         const obj = {
          deletingid: row.empid
         }
         this.vendorService.deleteVonder(obj).subscribe({
          next: (data) => {
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
           }
         });

       }
     });

   }






   private refreshTable() {
     this.paginator._changePageSize(this.paginator.pageSize);
   }
 // context menu
   onContextMenu(event: MouseEvent, item: Commodity) {
     event.preventDefault();
     this.contextMenuPosition.x = event.clientX + "px";
     this.contextMenuPosition.y = event.clientY + "px";
     this.contextMenu.menuData = { item: item };
     this.contextMenu.menu.focusFirstItem("mouse");
     this.contextMenu.openMenu();
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
     this.snackBar.open(text, "", {
       duration: 2000,
       verticalPosition: placementFrom,
       horizontalPosition: placementAlign,
       panelClass: colorName,
     });
   }
}

export class ExampleDataSource extends DataSource<Commodity> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Commodity[] = [];
  renderedData: Commodity[] = [];
  constructor(
    public exampleDatabase: VendorService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Commodity[]> {
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
          .filter((commodity: Commodity) => {
            const searchStr = (
              commodity.vendorName +
              commodity.vendorCountryName +
              commodity.currency +
              commodity.vendorPhoneNumber

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
  sortData(data: Commodity[]): Commodity[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        // case "id":
        //   [propertyA, propertyB] = [a.id, b.id];
        //   break;
        case "vendorName":
          [propertyA, propertyB] = [a.vendorName, b.vendorName];
          break;
        // case "vendorCountryName":
        //   [propertyA, propertyB] = [a.vendorCountryName, b.vendorCountryName];
        //   break;
        case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
          break;
        case "vendorPhoneNumber":
            [propertyA, propertyB] = [a.vendorPhoneNumber, b.vendorPhoneNumber];
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
