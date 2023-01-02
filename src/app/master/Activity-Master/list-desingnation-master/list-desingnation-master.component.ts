import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DesignationMasterService} from '../designation-master.service'
import { DesignationMaster} from '../designation-master.model';
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
import { ActivatedRoute } from '@angular/router';
import { DeleteDesignationMasterComponent } from './delete-designation-master/delete-designation-master.component';


@Component({
  selector: 'app-list-desingnation-master',
  templateUrl: './list-desingnation-master.component.html',
  styleUrls: ['./list-desingnation-master.component.sass']
})
export class ListDesingnationMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
displayedColumns = [
  
  
  "activtyid",
    "activtyname",
    "Description",
    "active",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: DesignationMasterService | null;
  selection = new SelectionModel<DesignationMaster>(true, []);
  index: number;
  id: number;
  designationMaster: DesignationMaster | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public designationMasterService: DesignationMasterService,
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
    this.exampleDatabase = new DesignationMasterService(this.httpClient, this.serverUrl, this.httpService);
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

    this.router.navigate(['/master/Activity-master/add-activity/'+row.id]);

  }

  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDesignationMasterComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
        // this.showNotification(
        //   "snackbar-success",
        //   "Delete Record Successfully...!!!",
        //   "bottom",
        //   "center"
        // );
      
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
  onContextMenu(event: MouseEvent, item: DesignationMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<DesignationMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DesignationMaster[] = [];
  renderedData: DesignationMaster[] = [];
  constructor(
    public exampleDatabase: DesignationMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DesignationMaster[]> {
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
          .filter((designationMaster: DesignationMaster) => {
            const searchStr = (
              designationMaster.id+
              designationMaster.activtyid +
              designationMaster.activtyname +
              designationMaster.Description +
              designationMaster.active 
             
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
  sortData(data: DesignationMaster[]): DesignationMaster[] {
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
        case "activtyid":
          [propertyA, propertyB] = [a.activtyid, b.activtyid];
          break;
        case "activtyname":
          [propertyA, propertyB] = [a.activtyname, b.activtyname];
          break;
          case "Description":
          [propertyA, propertyB] = [a.Description, b.Description];
          break;
          case "active":
          [propertyA, propertyB] = [a.active, b.active];
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
