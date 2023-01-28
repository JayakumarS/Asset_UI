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
import { Assetcategory } from '../category.model';
import { CategoryMasterService } from '../category.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.sass']
})
export class ListCategoryComponent implements OnInit {

  displayedColumns = [
    "categoryName",
    "Description",
    "isactiveForList",
    "actions"


  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CategoryMasterService | null;
  selection = new SelectionModel<Assetcategory>(true, []);
  index: number;
  id: number;
  category_id: number;
  assetcategory: Assetcategory | null;
  subs: any;
  permissionList: any;
  constructor(    public httpClient: HttpClient,
                  private spinner: NgxSpinnerService,
                  public dialog: MatDialog,
                  public categoryMasterService: CategoryMasterService,
                  private snackBar: MatSnackBar,
                  private serverUrl: serverLocations,
                  private httpService: HttpServiceService,
                  private tokenStorage: TokenStorageService,
                  public commonService: CommonService,
                  public router: Router) {

     }
     @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
     @ViewChild(MatSort, { static: true }) sort: MatSort;
     @ViewChild("filter", { static: true }) filter: ElementRef;
     @ViewChild(MatMenuTrigger)
     contextMenu: MatMenuTrigger;
     contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    const permissionObj = {
      formCode: 'F1023',
      roleId: this.tokenStorage.getRoleId()
    }
    this.spinner.show();
    this.commonService.getAllPagePermission(permissionObj).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.permissionList = data;
        }
      },
      error: (error) => {
        this.spinner.hide();
      }
    });
    this.loadData();
  }
  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CategoryMasterService(this.httpClient,this.serverUrl,this.httpService);
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
    if (this.permissionList?.modify){
      this.router.navigate(['/master/category/add-category/' + row.id]);
    }

  }

  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.categoryMasterService.deletecategory+ "?category_id=" + this.id).subscribe((res: any) => {
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
  onContextMenu(event: MouseEvent, item: Assetcategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}


export class ExampleDataSource extends DataSource<Assetcategory> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Assetcategory[] = [];
  renderedData: Assetcategory[] = [];
  constructor(
    public exampleDatabase: CategoryMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Assetcategory[]> {
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
          .filter((assetcategory: Assetcategory) => {
            const searchStr = (
              assetcategory.categoryName +
              assetcategory.Description +
             assetcategory.parentCategory +
             assetcategory.isactive

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
  sortData(data: Assetcategory[]): Assetcategory[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string  = "";
      let propertyB: number | string  = "";
      switch (this._sort.active) {
        case "categoryName":
          [propertyA, propertyB] = [a.categoryName, b.categoryName];
          break;

          case "Description":
          [propertyA, propertyB] = [a.Description, b.Description];
          break;

          case "parentCategory":
          [propertyA,propertyB]=[a.parentCategory,b.parentCategory];
          break;

          case "isactive":
          [propertyA,propertyB]=[a.isactive,b.isactive];
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
