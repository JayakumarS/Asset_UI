import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Reportscategory } from '../reports-model';
import { reportsresultbean } from '../reports-result-bean';
import { ReportsService } from '../reports.service';
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';




@Component({
  selector: 'app-addreports',
  templateUrl: './addreports.component.html',
  styleUrls: ['./addreports.component.sass']
})
export class AddreportsComponent extends  UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns=[

    "asset_code",
    "asset_name",
    "asset_location",
    "asset_category",
    "status",

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
    false;



  reportscategory: Reportscategory;

  dataSource: ExampleDataSource | null;
  exampleDatabase: ReportsService | null;
  locationList = [];
    constructor(private fb: FormBuilder,
                public reportsService: ReportsService,
                private httpService: HttpServiceService,
                private snackBar: MatSnackBar,
                private serverUrl: serverLocations,
                private router: Router,
                public httpClient: HttpClient,
                public commonService: CommonService,
                public route: ActivatedRoute,
                private tokenStorage: TokenStorageService, ) {
        super();
        this.docForm = this.fb.group({
          category: [""],
           status: [""],
           asset: [""],
           asset_code: [""],
           asset_name: [""],
           asset_location: [""],
           asset_category: [""],
           inUse: [""],
           inStock: [""],
           damaged: [""],
           repair: [""],
           total: [""],
           write_off: [""]
         });

      }

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
       this.fetchDetails(this.requestId) ;
      }
    });

        this.httpService.get<reportsresultbean>(this.reportsService.statusListUrl).subscribe(
      (data) => {
        this.statusList = data.statusList;
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


 fetchDetails(reports: any): void {
  //   this.httpService.get(this.reportsService.editreports + "?reports=" + reports).subscribe((res: any) => {
  //     console.log(reports);
  //     this.docForm.patchValue({
  //       'category':res.transferBean.category,
  //       'status': res.reportsBean.status,
  //       'asset': res.reportsBean.asset,
  //       'asset_code': res.reportsBean.asset_code,
  //       'asset_name' : res.reportsBean.asset_name,
  //       'asset_location' : res.reportsBean.asset_location,
  //       'asset_category' : res.reportsBean.asset_category,

  //    })
  //     },
  //     (err: HttpErrorResponse) => {
  //     }
  //   );
   }

  onSearch(){
    this.reportscategory = this.docForm.value;
    // tslint:disable-next-line:max-line-length
    this.httpService.get(this.reportsService.reportserach + "?reports=" + this.docForm.controls.category.value + "&status=" + this.docForm.controls.status.value) .subscribe((res: any) => {
      console.log(res);
      this.reList = res.categoryList;
    },
    (err: HttpErrorResponse) => {
    }
  );
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


export class ExampleDataSource extends DataSource<ReportsService> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ReportsService[] = [];
  renderedData: ReportsService[] = [];
  constructor(
    public exampleDatabase: ReportsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ReportsService[]> {

    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList();
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
  sortData(ar: ReportsService[]) {
  }
  disconnect() {}

}


