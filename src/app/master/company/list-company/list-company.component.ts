import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Company } from '../company-model';
import { CompanyService } from '../company.service';
import { SelectionModel } from "@angular/cdk/collections";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.sass']
})
export class ListCompanyComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   
    "companyName",
    "comCountry",
    "shortName",
    "telephoneNo",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CompanyService | null;
  selection = new SelectionModel<Company>(true, []);
  index: number;
  id: number;
  roleId: string;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public companyService: CompanyService,
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
    this.roleId=this.tokenStorage.getRoleId();
    this.loadData();
  }
  
  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  public loadData() {
    this.exampleDatabase = new CompanyService(this.httpClient,this.serverUrl,this.tokenStorage,this.httpService,this.notificationService,);
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
    this.router.navigate(['/master/company/addCompany/'+row.companyId]);
  }

  deleteItem(row){

    this.id = row.companyId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteCompanyComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      

      if (data.data == true) {

        this.httpService.get(this.companyService.deleteCompany+ "?companyId=" + this.id).subscribe((res:any) => {
            if(res.success == true){
              this.showNotification(
                "snackbar-success",
                "Delete Record Successfully...!!!",
                "bottom",
                "center"
              );
            }
            else if(res.success == false){
              this.showNotification(
                "snackbar-danger",
                "You Can't Delete Related Data Exist...!!!",
                "bottom",
                "center");
              // this.loadData();
            }
          
          
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );

      
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

  onContextMenu(event: MouseEvent, item: Company) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}

export class ExampleDataSource extends DataSource<Company> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Company[] = [];
  renderedData: Company[] = [];
  constructor(
    public exampleDatabase: CompanyService,
    public paginator: MatPaginator,
    public _sort: MatSort
    ) {
      super();
      // Reset to the first page when the user changes the filter.
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Company[]> {
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
          .filter((company: Company) => {
            const searchStr = (
              company.companyName +
              company.comCountry +
              company.shortName +
              company.telephoneNo
             
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
  sortData(data: Company[]): Company[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "companyName":
          [propertyA, propertyB] = [a.companyName, b.companyName];
          break;
        //case "departmentName":
         // [propertyA, propertyB] = [a.departmentName, b.departmentName];
         // break;
          case "comCountry":
          [propertyA, propertyB] = [a.comCountry, b.comCountry];
          break;

          case "shortName":
          [propertyA,propertyB]=[a.shortName,b.shortName];
          break;

          case "telephoneNo":
          [propertyA,propertyB]=[a.telephoneNo,b.telephoneNo];
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
