// import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UsageMonitorService } from '../usage-monitor.service'; 
import { UsageMonitor } from '../usageMonitor-model'; 
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
import { Router } from '@angular/router';
import { DeleteDepreciationComponent } from 'src/app/master/depreciation/list-depreciation/delete-depreciation/delete-depreciation.component';

@Component({
  selector: 'app-list-usage-monitor',
  templateUrl: './list-usage-monitor.component.html',
  styleUrls: ['./list-usage-monitor.component.sass']
})
export class ListUsageMonitorComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   
    "asset",
    "location",
    "occurence",
    "remainder",
    "assignee",
    "startdateObj",
    "enddateObj",
    "description",
    "cc",
    "actions"
    
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: UsageMonitorService | null;
  selection = new SelectionModel<UsageMonitor>(true, []);
  index: number;
  id: number;
  customerMaster: UsageMonitor | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public usageMonitorService: UsageMonitorService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router
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
    this.exampleDatabase = new UsageMonitorService(this.httpClient,this.serverUrl,this.httpService);
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

    this.router.navigate(['/master/depreciation/add-depreciation/'+row.id]);

  }
  

  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDepreciationComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      

      if (data.data == true) {

        this.httpService.get(this.usageMonitorService.deleteUsageMonitor+ "?depreciationCode=" + this.id).subscribe((res: any) => {
          this.showNotification(
            "snackbar-success",
            "Delete Record Successfully...!!!",
            "bottom",
            "center"
          );
          this.loadData();
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );

      
      } else{
        this.loadData();
      }


        
      
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
  onContextMenu(event: MouseEvent, item: UsageMonitor) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<UsageMonitor> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UsageMonitor[] = [];
  renderedData: UsageMonitor[] = [];
  constructor(
    public exampleDatabase: UsageMonitorService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  
  connect(): Observable<UsageMonitor[]> {
    
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
          .filter((UsageMonitor: UsageMonitor) => {
            const searchStr = (
              UsageMonitor.asset +
              UsageMonitor.location +
              UsageMonitor.occurence +
              UsageMonitor.remainder+
              UsageMonitor.assignee+
              UsageMonitor.startdate+
              UsageMonitor.startdateObj +
              UsageMonitor.enddate+
              UsageMonitor.enddateObj+
              UsageMonitor.description +
              UsageMonitor.cc 
             
             
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
  sortData(data: UsageMonitor[]): UsageMonitor[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "asset":
          [propertyA, propertyB] = [a.asset, b.asset];
          break;
        
          case "location":
          [propertyA, propertyB] = [a.location, b.location];
          break;

          case "occurence":
          [propertyA,propertyB]=[a.occurence,b.occurence];
          break;

          case "remainder":
            [propertyA,propertyB]=[a.remainder,b.remainder];
            break;

            case "assignee":
              [propertyA,propertyB]=[a.assignee,b.assignee];
              break;

              case "startdate":
                [propertyA,propertyB]=[a.startdate,b.startdate];
                break;

                case "startdateObj":
                  [propertyA,propertyB]=[a.startdateObj,b.startdateObj];
                  break;

                  case "enddate":
                    [propertyA,propertyB]=[a.enddate,b.enddate];
                    break;

                    case "enddateObj":
                      [propertyA,propertyB]=[a.enddateObj,b.enddateObj];
                      break;

                      case "description":
                        [propertyA,propertyB]=[a.description,b.description];
                        break;

                        case "cc":
                          [propertyA,propertyB]=[a.cc,b.cc];
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
