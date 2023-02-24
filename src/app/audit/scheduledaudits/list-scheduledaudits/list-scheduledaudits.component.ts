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
import { Router } from '@angular/router';
import { ScheduledauditsService } from '../scheduledaudits.service';
import { ScheduledAudit } from '../scheduledaudits-model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
   selector: 'app-list-scheduledaudits',
  templateUrl: './list-scheduledaudits.component.html',
  styleUrls: ['./list-scheduledaudits.component.sass']
 })
 export class ListScheduledauditsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  isChecker=false;
  isMaker=false;
  isCompany=false;

  dataSource: ExampleDataSource | null;
  exampleDatabase: ScheduledauditsService | null;
  selection = new SelectionModel<ScheduledAudit>(true, []);
  index: number;
  id: number;
  edit:boolean=false;
  permissionList: any;
  displayedColumns: any;
  scheduledAudit: ScheduledAudit | null;
  roleId: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public scheduledauditsService: ScheduledauditsService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    private router: Router
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
    
    if (this.roleId=='2') {
      this.isCompany=true;
      this.isMaker=false;
      this.isChecker=false;
      this.displayedColumns = [
        "manageAuditNo", "auditName","startDate","endDate",
        "companyStatus","auditType","companyActions"
      ];
    } else if (this.roleId=='3') {
      this.isChecker=true;
      this.isMaker=false;
      this.isCompany=false;
      this.displayedColumns = [
        "manageAuditNo", "auditName","startDate","endDate",
        "checkerStatus","auditType","checkerActions"
      ];
    } else if (this.roleId=='4') {
      this.isMaker=true;
      this.isChecker=false;
      this.isCompany=false;
      this.displayedColumns = [
        "manageAuditNo", "auditName","startDate","endDate",
        "makerStatus","auditType","makerActions"
      ];
    }
    
    const permissionObj = {
      formCode: 'F1003',
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
    this.exampleDatabase = new ScheduledauditsService(this.httpClient, this.serverUrl, this.httpService, this.tokenStorage);
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
      if (this.roleId=='2') {
        if (row.companyStatus=='Pending') {
          this.router.navigate(['/audit/scheduledaudits/add-scheduledaudits/' + row.manageAuditId]);
        }
      } else if (this.roleId=='3') {
        if (row.checkerStatus=='Pending') {
          this.router.navigate(['/audit/scheduledaudits/add-scheduledaudits/' + row.manageAuditId]);
        }
      } else if (this.roleId=='4') {
        if (row.makerStatus=='Pending') {
          this.router.navigate(['/audit/scheduledaudits/add-scheduledaudits/' + row.manageAuditId]);
        }
      }
  }
}
  viewCall(row) {
    this.router.navigate(['/audit/scheduledaudits/scheduled-view/' + row.manageAuditId]);
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
  onContextMenu(event: MouseEvent, item: ScheduledAudit) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<ScheduledAudit> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ScheduledAudit[] = [];
  renderedData: ScheduledAudit[] = [];
  constructor(
    public exampleDatabase: ScheduledauditsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ScheduledAudit[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllLists();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((scheduledAudit: ScheduledAudit) => {
            const searchStr = (
              scheduledAudit.auditName +
              scheduledAudit.manageAuditNo +
              scheduledAudit.startDate +
              scheduledAudit.endDate +
              scheduledAudit.makerStatus +
              scheduledAudit.checkerStatus +
              scheduledAudit.companyStatus +
              scheduledAudit.auditType

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
  sortData(data: ScheduledAudit[]): ScheduledAudit[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "auditName":
          [propertyA, propertyB] = [a.auditName, b.auditName];
          break;
        case "manageAuditNo":
          [propertyA, propertyB] = [a.manageAuditNo, b.manageAuditNo];
          break;
        case "startDate":
          [propertyA, propertyB] = [a.startDate, b.startDate];
          break;

        case "endDate":
          [propertyA, propertyB] = [a.endDate, b.endDate];
          break;
          case "makerStatus":
            [propertyA, propertyB] = [a.makerStatus, b.makerStatus];
            break;
            case "checkerStatus":
            [propertyA, propertyB] = [a.makerStatus, b.makerStatus];
            break;
            case "companyStatus":
            [propertyA, propertyB] = [a.makerStatus, b.makerStatus];
            break;
          case "auditType":
          [propertyA, propertyB] = [a.auditType, b.auditType];
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


