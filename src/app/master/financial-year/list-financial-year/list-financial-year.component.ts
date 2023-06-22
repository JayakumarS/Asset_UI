import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { jewel } from '../../jewellery/jewellery.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FinancialYearService } from '../financial-year.service';
import { FinancialYear } from '../financial-year-model';
import { DeleteFinancialYearComponent } from './delete-financial-year/delete-financial-year.component';

@Component({
  selector: 'app-list-financial-year',
  templateUrl: './list-financial-year.component.html',
  styleUrls: ['./list-financial-year.component.sass']
})
export class ListFinancialYearComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "financialyear",
    "description",
    "isactive",
    "actions",
  ];

  exampleDatabase:FinancialYearService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<FinancialYear>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  subs: any;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public financialYearService: FinancialYearService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService
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
    this.exampleDatabase = new FinancialYearService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
   
    this.router.navigate(['/master/financial/addFinancial/0']);
  
  }
  
  editCall(row) {
 
    this.router.navigate(['/master/financial/addFinancial/'+row.id]);
    
  }

  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteFinancialYearComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {
        const obj = {
          id: row.id
        }
        this.financialYearService.deletefY(obj).subscribe((res: any) => {
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
  onContextMenu(event: MouseEvent, item: jewel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<FinancialYear> {
  filterChange = new BehaviorSubject("");
  snackBar: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: FinancialYear[] = [];
  renderedData: FinancialYear[] = [];
  constructor(
    public exampleDatabase: FinancialYearService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FinancialYear[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getlist();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((financialYear: FinancialYear) => {
            const searchStr = (
              financialYear.financialyear+
              financialYear.description+
              financialYear.isactive
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
 

  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: FinancialYear[]): FinancialYear[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "financialyear":
          [propertyA, propertyB] = [a.financialyear, b.financialyear];
          break;
          case "description":
            [propertyA, propertyB] = [a.description, b.description];
            break; 
            case "isactive":
            [propertyA, propertyB] = [a.isactive, b.isactive];
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
