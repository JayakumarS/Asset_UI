import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';


import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../../reports.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { IndividualAssetReportService } from '../individual-asset-report.service';
import { AssetReport } from '../individual-asset-report-model';
import { DataSource } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-asset-report',
  templateUrl: './asset-report.component.html',
  styleUrls: ['./asset-report.component.sass']
})
export class AssetReportComponent  extends  UnsubscribeOnDestroyAdapter  implements OnInit {
displayedColumns=[
  'assetCategory',
  'assetName',
  'assetType',
  
  
  
];


  docForm: FormGroup;
  edit: boolean = false;
  
  
  
    assetReport  : AssetReport | null;
    // AssetReport

  dataSource: ExampleDataSource | null;
  exampleDatabase: IndividualAssetReportService | null;
  
 
  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private serverUrl: serverLocations,
    public tokenStroage: TokenStorageService,
    private tokenStorage: TokenStorageService,
    private IndividualAssetReportService: IndividualAssetReportService,
    private snackBar: MatSnackBar,

    ) {
       
    super();
    this.docForm = this.fb.group({
      category:["",[Validators.required]],
      userid: this.tokenStorage.getUserId(),
      


    });

   }
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild("filter", { static: true }) filter: ElementRef;
   @ViewChild(MatMenuTrigger)
   contextMenu: MatMenuTrigger;
   contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.docForm = this.fb.group({
      category:["",[Validators.required]],
      userid: this.tokenStorage.getUserId(),
    });
   
  }
 

  public loadData() {
    this.exampleDatabase = new IndividualAssetReportService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.sort,
      this.docForm,
     
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
    this.assetReport = this.docForm.value;
    this.loadData();
    
  }
  
  
  onContextMenu(event: MouseEvent, item: AssetReport) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  

 

onReset()
{
  // this.docForm = this.fb.group({
  //   category: [""],
   
  // });
  // this.loadData();
  location.reload()

}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

QRcodeExportPdf() {
  
 
  const obj={
    userId: this.tokenStorage.getUserId()
  }
  this.spinner.show();
  this.IndividualAssetReportService.QRcodeExportPdf(obj).pipe().subscribe({
    next: (result: any) => {
      this.spinner.hide();
      if(result!=null){
        var file = new Blob([result], { type: 'application/pdf' });
        var fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);
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
}
export class ExampleDataSource extends DataSource<AssetReport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AssetReport[] = [];
  renderedData: AssetReport[] = [];
  constructor(
    public exampleDatabase: IndividualAssetReportService ,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AssetReport[]> {
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
          .filter((assetPrintReport: AssetReport) => {
            const searchStr = (
              assetPrintReport.assetCategory +
              assetPrintReport.assetName +
              assetPrintReport.assetType 
             

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
  sortData(data: AssetReport[]): AssetReport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "assetCategory":
          [propertyA, propertyB] = [a.assetCategory, b.assetCategory];
          break;
          case "assetName":
            [propertyA, propertyB] = [a.assetName, b.assetName];
            break;
          case "assetType":
              [propertyA, propertyB] = [a.assetType, b.assetType];
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

