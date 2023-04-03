import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DepartmentMasterService} from '../department-master.service'
import { DepartmentMaster} from '../department-master.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { AddMultipleDepartmentComponent } from '../add-multiple-department/add-multiple-department.component';

@Component({
  selector: 'app-list-department-master',
  templateUrl: './list-department-master.component.html',
  styleUrls: ['./list-department-master.component.sass']
})
export class ListDepartmentMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  displayedColumns = [

    "deptCode",
    "departmentName",
    "company",
    "branchname",
    "departmentHead",
    //"contactPerson",
    "isactiveForList",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: DepartmentMasterService | null;
  selection = new SelectionModel<DepartmentMaster>(true, []);
  index: number;
  id: number;
  permissionList: any;
  customerMaster: DepartmentMaster | null;
  url: string;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public departmentMasterService: DepartmentMasterService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    public router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    const permissionObj = {
      formCode: 'F1038',
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
    this.exampleDatabase = new DepartmentMasterService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
      this.url=this.router.url;
      if(this.url.includes("addCompany")){
      window.sessionStorage.setItem("DepartMentFrom", "department");
      this.router.navigate(['/master/department-Master/add-department/'+row.deptId]);
    }else if(this.url.includes('list-department')){
      window.sessionStorage.setItem("DepartMentFrom", "normal");
      this.router.navigate(['/master/department-Master/add-department/'+row.deptId]);
    };
    }
  }



  addDept(){
    this.url=this.router.url;
    if(this.url.includes("addCompany")){
    window.sessionStorage.setItem("DepartMentFrom", "department");
    this.router.navigate(['/master/department-Master/add-department/0']);
    }else if(this.url.includes('list-department')){
    window.sessionStorage.setItem("DepartMentFrom", "normal");
    this.router.navigate(['/master/department-Master/add-department/0']);
    };
  }

  deleteItem(row){

    this.id = row.deptId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDepartmentComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.departmentMasterService.deleteDepartment+ "?departmentCode=" + this.id).subscribe((res: any) => {
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }



// context menu
  onContextMenu(event: MouseEvent, item: DepartmentMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }


multipleUploadPopupCall() {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(AddMultipleDepartmentComponent, {
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
}

export class ExampleDataSource extends DataSource<DepartmentMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DepartmentMaster[] = [];
  renderedData: DepartmentMaster[] = [];
  constructor(
    public exampleDatabase: DepartmentMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DepartmentMaster[]> {
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
          .filter((departmentMaster: DepartmentMaster) => {
            const searchStr = (
              departmentMaster.deptCode +
             // departmentMaster.departmentName +
              departmentMaster.departmentHead +
              departmentMaster.remarks

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
  sortData(data: DepartmentMaster[]): DepartmentMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "deptCode":
          [propertyA, propertyB] = [a.deptCode, b.deptCode];
          break;
        //case "departmentName":
         // [propertyA, propertyB] = [a.departmentName, b.departmentName];
         // break;
          case "departmentHead":
          [propertyA, propertyB] = [a.departmentHead, b.departmentHead];
          break;

          case "company":
            [propertyA, propertyB] = [a.company, b.company];
            break;
            case "branchname":
            [propertyA, propertyB] = [a.branchname, b.branchname];
            break;
          case "remarks":
            [propertyA,propertyB]=[a.remarks,b.remarks];
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
