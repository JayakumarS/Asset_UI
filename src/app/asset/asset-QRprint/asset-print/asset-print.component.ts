import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AssetPrintReport } from '../asset-QRprint-model';
import { AssetPrintService } from '../asset-QRprint.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AssetService } from '../../asset-master/asset.service';

@Component({
  selector: 'app-asset-print',
  templateUrl: './asset-print.component.html',
  styleUrls: ['./asset-print.component.sass']
})
export class AssetPrintComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
  
   "select",
    "assetName",
    "assetCode",
    "Location",
    "Category",
    "status",
    
  ];
  
  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;


  branchList = [];
  categoryList = [];
  locationDdList = [];
  departmentDdList = [];
  brandDdList = [];
  statusDdList = [];
  assetprintlist =[];
  assetPrintReport  : AssetPrintReport | null;
  
  dataSource: ExampleDataSource | null;
  exampleDatabase: AssetPrintService | null;
  selection = new SelectionModel<AssetPrintReport>(true, []);
  checkedId: boolean = false;
  checked: boolean = false;
  checkbox1:boolean = false;
  checkedIDs: any[];
  index: number;
  permissionList: any;

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private router:Router,
    private assetService: AssetService,
    private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private httpClient:HttpClient,
    private assetPrintService: AssetPrintService,
    private tokenStorage: TokenStorageService,
    private serverUrl:serverLocations)
     {
      
    super();
      this.docForm = this.fb.group({
        branchId:[""],
        category:[""],
        location:[""],
        department:[""],
        brand:[""],
        status:[""],
        companyId:this.tokenStorage.getCompanyId(),
      
      }); 
  }
 

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.docForm = this.fb.group({
      branchId:[""],
      category:[""],
      location:[""],
      department:[""],
      brand:[""],
      status:[""],
      companyId:this.tokenStorage.getCompanyId(),
    
    }); 
    
     //Branch List
     this.httpService.get<any>(this.commonService.getBranchByCompany+"?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.branchList = data.addressBean;
      },
      error: (error) => {
      }
    });
    
    //Category List
    this.httpService.get<any>(this.commonService.getAssetCategoryDropdown+"?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
      }
    }
    );

    // Location dropdown
    this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );
    // Brand dropdown
  this.httpService.get<any>(this.commonService.getBrandDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
    next: (data) => {
      this.brandDdList = data;
    },
    error: (error) => {

    }
  }
  );
    // Status Dropdown list
    this.httpService.get<any>(this.commonService.getStatusDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.statusDdList = data;
      },
      error: (error) => {
  
      }
    }
    );
     // department Dropdown list
     this.httpService.get<any>(this.commonService.getDepartmentDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.departmentDdList = data;
      },
      error: (error) => {
  
      }
    }
    );
    this.loadData();

  
    
  }

  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  public loadData() {
    this.exampleDatabase = new AssetPrintService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
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

 
  onSubmit(){
    this.assetPrintReport = this.docForm.value;
    this.loadData();
    
  }
  checkAll(ev) {
    if (ev.target.checked) {
      this.checkbox1 == true;
       
    } else {
      this.checkbox1 == false;
        
    }
}
  assetQRcodeExportPdf() {
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
    });
    this.checkedIDs = [];
    if(this.selection.selected.length>=1){
      for (let i = 0; i < this.selection.selected.length; i++) {
        this.checkedIDs.push(this.selection.selected[i].id);
      }
    }
    const obj={
      checkedAssetListIDs: this.checkedIDs,
      companyId: this.tokenStorage.getCompanyId()
    }
    this.spinner.show();
    this.assetService.assetQRcodeExportPdf(obj).pipe().subscribe({
      next: (result: any) => {
        this.spinner.hide();
        if(result!=null){
          var file = new Blob([result], { type: 'application/pdf' });
          var fileURL = window.URL.createObjectURL(file);
          window.open(fileURL);
          this.checkedIDs = [];
          this.selection = new SelectionModel<AssetPrintReport>(true, []);
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          "Failed to Print QR code",
          "bottom",
          "center"
        );
      }
    });
  }
  showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }
// checkState = ("#checkboxId").is(":checked") ? "true" : "false";


  reset(){
    location.reload()
  }

   // context menu
   onContextMenu(event: MouseEvent, item: AssetPrintReport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}



export class ExampleDataSource extends DataSource<AssetPrintReport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AssetPrintReport[] = [];
  renderedData: AssetPrintReport[] = [];
  constructor(
    public exampleDatabase: AssetPrintService,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AssetPrintReport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
    ];
    this.exampleDatabase.assetListUrl(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((assetPrintReport: AssetPrintReport) => {
            const searchStr = (
              assetPrintReport.assetName +
              assetPrintReport.assetCode +
              assetPrintReport.locationName +
              assetPrintReport.categoryName +
              assetPrintReport.statusName 

            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        this.renderedData = sortedData
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: AssetPrintReport[]): AssetPrintReport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "assetName":
          [propertyA, propertyB] = [a.assetName, b.assetName];
          break;
          case "assetCode":
            [propertyA, propertyB] = [a.assetCode, b.assetCode];
            break;
          case "locationName":
              [propertyA, propertyB] = [a.locationName, b.locationName];
              break;
          case "categoryName":
          [propertyA, propertyB] = [a.categoryName, b.categoryName];
          break;
          
          case "statusName":
            [propertyA, propertyB] = [a.statusName, b.statusName];
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


