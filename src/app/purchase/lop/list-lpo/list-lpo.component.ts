import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
// import { ExampleDataSource } from 'src/app/admin/employees/allEmployees/allemployees.component';
import { EmployeesService } from 'src/app/admin/employees/allEmployees/employees.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Lop } from '../lop.model';
import { LopService } from '../lop.service';

@Component({
  selector: 'app-list-lpo',
  templateUrl: './list-lpo.component.html',
  styleUrls: ['./list-lpo.component.sass']
})
export class ListLpoComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = ['purchaseOrderNo', 'purchaseOrderDate','requestType','vendor','type','status','actions'];
  // exampleDatabase: AppService | null;
  dataSource: ExampleDataSource | null;
  exampleDatabase: LopService | null;
  selection = new SelectionModel<Lop>(true, []);
  index: number;
  id: number;
  lop: Lop  | null;

  constructor( 
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public lopService: LopService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
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
    this.exampleDatabase = new LopService(this.httpClient,this.serverUrl,this.httpService);
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
}

deleteItem(i, row){

}
// context menu
onContextMenu(event: MouseEvent, item: Lop) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}
}
export class ExampleDataSource extends DataSource<Lop> {
 
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Lop[] = [];
  renderedData: Lop[] = [];
  constructor(
    public exampleDatabase: LopService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
     // Reset to the first page when the user changes the filter.
     this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<Lop[]> {
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
          .filter((lop: Lop) => {
            const searchStr = (
              lop.vendor +
              lop.requestType +
              lop.type
             
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
  sortData(data: Lop[]): Lop[] {
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
        case "countryCode":
          [propertyA, propertyB] = [a.vendor, b.vendor];
          break;
        case "countryName":
          [propertyA, propertyB] = [a.requestType, b.requestType];
          break;
        case "currency":
          [propertyA, propertyB] = [a.type, b.type];
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
