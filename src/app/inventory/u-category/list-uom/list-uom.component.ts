import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UCategory } from '../uom-model';
import { UomService } from '../uom.service';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { UomCategoryService } from '../../uom-category/uom-category.service';
import { DeleteUomComponent } from './delete-uom/delete-uom.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-uom',
  templateUrl: './list-uom.component.html',
  styleUrls: ['./list-uom.component.sass']
})
export class ListUomComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns=[
    "uomCode",
    "categoryName",
    "description",
    "actions"


  ];
  dataSource:ExampleDataSource|null;
 selection = new SelectionModel<UCategory>(true, []);
  exporter: any;
  isTblLoading: boolean;
  exampleDatabase: UomService| null;

    constructor( public httpClient: HttpClient,
      private spinner: NgxSpinnerService,
      public dialog: MatDialog,
      public uomService: UomService,
      private snackBar: MatSnackBar,
      private router: Router,
      private serverUrl:serverLocations,
      private httpService:HttpServiceService,
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
      this.loadData();
    }
  
    public loadData() {
      this.exampleDatabase = new UomService(this.httpClient, this.serverUrl, this.httpService);
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
 
    this.router.navigate(['/inventory/UOM-catagory/add-UOM-Category/'+row.uom_id]);

  }
  deleteItem(row) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteUomComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      if (data.data == true) {
        const obj = {
          deletingId: row.uom_id
        }
        this.spinner.show();
        this.uomService.DeleteUomCategory(obj).subscribe({
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
  onContextMenu(event: MouseEvent, item: UCategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<UCategory> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UCategory[] = [];
  renderedData: UCategory[] = [];

  constructor(
    public exampleDatabase: UomService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UCategory[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCategory();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((uCategory: UCategory) => {
            const searchStr = (
              uCategory.categoryName +
              uCategory.description+
              uCategory.uomCode+
              uCategory.uom_id
              // countryMaster.clientType 
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
  sortData(data: UCategory[]): UCategory[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "uom_id":
          [propertyA, propertyB] = [a.uom_id, b.uom_id];
          break;
        case "categoryName":
          [propertyA, propertyB] = [a.categoryName, b.categoryName];
          break;
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
          break;
        case "uomCode":
          [propertyA, propertyB] = [a.uomCode, b.uomCode];
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

