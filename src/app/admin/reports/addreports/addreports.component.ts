import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Reportscategory } from '../reports-model';
import { reportsresultbean } from '../reports-result-bean';
import { ReportsService } from '../reports.service';
import { CommonService } from 'src/app/common-service/common.service';
import { AddreportLocationComponent } from './addreport-location/addreport-location.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-addreports',
  templateUrl: './addreports.component.html',
  styleUrls: ['./addreports.component.sass']
})
export class AddreportsComponent extends  UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'categoryName',
    'inUse',
    'inStock',
    'repair',
    'damaged',
    'total',


  ];
  docForm: FormGroup;
  tabEdu = [{ content: AddreportLocationComponent }];
    statusList: [];
    categoryList: [];
    assetList: [];
    requestId: any;
    edit: boolean = false;
    reList: any = [];
     loList: any = [];

  reportscategory: Reportscategory | null;

  dataSource: ExampleDataSource | null;
  exampleDatabase: ReportsService | null;
  locationList = [];

    constructor(private fb: FormBuilder,
                public reportsService: ReportsService,
                public httpClient: HttpClient,
                public commonService: CommonService,
                public route: ActivatedRoute,
                private httpService: HttpServiceService,
                private serverUrl: serverLocations,
                ){
        super();
        this.docForm = this.fb.group({
          category: [""],
          status: [""]
         });

      }

      @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
      @ViewChild(MatSort, { static: true }) sort: MatSort;
      @ViewChild("filter", { static: true }) filter: ElementRef;
      @ViewChild(MatMenuTrigger)
      contextMenu: MatMenuTrigger;
      contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

        this.httpService.get<reportsresultbean>(this.reportsService.categoryListUrl).subscribe(
      (data) => {
        this.categoryList = data.categoryList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

        this.onSearch();

  }

   loadData() {
    this.exampleDatabase = new ReportsService(this.httpClient,this.serverUrl,this.httpService);
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


  // context menu
  onContextMenu(event: MouseEvent, item: Reportscategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }


//   onSearch(){
//     this.reportscategory = this.docForm.value;
//     // tslint:disable-next-line:max-line-length
// tslint:disable-next-line:max-line-length
//     this.httpService.get(this.reportsService.reportserach + "?reports=" + this.docForm.controls.category.value + "&status=" + this.docForm.controls.status.value) .subscribe((res: any) => {
//       console.log(res);
//       this.exampleDatabase = res.categoryList;

//     },
//     (err: HttpErrorResponse) => {
//     }
//   );
// }

onSearch() {
  this.reportscategory = this.docForm.value;
  this.loadData();
}
// Search(){
//   this.reportscategory = this.docForm.value;
//   this.httpService.get(this.reportsService.locationsearch + "?location=" + this.docForm.controls.asset.value ).subscribe((res: any) => {
//     console.log(res);
//     this.loList = res.assetList;
//   },
//   (err: HttpErrorResponse) => {
//   }
// );


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
          .filter((reportscategory: Reportscategory) => {
            const searchStr = (
              reportscategory.categoryName +
              reportscategory.inUse

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
  sortData(data: Reportscategory[]): Reportscategory[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "categoryName":
          [propertyA, propertyB] = [a.categoryName, b.categoryName];
          break;
        case "inUse":
            [propertyA, propertyB] = [a.inUse, b.inUse];
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


