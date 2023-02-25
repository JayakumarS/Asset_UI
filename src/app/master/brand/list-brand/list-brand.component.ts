import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Brand } from '../brand.model';
import { BrandMasterService } from '../brand.service';
import { DeleteBranchComponent } from './delete-branch/delete-branch.component';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.sass']
})
export class ListBrandComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "brand",
    "Description",
    "actions"


  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: BrandMasterService | null;
  selection = new SelectionModel<Brand>(true, []);
  index: number;
  id: number;
  category_id: number;
  brand: Brand | null;
  permissionList: any;
  constructor(    public httpClient: HttpClient,
                  private spinner: NgxSpinnerService,
                  public dialog: MatDialog,
                  public brandMasterService: BrandMasterService,
                  private snackBar: MatSnackBar,
                  private serverUrl: serverLocations,
                  private httpService: HttpServiceService,
                  private tokenStorage: TokenStorageService,
                  public commonService: CommonService,
                  public router: Router) {
                    super()

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
    this.exampleDatabase = new BrandMasterService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
      this.router.navigate(['/master/brand/addBrand/' + row.brand_id]);
    

  }

  deleteItem(row){

    this.id = row.brand_id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteBranchComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.brandMasterService.deletecategory+ "?id=" + this.id).subscribe((res: any) => {
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
  onContextMenu(event: MouseEvent, item: Brand) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}


export class ExampleDataSource extends DataSource<Brand> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Brand[] = [];
  renderedData: Brand[] = [];
  constructor(
    public exampleDatabase: BrandMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Brand[]> {
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
          .filter((brand: Brand) => {
            const searchStr = (
              brand.brand
              

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
  sortData(data: Brand[]): Brand[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string  = "";
      let propertyB: number | string  = "";
      switch (this._sort.active) {
        case "brand":
          [propertyA, propertyB] = [a.brand, b.brand];
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


