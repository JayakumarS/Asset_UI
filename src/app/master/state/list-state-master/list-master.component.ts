import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { DeleteCompanyComponent } from '../../company/list-company/delete-company/delete-company.component';
import { StateMaster } from '../state-model';
import { StateServiceService } from '../state-service.service';
import { DeleteStateComponent } from './delete-state/delete-state.component';

@Component({
  selector: 'app-list-master',
  templateUrl: './list-master.component.html',
  styleUrls: ['./list-master.component.sass']
})
export class ListMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "stateCode",
    "statename",
    // "country",
    "actions",
  ];
  exampleDatabase:StateServiceService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<StateMaster>(true, []);
  exporter: any;
  index: any;
  id: any;

  constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public stateServiceService:StateServiceService,
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


  onContextMenu(event: MouseEvent, item: StateMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

public loadData() {
  this.exampleDatabase = new StateServiceService (this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
editCall(row){
this.router.navigate(['/master/stateMaster/addStateMaster/'+row.state_id]);
}
deleteItem(index,row) {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
   tempDirection = "rtl";
 } else {
   tempDirection = "ltr";
 }
  const dialogRef = this.dialog.open(DeleteStateComponent, {
   height: "270px",
   width: "400px",
   data: row,
   direction: tempDirection,
   disableClose: true
 });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
   if (data.data == true) {
     const obj = {
       deletingId: row.state_id
     }
     this.stateServiceService.deleteCustomer(obj).subscribe({
      next: (data) => {
        if (data.success) {
          this.loadData();
          this.showNotification(
            "snackbar-success",
            "Delete Record Successfully...!!!",
            "bottom",
            "center"
           );
         }
       },
       error: (error) => {
       }
     });

   }
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
}


export class ExampleDataSource extends DataSource<StateMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: StateMaster[] = [];
  renderedData: StateMaster[] = [];
  constructor(
    public exampleDatabase: StateServiceService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<StateMaster[]> {
   
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
          .filter((stateMaster: StateMaster) => {
            const searchStr = (
              stateMaster.stateName+
              stateMaster.stateCode+
              stateMaster.country+
              stateMaster.isactive
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
  sortData(data: StateMaster[]): StateMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "stateName":
          [propertyA, propertyB] = [a.stateName, b.stateName];
          break;
          case "stateCode":
            [propertyA, propertyB] = [a.stateCode, b.stateCode];
            break; 
            case "country":
            [propertyA, propertyB] = [a.country, b.country];
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


