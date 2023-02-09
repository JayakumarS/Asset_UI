import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { Reportscategory } from '../../reports-model';
import { reportsresultbean } from '../../reports-result-bean';
import { ReportsService } from '../../reports.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, merge, Observable } from 'rxjs';


@Component({
  selector: 'app-addreport-location',
  templateUrl: './addreport-location.component.html',
  styleUrls: ['./addreport-location.component.sass']
})
export class AddreportLocationComponent implements OnInit {
  displayedColumns = [
    'location',
  'inUse',
  'inStock',
  'repair',
  'damaged',
  'total',


  ];
  docForm: FormGroup;
    statusList: [];
    categoryList: [];
    assetList: [];
    requestId: any;
    loadData: any;
    edit: boolean = false;
    reList: any = [];
     loList: any = [];
     dataSource: ExampleDataSource | null;
     exampleDatabase: ReportsService | null;
     selection = new SelectionModel<Reportscategory>(true, []);
     index: number;
     id: number;
     reportscategory: Reportscategory | null;
          locationList = [];
  constructor(
    private fb: FormBuilder,
    public reportsService: ReportsService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private router: Router,
    public httpClient: HttpClient,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {

    this.httpService.get<reportsresultbean>(this.reportsService.categoryListUrl).subscribe(
  (data) => {
    this.categoryList = data.categoryList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

    this.route.params.subscribe(params => {
  if (params.id!=undefined && params.id!=0){
   this.requestId = params.id;
   this.edit = true;
   // For User login Editable mode
  }
});



    this.httpService.get<reportsresultbean>(this.reportsService.assetListUrl).subscribe(
  (data) => {
    this.assetList = data.assetList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

    this.route.params.subscribe(params => {
  if (params.id!=undefined && params.id!=0){
   this.requestId = params.id;
  }
});
  // location list
// tslint:disable-next-line:max-line-length
    this.httpService.get(this.commonService.getCompanybasedlocationDropdown + "?companyId="  + this.tokenStorage.getCompanyId() + "").subscribe((res: any) => {
this.locationList = res.addressBean;

},
(error: HttpErrorResponse) => {
console.log(error.name + " " + error.message);
}
);

    this.route.params.subscribe(params => {
if (params.id!=undefined && params.id!=0){
this.requestId = params.id;
}
});


}
Search(){
  this.reportscategory = this.docForm.value;
  this.httpService.get(this.reportsService.locationsearch + "?location=" + this.docForm.controls.asset.value ).subscribe((res: any) => {
    console.log(res);
    this.loList = res.assetList;
  },
  (err: HttpErrorResponse) => {
  }
);


}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

}

export class ExampleDataSource extends DataSource<Reportscategory> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Reportscategory[] = [];
  renderedData: Reportscategory[] = [];
  constructor(
    public exampleDatabase: ReportsService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup

  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Reportscategory[]> {

    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {

        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((reportscategory: Reportscategory) => {
            const searchStr = (
              reportscategory.category +
              reportscategory.asset +
              reportscategory.status +
              reportscategory.asset_code +
              reportscategory.asset_name +
              reportscategory.asset_location +
              reportscategory.asset_category
           ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

        const sortedData = this.sortData(this.filteredData.slice());

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        // this.renderedData = sortedData.splice(
        //   startIndex,
        //   this.paginator.pageSize
        // );
        return this.renderedData;
      })
    );
  }
  sortData(ar: Reportscategory[]) {
  }
  disconnect() {}

}



