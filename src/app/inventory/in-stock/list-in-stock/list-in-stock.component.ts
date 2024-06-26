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
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { InStockService } from '../in-stock.service';
import { InStockMaster } from '../in-stock-model';





@Component({
  selector: 'app-list-in-stock',
  templateUrl: './list-in-stock.component.html',
  styleUrls: ['./list-in-stock.component.sass']
})
export class ListInStockComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
   // "select",
    "item",
    "itemCode",
    "category",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: InStockService | null;
  selection = new SelectionModel<InStockMaster>(true, []);
  index: number;
  id: number;
  inStockMaster: InStockMaster | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public inStockService: InStockService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private router: Router,
    private httpService:HttpServiceService
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
    this.exampleDatabase = new InStockService (this.httpClient,this.serverUrl,this.httpService);
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

    this.router.navigate(['/admin/scheduler/add-schedule-activity/'+row.scheduleId]);
  
  }

//  deleteItem(i, row) {
//     this.index = i;
//     this.id = row.scheduleId;
//     let tempDirection;
//     if (localStorage.getItem("isRtl") === "true") {
//       tempDirection = "rtl";
//     } else {
//       tempDirection = "ltr";
//     }
//     const dialogRef = this.dialog.open(DeleteScheduleActivityComponent, {
//       height: "270px",
//       width: "400px",
//       data: row,
//       direction: tempDirection,
//     });
//     this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
//       this.loadData();
//         this.showNotification(
//           "snackbar-success",
//           " Successfully deleted",
//           "bottom",
//           "center"
//         );
      
//       // else{
//       //   this.showNotification(
//       //     "snackbar-danger",
//       //     "Error in Delete....",
//       //     "bottom",
//       //     "center"
//       //   );
//       // }
//     });
//   }
  // showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
  //   throw new Error('Method not implemented.');
  // }

  // private refreshTable() {
  //   this.paginator._changePageSize(this.paginator.pageSize);
  // }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, " ", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// context menu

  onContextMenu(event: MouseEvent, item: InStockMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<InStockMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: InStockMaster[] = [];
  renderedData: InStockMaster[] = [];
  constructor(
    public exampleDatabase: InStockService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<InStockMaster[]> {
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
          .filter((inStockMaster: InStockMaster) => {
            const searchStr = (
              inStockMaster.item +
              inStockMaster.itemCode +
              inStockMaster.invCategory
             
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
  sortData(data: InStockMaster[]): InStockMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "item":
          [propertyA, propertyB] = [a.item, b.item];
          break;
        case "itemCode":
          [propertyA, propertyB] = [a.itemCode, b.itemCode];
          break;
        case "invCategory":
          [propertyA, propertyB] = [a.invCategory, b.invCategory];
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