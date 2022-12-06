import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { InterCompanyTransferApproveService} from '../inter-company-transfer-approve.service';
import { InterCompanyTransferApprove} from '../inter-company-transfer-approve.model';
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

@Component({
  selector: 'app-inter-company-transfer',
  templateUrl: './list-inter-company-transfer-approve-component.html',
  styleUrls: ['./list-inter-company-transfer-approve.component.sass']
})
export class ListInterCompanyTransferApproveComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "transferFromName",
    "transferToName",
    "transferDate",
    "amount",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: InterCompanyTransferApproveService | null;
  selection = new SelectionModel<InterCompanyTransferApprove>(true, []);
  index: number;
  id: number;
  accountHeadMaster: InterCompanyTransferApprove | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public interCompanyTransferApproveService: InterCompanyTransferApproveService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
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
    this.loadData();
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new InterCompanyTransferApproveService(this.httpClient, this.serverUrl, this.httpService);
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
  onContextMenu(event: MouseEvent, item: InterCompanyTransferApprove) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<InterCompanyTransferApprove> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: InterCompanyTransferApprove[] = [];
  renderedData: InterCompanyTransferApprove[] = [];
  constructor(
    public exampleDatabase: InterCompanyTransferApproveService,
    public paginator: MatPaginator,
    public sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<InterCompanyTransferApprove[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCurrency();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((interCompanyTransfer: InterCompanyTransferApprove) => {
            const searchStr = (
              interCompanyTransfer.transferFromName +
              interCompanyTransfer.transferToName +
              interCompanyTransfer.transferDate +
              interCompanyTransfer.amount
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
  sortData(data: InterCompanyTransferApprove[]): InterCompanyTransferApprove[] {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this.sort.active) {
        case "transferFromName":
          [propertyA, propertyB] = [a.transferFromName, b.transferFromName];
          break;
        case "transferToName":
          [propertyA, propertyB] = [a.transferToName, b.transferToName];
          break;
          case "transferDate":
          [propertyA, propertyB] = [a.transferDate, b.transferDate];
          break;
          case "amount":
          [propertyA, propertyB] = [a.amount, b.amount];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this.sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
