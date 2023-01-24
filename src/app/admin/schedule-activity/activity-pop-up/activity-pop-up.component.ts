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
import { MainService } from '../../dashboard/main.service'; 
import { main } from '../../dashboard/main-model'; 
import { DeleteVendorComponent } from 'src/app/master/vendor/list-vendor/delete/delete.component';
import * as moment from 'moment';

@Component({
  selector: 'app-activity-pop-up',
  templateUrl: './activity-pop-up.component.html',
  styleUrls: ['./activity-pop-up.component.sass']
})
export class ActivityPopUpComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  displayedColumns = [
    "activityTypeText",
    "locationText",
    "enddate",
    "startdate",
    //  "actions"
   ];
 
   dataSource: ExampleDataSource | null;
   exampleDatabase: MainService | null;
   selection = new SelectionModel<main>(true, []);
   index: number;
   id: number;
   customerMaster: main | null;
  spinner: any;
  todayDate: string;
   constructor(
     public httpClient: HttpClient,
     public dialog: MatDialog,
     public vendorService: MainService,
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
     this.onSubmit();

     
   }

   onSubmit(){
    this.todayDate=moment().format('YYYY-MM-DD');
    console.log(this.todayDate);
    this.loadData();
}
 
   refresh(){
     this.loadData();
   }
 
   public loadData() {
     this.exampleDatabase = new MainService(this.httpClient,this.serverUrl,this.httpService);
     this.dataSource = new ExampleDataSource(
       this.exampleDatabase,
       this.paginator,
       this.sort,
       this.todayDate
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
 
     this.router.navigate(['/master/vendor/addVendor/'+row.vendorId]);
 
   }




 
 
   private refreshTable() {
     this.paginator._changePageSize(this.paginator.pageSize);
   }
 // context menu
   onContextMenu(event: MouseEvent, item: main) {
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

export class ExampleDataSource extends DataSource<main> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: main[] = [];
  renderedData: main[] = [];
  constructor(
    public exampleDatabase: MainService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public todayDate
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<main[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList(this.todayDate);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((commodity: main) => {
            const searchStr = (
              commodity.activityTypeText +
              commodity.locationText +
              commodity.startdate +
              commodity.enddate 
             
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
  sortData(data: main[]): main[] {
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
        case "activityTypeText":
          [propertyA, propertyB] = [a.activityTypeText, b.activityTypeText];
          break;
        // case "vendorCountryName":
        //   [propertyA, propertyB] = [a.vendorCountryName, b.vendorCountryName];
        //   break;
        case "locationText":
          [propertyA, propertyB] = [a.locationText, b.locationText];
          break;
        case "enddate":
            [propertyA, propertyB] = [a.enddate, b.enddate];
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
