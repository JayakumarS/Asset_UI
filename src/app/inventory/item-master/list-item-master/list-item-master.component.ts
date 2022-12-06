import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 import {DataSource, SelectionModel} from '@angular/cdk/collections';
 import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ItemMasterService } from '../item-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { ItemMaster } from '../item-master.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DeleteItemComponent } from './delete-item/delete-item.component';



@Component({
  selector: 'app-list-item-master',
  templateUrl: './list-item-master.component.html',
  styleUrls: ['./list-item-master.component.css']
})
export class ListItemMasterComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = ['itemCode','itemName','itemDescription','itemType', 'itemCategory', 'actions'];
  // exampleDatabase: AppService | null;
  dataSource: ExampleDataSource | null;
  exampleDatabase: ItemMasterService | null;
  selection = new SelectionModel<ItemMaster>(true, []);
  index: number;
  id: number;
  itemMaster: ItemMaster | null;
 
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itemMasterService: ItemMasterService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
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
    this.exampleDatabase = new ItemMasterService(this.httpClient,this.serverUrl,this.httpService);
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
    this.router.navigate(['/inventory/item-master/add-item-master/'+row.itemId ]);
  }

  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.itemId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
        
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
// context menu
  onContextMenu(event: MouseEvent, item: ItemMaster) {
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

export class ExampleDataSource extends DataSource<ItemMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ItemMaster[] = [];
  renderedData: ItemMaster[] = [];
  constructor(
    public exampleDatabase: ItemMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ItemMaster[]> {
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
          .filter((itemMaster: ItemMaster) => {
            const searchStr = (
              itemMaster.itemId + 
              itemMaster.itemCode +
              itemMaster.itemName +
              itemMaster.itemDescription +
              itemMaster.itemType +
              itemMaster.itemCategory +
              itemMaster.saleable +              
              itemMaster.purchaseable
             
  
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
  sortData(data: ItemMaster[]): ItemMaster[] {
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
          case "itemId":
          [propertyA, propertyB] = [a.itemId, b.itemId];
          break;
       

          case "itemCode":
          [propertyA, propertyB] = [a.itemCode, b.itemCode];
          break;
       
        case "itemName":
          [propertyA, propertyB] = [a.itemName, b.itemName];
          break;
        case "itemDescription":
          [propertyA, propertyB] = [a.itemDescription, b.itemDescription];
          break;
          case "itemType":
            [propertyA, propertyB] = [a.itemType, b.itemType];
            break;
            case "itemCategory":
              [propertyA, propertyB] = [a.itemCategory, b.itemCategory];
              break;
        case "saleable":
          [propertyA, propertyB] = [a.saleable, b.saleable];
          break;
        case "purchaseable":
          [propertyA, propertyB] = [a.purchaseable, b.purchaseable];
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