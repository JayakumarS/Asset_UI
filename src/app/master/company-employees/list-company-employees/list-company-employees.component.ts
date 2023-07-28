import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
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
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CompanyService } from '../../company/company.service';
import { Company } from '../company-employees-model';
import { CompanyEmployeeService } from '../company-employees.service';
import { DeleteCompanyEmpComponent } from './delete-company-emp/delete-company-emp.component';
import { AddMultiplecompanyEmployeesComponent } from '../add-multiplecompany-employees/add-multiplecompany-employees.component';
;
@Component({
  selector: 'app-list-company-employees',
  templateUrl: './list-company-employees.component.html',
  styleUrls: ['./list-company-employees.component.sass']
})
export class ListCompanyEmployeesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   
    // "company",
    "employeeId",
    "branch",
    "fullName",
    "phoneno",
    "emailId",
    "department",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CompanyEmployeeService | null;
  selection = new SelectionModel<Company>(true, []);
  index: number;
  id: number;
  company: string;
  url: string;
  widgets:boolean =false
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public companyEmployeeService: CompanyEmployeeService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    public routing:ActivatedRoute,
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
    this.url=this.router.url;
    if(this.url.includes("addCompany")){
      this.widgets = true
    }else if(this.url.includes('listCompanyEmp')){
      this.widgets = false
    };
    
  }
  
  
  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  public loadData() {
    this.exampleDatabase = new CompanyEmployeeService(this.httpClient,this.serverUrl,this.tokenStorage,this.httpService,);
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
    this.url=this.router.url;
    if(this.url.includes("addCompany")){
    window.sessionStorage.setItem("CompanyFrom", "company");
    this.router.navigate(['/master/Company-Employees/addCompanyEmp/'+row.id]);
    }else if(this.url.includes('listCompanyEmp')){
    window.sessionStorage.setItem("CompanyFrom", "normal");
    this.router.navigate(['/master/Company-Employees/addCompanyEmp/'+row.id]);
    };
    // this.router.navigate(['/master/Company-Employees/addCompanyEmp/' + row.id]);

  }


  multipleuploadpopupCall() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(AddMultiplecompanyEmployeesComponent, {
      data: {
        action: "edit",
      },
      width: "640px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 0) {
        this.refreshTable();
        this.showNotification(
          "black",
          "Upload Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  deleteItem(row){
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteCompanyEmpComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.companyEmployeeService.deletecategory+ "?id=" + this.id).subscribe((res: any) => {
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

  onContextMenu(event: MouseEvent, item: Company) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }


  addEmp(){
    this.company= this.tokenStorage.getCompanyId();
    this.url=this.router.url;
    if(this.url.includes("addCompany")){
    window.sessionStorage.setItem("CompanyFrom", "company");
    this.router.navigate(['/master/Company-Employees/addCompanyEmp/0']);
    }else if(this.url.includes('listCompanyEmp')){
    window.sessionStorage.setItem("CompanyFrom", "normal");
    this.router.navigate(['/master/Company-Employees/addCompanyEmp/0']);
    };
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
    public exampleDatabase: CompanyEmployeeService,
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
              // company.company +
              company.employeeId +
              company.branch +
              company.phoneno +
              company.emailId +
              company.department +
              company.active 

             
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
       
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }

}

