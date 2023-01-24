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
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TransferAssetService } from '../transfer-asset.service';
import { TransferBean } from '../transfer-model';
import { DeleteTransferComponent } from './delete-transfer/delete-transfer.component';

@Component({
  selector: 'app-list-transfer',
  templateUrl: './list-transfer.component.html',
  styleUrls: ['./list-transfer.component.sass']
})
export class ListTransferComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    
    "statusName",
    "sourceLocation",
    "destinationLocation",
    "transferDate",
    "actions"
  ];

  exampleDatabase:TransferAssetService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<TransferBean>(true, []);
  exporter: any;
  id: number;
  tid:number;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public transferservice:TransferAssetService,
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
 

  public loadData() {
    this.exampleDatabase = new TransferAssetService (this.httpClient,this.serverUrl,this.httpService);
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

    this.router.navigate(['/asset/assetTransfer/addtransfer/'+row.headerID]);
  }

  viewCall(row){
    this.router.navigate(['/asset/assetTransfer/viewtransfer/'+row.headerID]);
  }

  receive(row){
    this.httpService.get(this.transferservice.updateStatus+ "?headerID=" + row.headerID).subscribe((res: any) => {
      this.showNotification(
        "snackbar-success",
        "Received Successfully...!!!",
        "bottom",
        "center"
      );
     // this.loadData();
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  deleteItem(row){
    this.id = row.tid;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteTransferComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      

      if (data.data == true) {
        this.httpService.get(this.transferservice.deleteTransfer+ "?tid=" + this.id).subscribe((res: any) => {
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
  onContextMenu(event: MouseEvent, item: TransferBean) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<TransferBean> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: TransferBean[] = [];
  renderedData: TransferBean[] = [];
  constructor(
    public exampleDatabase: TransferAssetService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TransferBean[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getAllListNew();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((traansferService: TransferBean) => {
            const searchStr = (
             traansferService.tid+
             traansferService.statusName+
             traansferService.department+
             traansferService.location+
             traansferService.transfer+
             traansferService.date+                                                                                                       
             traansferService.remarks+
             traansferService.files
      
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
      
        const sortedData = this.sortData(this.filteredData.slice());
        
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
  sortData(data: TransferBean[]): TransferBean[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "statusName":
          [propertyA, propertyB] = [a.statusName, b.statusName];
          break;
       
          case "department":
          [propertyA, propertyB] = [a.department, b.department];
          break;

          case "location":
          [propertyA,propertyB]=[a.location,b.location];
          break;

          case "transfer":
          [propertyA,propertyB]=[a.transfer,b.transfer];
          break;

          case "date":
            [propertyA,propertyB]=[a.date,b.date];
            break;

            case "remarks":
              [propertyA,propertyB]=[a.remarks,b.remarks];
              break;

            case "files":
                [propertyA,propertyB]=[a.files,b.files];
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
