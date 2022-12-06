import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ItemCategory} from 'src/app/inventory/item-category/item-category.models';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { ItemCategoryService } from 'src/app/inventory/item-category/item-category.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { FormDialogComponent } from 'src/app/admin/employees/allEmployees/dialogs/form-dialog/form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteItemCategoryComponent } from './delete-item-category/delete-item-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = ['categoryName', 'parentTypeName', 'categoryTypeName', 'actions'];
  // exampleDatabase: AppService | null;
  dataSource: ExampleDataSource | null;
  exampleDatabase: ItemCategoryService | null;
  selection = new SelectionModel<ItemCategory>(true, []);
  itemProperties:ItemCategory|null;
  id : number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itemCategoryService: ItemCategoryService,
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
    this.exampleDatabase = new ItemCategoryService(this.httpClient, this.serverUrl, this.httpService);
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

    this.router.navigate(['/inventory/item-category/add-category/'+row.itemCategoryId]);

  }

  deleteItem(row){ 
    this.id = row.itemCategoryId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteItemCategoryComponent, {
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
  onContextMenu(event: MouseEvent, item: ItemCategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<ItemCategory> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ItemCategory[] = [];
  renderedData: ItemCategory[] = [];

  constructor(public _exampleDatabase: ItemCategoryService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ItemCategory[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      //this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllList();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((itemCategory: ItemCategory) => {
          const searchStr = (itemCategory.categoryName +itemCategory.parentTypeName + itemCategory.categoryTypeName).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: ItemCategory[]): ItemCategory[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'categoryName': [propertyA, propertyB] = [a.categoryName, b.categoryName]; break;
        case 'parentTypeName': [propertyA, propertyB] = [a.parentTypeName, b.parentTypeName]; break;
        case 'categoryTypeName': [propertyA, propertyB] = [a.categoryTypeName, b.categoryTypeName]; break;
      
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}

