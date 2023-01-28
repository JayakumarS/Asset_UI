import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import { AuditableAssetService } from '../auditable-asset.service';
import { Router } from '@angular/router';
import { DeleteLocationComponent } from 'src/app/master/location/list-location/delete-location/delete-location.component';
import { AuditableAsset } from '../auditable-asset-model';
import { DeleteScheduleActivityComponent } from 'src/app/admin/schedule-activity/list-schedule-activity/delete-schedule-activity/delete-schedule-activity.component';
import { AuditableAssetPopUpComponent } from '../auditable-asset-pop-up/auditable-asset-pop-up.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-list-auditable-asset',
  templateUrl: './list-auditable-asset.component.html',
  styleUrls: ['./list-auditable-asset.component.sass']
})
export class ListAuditableAssetComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "slno",
    "assetid",
    "assetname",
    "acquisitiondt",
    "currency",
    "acquisitionvalue",
    "accudepreciation",
    "bookvalue",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: AuditableAssetService | null;
  selection = new SelectionModel<AuditableAsset>(true, []);
  index: number;
  id: number;
  docForm: FormGroup;
  permissionList: any;
  locationMaster: AuditableAsset | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public locationMasterService: AuditableAssetService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private router: Router,
    private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    private fb: FormBuilder
  ) {
    super();

    this.docForm = this.fb.group({
      financial_year: [""],
      currentFinancialYear: [""],
      previousFinancialYear:[""]
    });

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    const permissionObj = {
      formCode: 'F1002',
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
    this.onSubmit();
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new AuditableAssetService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm
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
    this.router.navigate(['/audit/auditableAsset/addAuditableAsset/'+row.assetid]);
    }
  }

  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  financialYearPatch(event:any){
    this.docForm.patchValue({
      'financial_year': event.value,
   })
  }

  onSubmit(){

    this.locationMaster = this.docForm.value;
    console.log(this.locationMaster);
    this.loadData();
}

  viewCall(row) {
    // this.index = i;
    this.id = row.scheduleId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(AuditableAssetPopUpComponent, {
      // height: "480px",
      // width: "800px",
      data: row,
      direction: tempDirection,
    });
  }

 deleteItem(i, row) {
    this.index = i;
    this.id = row.scheduleId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteScheduleActivityComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

      this.loadData();
      if(data==1)[
        this.showNotification(
          "snackbar-success",
          " Successfully deleted",
          "bottom",
          "center"
        )
        ]
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
  // showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
  //   throw new Error('Method not implemented.');
  // }

  // private refreshTable() {
  //   this.paginator._changePageSize(this.paginator.pageSize);
  // }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, " ", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// context menu

  onContextMenu(event: MouseEvent, item: AuditableAsset) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<AuditableAsset> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AuditableAsset[] = [];
  renderedData: AuditableAsset[] = [];
  constructor(
    public exampleDatabase: AuditableAssetService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AuditableAsset[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((locationMaster: AuditableAsset) => {
            const searchStr = (
              locationMaster.slno +
              locationMaster.assetid +
              locationMaster.assetname +
              locationMaster.acquisitiondt +
              locationMaster.currency +
              locationMaster.acquisitionvalue +
              locationMaster.accudepreciation +
              locationMaster.bookvalue

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
  sortData(data: AuditableAsset[]): AuditableAsset[] {
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
        case "slno":
          [propertyA, propertyB] = [a.slno, b.slno];
          break;
        case "assetid":
          [propertyA, propertyB] = [a.assetid, b.assetid];
          break;
        case "assetname":
          [propertyA, propertyB] = [a.assetname, b.assetname];
          break;
          case "acquisitiondt":
          [propertyA, propertyB] = [a.acquisitiondt, b.acquisitiondt];
          break;
        case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
          break;
        case "acquisitionvalue":
          [propertyA, propertyB] = [a.acquisitionvalue, b.acquisitionvalue];
          break;
          case "accudepreciation":
          [propertyA, propertyB] = [a.accudepreciation, b.accudepreciation];
          break;
        case "bookvalue":
          [propertyA, propertyB] = [a.bookvalue, b.bookvalue];
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