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
import { serverLocations } from 'src/app/auth/serverLocations';

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
export class ListInventoryReportsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  companyId: any;
  inventoryReport: InventoryReports;
  categoryList = [];
  itemCodeNameList = [];

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('subSort') subSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
  @ViewChildren('subTables') subTables: QueryList<MatTable<Block>>;

  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ["assetItem",
    "categoryName",
    "quantity"];
  innerDisplayedColumns = ["assetName",
    "assetCode",
    "putToUseDate",
    "assetLocation",
    "assetUser"];
  subBlockDisplayedColumns = ["sourceLocation", "destinationLocation", "reference"];
  expandedElement: User | null;
  expandedSubElement: Address | null;
  total: any;



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
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations
  ) {
    super();
    {
    }
    this.docForm = this.fb.group({
      item: [""],
      category: [""],
      totalQty:[""],
      companyId: parseInt(this.tokenStorage.getCompanyId()),
    });
  }


  ngOnInit(): void {
    this.viewReport();
    this.companyId = parseInt(this.tokenStorage.getCompanyId());
    // Location dropdown
    this.httpService.get<any>(this.commonService.getCategoryDropdown + "?companyId=" + this.companyId).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {

      }
    }
    );

    //Item Master Dropdown List
    this.httpService.get<any>(this.commonService.getItemMasterNameWithItemCodeDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.itemCodeNameList = data;
      },
      error: (error) => {

      }
    }
    );

  }

  viewReport() {
    this.inventoryReport = this.docForm.value;
    this.usersData = [];
    this.spinner.show();
    this.inventoryReportService
      .getInventoryReport(this.inventoryReport)
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.total=0;
          for(let i=0;i<res.inventoryReportsDetails.length;i++){
            this.total+= res.inventoryReportsDetails[i].totalqty;
          }
          if (res != null) {
            res?.inventoryReportsDetails.forEach((user) => {
              if (
                user.addresses &&
                Array.isArray(user.addresses) &&
                user.addresses.length
              ) {
                const addresses: Address[] = [];
        
                user.addresses.forEach((address) => {
                  if (Array.isArray(address.blocks)) {
                    addresses.push({
                      ...address,
                      blocks: new MatTableDataSource(address.blocks),
                    });
                  }
                });
        
                this.usersData.push({
                  ...user,
                  addresses: new MatTableDataSource(addresses),
                });
              } else {
                this.usersData = [...this.usersData, user];
              }
            });
            this.dataSource = new MatTableDataSource(this.usersData);
            this.dataSource.sort = this.sort;
          }
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


  exporttoExcelReport() {
    this.inventoryReport = this.docForm.value;
    this.spinner.show();
    this.inventoryReportService.getInventoryReportExcelExport(this.inventoryReport).subscribe({
        next: (data: any) => {
          this.spinner.hide();
          if (data != null) {
            if(data.success){
              window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.inventoryReportFilePath, '_blank');
              }
              else{
                this.showNotification(
                  "snackbar-danger",
                  "Failed to Generate Inventory Report Excel",
                  "bottom",
                  "center"
                );
              }
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            "Failed to Generate Inventory Report Excel",
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
    sessionStorage.setItem("category", this.inventoryReport.category);
    this.router.navigate([
      "/inventory/inventory-reports/print-inventory-report",
    ]);
  }

  reset() {
    this.docForm = this.fb.group({
      item: [""],
      category: [""],
      companyId: parseInt(this.tokenStorage.getCompanyId()),
    });
    this.viewReport();
  }



  toggleRow(element: User) {
    element.addresses &&
      (element.addresses as MatTableDataSource<Address>).data.length
      ? (this.expandedElement =
        this.expandedElement === element ? null : element)
      : null;

    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
      ((table.dataSource as MatTableDataSource<Address>).sort =
        this.innerSort.toArray()[index])
    );
  }

  toggleSubRow(element: Address) {
    element.blocks && (element.blocks as MatTableDataSource<Block>).data.length
      ? (this.expandedSubElement =
        this.expandedSubElement === element ? null : element)
      : null;

    this.cd.detectChanges();
    this.subTables.forEach(
      (table, index) =>
      ((table.dataSource as MatTableDataSource<Block>).sort =
        this.subSort.toArray()[index])
    );
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
      ((table.dataSource as MatTableDataSource<Address>).filter = filterValue
        .trim()
        .toLowerCase())
    );
  }
}

export interface User {
  assetItem: string;
  categoryName: string;
  totalqty: string;
  addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Address {
  assetItem: string;
  categoryName: string;
  totalqty: string;
  blocks?: Block[] | MatTableDataSource<Block>;
}

export interface Block {
  sourceLocation: string;
  destinationLocation: string;
  reference: string;
}

export interface UserDataSource {
  assetItem: string;
  categoryName: string;
  totalqty: string;
  addresses?: MatTableDataSource<Address>;
}

