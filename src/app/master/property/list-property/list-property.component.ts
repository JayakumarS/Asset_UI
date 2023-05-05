import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Property } from '../property-model';
import { PropertyService } from '../property.service';
import { DeletePropertyComponent } from './delete-property/delete-property.component';


@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.sass']
})
export class ListPropertyComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "propertyHolderName",
    "noProperty",
    "taxNo",
    "actions",
  ];

  exampleDatabase:PropertyService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Property>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public PropertyService:PropertyService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private tokenStorage: TokenStorageService
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
 

  public loadData() {
    this.exampleDatabase = new PropertyService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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


  addPage(){
    
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("propFrom", "location");
    this.router.navigate(['/master/property/add-property/0']);
    }else if(this.url.includes('list-property')){
    window.sessionStorage.setItem("propFrom", "normal");
    this.router.navigate(['/master/property/add-property/0']);
    };
  }

  editCall(row) {
   
    this.router.navigate(['/master/property/add-property/'+row.id]);
    };
  
    deleteItem(row){

      this.id = row.workorderNo;
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
        tempDirection = "rtl";
      } else {
        tempDirection = "ltr";
      }
    const dialogRef = this.dialog.open(DeletePropertyComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
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
  onContextMenu(event: MouseEvent, item: Property) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Property> {
  filterChange = new BehaviorSubject("");
  url: any;
  router: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Property[] = [];
  renderedData: Property[] = [];
  constructor(
    public exampleDatabase: PropertyService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Property[]> {
   
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
          .filter((PropertyService: Property) => {
            const searchStr = (
              PropertyService.propertyHolderName+
              PropertyService.noProperty+
              PropertyService.regDate
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
      
        const sortedData = this.sortData(this.filteredData.slice());
        console.log(this.exampleDatabase.data);
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
  sortData(data: Property[]): Property[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "propertyHolderName":
          [propertyA, propertyB] = [a.propertyHolderName, b.propertyHolderName];
          break;
          case "noProperty":
            [propertyA, propertyB] = [a.noProperty, b.noProperty];
            break; 
            case "regDate":
            [propertyA, propertyB] = [a.regDate, b.regDate];
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