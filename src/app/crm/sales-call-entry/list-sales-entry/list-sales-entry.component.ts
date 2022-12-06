import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SalesCallEntryService} from '../sales-call-entry.service'
import { SalesCallEntry} from '../sales-call-entry.model';
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
import { DeleteSalesCallEntryComponent } from './delete-sales-call-entry/delete-sales-call-entry.component';

@Component({
  selector: 'app-list-sales-entry',
  templateUrl: './list-sales-entry.component.html',
  styleUrls: ['./list-sales-entry.component.sass']
})
export class ListSalesEntryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "customer",
    "customerType",
    "assignTo",
    "personMet",
    "visitDate",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: SalesCallEntryService | null;
  selection = new SelectionModel<SalesCallEntry>(true, []);
  index: number;
  id: number;
  customerMaster: SalesCallEntry | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public countryMasterService: SalesCallEntryService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
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
    this.exampleDatabase = new SalesCallEntryService(this.httpClient, this.serverUrl, this.httpService);
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

    this.router.navigate(['/crm/salesCallEntry/addSalesCallEntry/'+row.salesCallHdrId]);

  }

  deleteItem(row){
    this.id = row.salesCallHdrId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteSalesCallEntryComponent, {
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
      //   this.showNotification(
      //     "snackbar-danger",
      //     "Error in Delete....",
      //     "bottom",
      //     "center"
      //   );
      // }
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
  onContextMenu(event: MouseEvent, item: SalesCallEntry) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<SalesCallEntry> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: SalesCallEntry[] = [];
  renderedData: SalesCallEntry[] = [];
  constructor(
    public exampleDatabase: SalesCallEntryService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SalesCallEntry[]> {
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
          .filter((salesCallEntry: SalesCallEntry) => {
            const searchStr = (
              salesCallEntry.customerType +
              salesCallEntry.customer +
              salesCallEntry.assignTo +
              salesCallEntry.personMet +
              salesCallEntry.visitDate
             
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
  sortData(data: SalesCallEntry[]): SalesCallEntry[] {
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
        case "customerType":
          [propertyA, propertyB] = [a.customerType, b.customerType];
          break;
        case "customer":
          [propertyA, propertyB] = [a.customer, b.customer];
          break;
        case "assignTo":
          [propertyA, propertyB] = [a.assignTo, b.assignTo];
          break;
        case "personMet":
          [propertyA, propertyB] = [a.personMet, b.personMet];
          break;
        case "visitDate":
          [propertyA, propertyB] = [a.visitDate, b.visitDate];
          break;
        case "salesCallHdrId":
          [propertyA, propertyB] = [a.salesCallHdrId, b.salesCallHdrId];
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