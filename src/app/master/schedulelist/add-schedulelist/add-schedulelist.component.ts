import { Component, ElementRef,OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SchedulelistService } from '../schedulelist.service';
import { schedule } from '../schedulelist-model';

@Component({
  selector: 'app-add-schedulelist',
  templateUrl: './add-schedulelist.component.html',
  styleUrls: ['./add-schedulelist.component.sass']
})
export class AddSchedulelistComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = ['assetType', 'startDate','endDate'];
   dataSource: ExampleDataSource | null;
   exampleDatabase: SchedulelistService | null;
   selection = new SelectionModel<schedule>(true, []);
   index: number;
   id: number;

  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    public route: ActivatedRoute,
    public schedulelistService:SchedulelistService,
    public tokenStorage:TokenStorageService,
    // public dialogRef: MatDialogRef<AddSchedulelistComponent>
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
 
  

  onCancel(){
    //this.dialogRef.close();
   }

   refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new SchedulelistService (this.httpClient, this.serverUrl, this.httpService, this.tokenStorage);
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

}
export class ExampleDataSource extends DataSource<schedule> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: schedule[] = [];
  renderedData: schedule[] = [];
  constructor(
    public exampleDatabase: SchedulelistService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<schedule[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getNotificationList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((mainCom: schedule) => {
            const searchStr = (
              mainCom.assetType +
              mainCom.startDate +
              mainCom.endDate          
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
  sortData(data: schedule[]): schedule[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "assetType":
          [propertyA, propertyB] = [a.assetType, b.assetType];
          break;
        case "startDate":
          [propertyA, propertyB] = [a.startDate, b.startDate];
          break;
        case "dueDate":
          [propertyA, propertyB] = [a.endDate, b.endDate];
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
