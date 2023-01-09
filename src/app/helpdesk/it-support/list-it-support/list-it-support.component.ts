import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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
import { Itsupportservice } from '../it-support.service';
import { Router } from '@angular/router';
import { DeleteLocationComponent } from 'src/app/master/location/list-location/delete-location/delete-location.component';
import { Itsupport } from '../it-support.model'; 
import { DeleteScheduleActivityComponent } from 'src/app/admin/schedule-activity/list-schedule-activity/delete-schedule-activity/delete-schedule-activity.component'; 
import { DeleteitsupportComponent } from './deleteitsupport/deleteitsupport.component';
import { NotificationpopComponent } from './notificationpop/notificationpop.component';
import { ItSupportresultbean } from '../it-support-result-bean';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-list-it-support',
  templateUrl: './list-it-support.component.html',
  styleUrls: ['./list-it-support.component.sass']
})
export class ListItSupportComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
   // "select",
    "tickettype",
    "asset",
    "assetlocation",
    "priority",
    "ticketgroup",
    "assignee",
    "reportedby",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: Itsupportservice | null;
  selection = new SelectionModel<Itsupport>(true, []);
  index: number;
  id: number;
  locationMaster: Itsupport | null;
  assetnamelist: [""]
  closedListCount=[];
  AssignedListCount=[];
  spinner: any;
  closeCountValue: any;
  AssignedCountValue: any;
  OpenedCountValue: any;
  HoldCountValue: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itsupportservice: Itsupportservice,
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

    this.httpService.get<ItSupportresultbean>(this.itsupportservice.closedListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.closeCountValue = data.closedListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    this.httpService.get<ItSupportresultbean>(this.itsupportservice.openListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.OpenedCountValue = data.openedListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }

    );
    this.httpService.get<ItSupportresultbean>(this.itsupportservice.holdListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.HoldCountValue = data.holdListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<ItSupportresultbean>(this.itsupportservice.AssignedListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.AssignedCountValue = data.assignedListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new Itsupportservice(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    
  }
  editCall(row) {

    this.router.navigate(['/helpdesk/itsupport/additsupport/'+row.id]);
  
  }
  addNew(){
    this.router.navigate(['/helpdesk/itsupport/additsupport/0']);
  }
  deleteItem(i, row) {
    this.index = i;
    this.id = row.support_id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteitsupportComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
      if(data==1)[
        this.showNotification(
          "snackbar-success",
          " Successfully deleted",
          "bottom",
          "center"
        )
        ]
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
   
  notificationpopup(){
   
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(NotificationpopComponent, {
      height: "400px",
      width: "270px",
    
      
      
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
      if(data==1)[
        this.showNotification(
          "snackbar-success",
          " Successfully deleted",
          "bottom",
          "center"
        )
        ]
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
    this.snackBar.open(text, " ", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// context menu

  onContextMenu(event: MouseEvent, item: Itsupport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<Itsupport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Itsupport[] = [];
  renderedData: Itsupport[] = [];
  constructor(
    public exampleDatabase: Itsupportservice,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Itsupport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getItList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((locationMaster: Itsupport) => {
            const searchStr = (
              locationMaster.tickettype +
              locationMaster.assetnamelist +
              locationMaster.assetlocation
             
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
  sortData(data: Itsupport[]): Itsupport[] {
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
        case "tickettype":
          [propertyA, propertyB] = [a.tickettype, b.tickettype];
          break;
        case "asset":
          [propertyA, propertyB] = [a.assetnamelist, b.assetnamelist];
          break;
        case "assetlocation":
          [propertyA, propertyB] = [a.assetlocation, b.assetlocation];
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