import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { ReportsService } from '../../reports.service';
import { UserWiseAssetCountService } from '../user-wise-asset-count.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { UserWiseAssetCount } from '../User-wise-asset-count-model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-user-wise-asset-count',
  templateUrl: './user-wise-asset-count.component.html',
  styleUrls: ['./user-wise-asset-count.component.sass']
})
export class UserWiseAssetCountComponent extends  UnsubscribeOnDestroyAdapter implements OnInit  {
  docForm: FormGroup;
  companyId: string;
  assetUserList: any;
  displayedColumns = [
    'assetCode',
    'assetName',
    'location',
    'categoryName',
    'statusName'
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: UserWiseAssetCountService | null;


  constructor(private fb:FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public userWiseAssetCountService:UserWiseAssetCountService,
    private serverUrl:serverLocations,
    public httpClient: HttpClient,
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
    this.docForm = this.fb.group({
        user:[""],
        company:[""],
    });


       //Assetuser dropdown
  this.companyId=this.tokenStorage.getCompanyId();
  this.httpService.get<any>(this.commonService.getAssetUserList + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe(

    (data) => {
    console.log(data);
    this.assetUserList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);
this.loadData();
  }



  
  loadData() {
    this.exampleDatabase = new UserWiseAssetCountService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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

}


export class ExampleDataSource extends DataSource<UserWiseAssetCount> {
  filterChange = new BehaviorSubject("");

  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserWiseAssetCount[] = [];
  renderedData: UserWiseAssetCount[] = [];
   constructor(
    public exampleDatabase: UserWiseAssetCountService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));

  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserWiseAssetCount[]> {
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
          .filter((UserWiseAssetCount: UserWiseAssetCount) => {
            const searchStr = (
              UserWiseAssetCount.assetCode +
              UserWiseAssetCount.assetName +
              UserWiseAssetCount.location +
              UserWiseAssetCount.categoryName +
              UserWiseAssetCount.statusName 
               
              
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
  sortData(data: UserWiseAssetCount[]): UserWiseAssetCount[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "assetCode":
          [propertyA, propertyB] = [a.assetCode, b.assetCode];
          break;
        case "assetName":
            [propertyA, propertyB] = [a.assetName, b.assetName];
            break;

        case "location":
          [propertyA, propertyB] = [a.location, b.location];
        break;
        case "category":
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
