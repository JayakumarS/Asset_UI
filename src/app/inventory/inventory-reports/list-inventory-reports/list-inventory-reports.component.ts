import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { CommonService } from "src/app/common-service/common.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { InventoryReports } from "../inventory-reports-model";
import { InventoryReportsService } from "../inventory-reports.service";



/**
 * @title Table with expandable rows
 */
@Component({
  selector: "app-list-inventory-reports",
  templateUrl: "./list-inventory-reports.component.html",
  styleUrls: ["./list-inventory-reports.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListInventoryReportsComponent extends UnsubscribeOnDestroyAdapter
    implements OnInit
  {
    @ViewChild("outerSort", { static: true }) sort: MatSort;
    @ViewChildren("innerSort") innerSort: QueryList<MatSort>;
    @ViewChildren("innerTables") innerTables: QueryList<MatTable<SubList>>;
  
    dataSource: MatTableDataSource<MainList>;
    table: boolean = false;
    //dataSource: ExampleDataSource | null;
    exampleDatabase: InventoryReportsService | null;
    selection = new SelectionModel<InventoryReports>(true, []);
    index: number;
    id: number;
    InventoryReport: InventoryReports | null;
    groupHeadList = [];
    docForm: FormGroup;
    itemList = [];
    inventoryReport: InventoryReports;
    countValue: any;
    viewReportList: any;
    isTblLoading: boolean;
    locationList = [];
    mainList = [];
    companyId: any;
    isExpand: boolean = true;
  
    columnsToDisplay = [
      "icon",
      "assetItem",
      "categoryName",
      "quantity",
    ];
    innerDisplayedColumns = [
      "assetName",
      "assetCode",
      "putToUseDate",
      "assetLocation",
      "assetUser",
      "sourceLocation",
      "destinationLocation",
      "reference"
    ];
  
    expandedElement: MainList | null;
    expandedElements: any[] = [];
    innerExpandedElements: any[] = [];
    glList = [];
    gllist: MainList[] = [];
    locationDdList: any;
    itemNameDdList: any;
  
    constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      private httpService: HttpServiceService,
      public router: Router,
      private fb: FormBuilder,
      private inventoryReportService: InventoryReportsService,
      private cmnService: CommonService,
      private cd: ChangeDetectorRef,
      private commonService: CommonService,
      private tokenStorage: TokenStorageService,
      private spinner: NgxSpinnerService,
      private snackBar: MatSnackBar
    ) {
      super();
      {
      }
      this.docForm = this.fb.group({
        item: [""],
        fromDateObj: [""],
        toDateObj: [""],
        fromDate: [""],
        toDate: [""],
        location: [""],
        companyId: parseInt(this.tokenStorage.getCompanyId()),
      });
    }
  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild("filter", { static: true }) filter: ElementRef;
    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    contextMenuPosition = { x: "0px", y: "0px" };
    

  ngOnInit(): void {
    this.viewReport();
    this.companyId = parseInt(this.tokenStorage.getCompanyId());
    // Location dropdown
    this.httpService
      .get<any>(
        this.commonService.getMoveToDropdown + "?companyId=" + this.companyId
      )
      .subscribe({
        next: (data) => {
          this.locationDdList = data;
        },
        error: (error) => {},
      });
    this.httpService
      .get<any>(
        this.commonService.getassetname + "?companyId=" + this.companyId
      )
      .subscribe({
        next: (data) => {
          this.itemNameDdList = data;
        },
        error: (error) => {},
      });
  }

  getDateString(event, inputFlag) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == "fromDate") {
      this.docForm.patchValue({ fromDate: cdate });
    } else if (inputFlag == "toDate") {
      this.docForm.patchValue({ toDate: cdate });
    }
  }

  viewReport() {
    this.inventoryReport = this.docForm.value;
    this.mainList = [];
    this.gllist = [];
    this.spinner.show();
    this.inventoryReportService
      .getInventoryReport(this.inventoryReport)
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.mainList = res.inventoryReportsDetails;
          if (this.mainList != null) {
            this.mainList.forEach((data) => {
              if (
                data.subList &&
                Array.isArray(data.subList) &&
                data.subList.length
              ) {
                this.gllist = [
                  ...this.gllist,
                  { ...data, subList: new MatTableDataSource(data.subList) },
                ];
              } else {
                this.gllist = [...this.gllist, data];
              }
            });
          }
          this.dataSource = new MatTableDataSource(this.gllist);
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        },
      });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  profileView(id) {
    sessionStorage.setItem("Inventory", "true");
    this.router.navigate(["/asset/assetMaster/viewAssetMaster/" + id]);
  }

  print() {
    this.inventoryReport = this.docForm.value;

    sessionStorage.setItem("item", this.inventoryReport.item);
    sessionStorage.setItem("location", this.inventoryReport.location);
    sessionStorage.setItem("dateValue", this.inventoryReport.fromDate);
    this.router.navigate([
      "/inventory/inventory-reports/print-inventory-report",
    ]);
  }

  reset() {
    this.docForm = this.fb.group({
      item: [""],
      fromDateObj: [""],
      toDateObj: [""],
      fromDate: [""],
      toDate: [""],
      location: [""],
      companyId: parseInt(this.tokenStorage.getCompanyId()),
    });
    this.mainList = [];
    this.gllist = [];
    this.isExpand = false;
    this.viewReport();
  }

  toggleRow(element: MainList) {
    element.subList && (element.subList as MatTableDataSource<SubList>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<SubList>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<SubList>).filter = filterValue.trim().toLowerCase());
  }
}


export interface MainList {
  assetName: String;
  location: String;
  categoryName: String;
  quantity: String;
  subList?: SubList[] | MatTableDataSource<SubList>;
}

export interface SubList {
  putToUseDate: String;
  transferQuantity: String;
  sourceLocation: String;
  destinationLocation: String;
}


export interface MainListDataSource {
  assetName: String;
  location: String;
  categoryName: String;
  quantity: String;
  subList?: MatTableDataSource<SubList>;
}