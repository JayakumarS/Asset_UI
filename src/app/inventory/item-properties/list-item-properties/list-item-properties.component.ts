import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
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
import { FormDialogComponent } from 'src/app/admin/employees/allEmployees/dialogs/form-dialog/form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemProperties } from '../item-properties-model';
import { ItemPropertiesService } from '../item-properties.service';
import { DeleteItemPropertiesComponent } from './delete-item-properties/delete-item-properties.component';

@Component({
  selector: 'app-list-item-properties',
  templateUrl: './list-item-properties.component.html',
  styleUrls: ['./list-item-properties.component.sass']
})
export class ListItemPropertiesComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  displayedColumns = ['text', 'propertyName','typeName','defaultValue','actions'];
  // exampleDatabase: AppService | null;
  dataSource: ExampleDataSource | null;
  exampleDatabase: ItemPropertiesService | null;
  selection = new SelectionModel<ItemProperties>(true, []);
  itemProperties:ItemProperties|null;
  id : number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itemPropertiesService: ItemPropertiesService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    public route: ActivatedRoute
  ) 
  { 
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
    this.exampleDatabase = new ItemPropertiesService(this.httpClient, this.serverUrl, this.httpService);
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

    this.router.navigate(['/inventory/item-properties/add-itemproperties/'+row.itemPropertyId]);

  }

  deleteItem(row){ 
    this.id = row.itemPropertyId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteItemPropertiesComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
        this.showNotification(
          "snackbar-success",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      
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

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
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
  onContextMenu(event: MouseEvent, item: ItemProperties) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<ItemProperties> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ItemProperties[] = [];
  renderedData: ItemProperties[] = [];
  constructor(
    public exampleDatabase: ItemPropertiesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ItemProperties[]> {
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
          .filter((itemProperties: ItemProperties) => {
            const searchStr = (
              itemProperties.propertyType +
              itemProperties.type +
              itemProperties.propertyName +
              itemProperties.length +
              itemProperties.value +
              itemProperties.defaultValue +
              itemProperties.active +
              itemProperties.itemPropertyId +
              itemProperties.text + 
              itemProperties.typeName
             
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
  sortData(data: ItemProperties[]): ItemProperties[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "propertyType":
          [propertyA, propertyB] = [a.propertyType, b.propertyType];
          break;
        case "type":
          [propertyA, propertyB] = [a.type, b.type];
          break;
        case "propertyName":
          [propertyA, propertyB] = [a.propertyName, b.propertyName];
          break;
        case "length":
          [propertyA, propertyB] = [a.length, b.length];
          break;
        case "value":
          [propertyA, propertyB] = [a.value, b.value];
          break;
        case "defaultValue":
          [propertyA, propertyB] = [a.defaultValue, b.defaultValue];
          break;
        case "itemPropertyId":
          [propertyA, propertyB] = [a.itemPropertyId, b.itemPropertyId];
          break; 
        case "text":
          [propertyA, propertyB] = [a.text, b.text];
          break;  
        case "typeName":
          [propertyA, propertyB] = [a.typeName, b.typeName];
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
