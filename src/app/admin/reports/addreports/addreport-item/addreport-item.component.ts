import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../../reports.service';
import { PurchaseOrderService } from 'src/app/inventory/purchase-order/purchase-order.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { Reportscategory } from '../../reports-model';

@Component({
  selector: 'app-addreport-item',
  templateUrl: './addreport-item.component.html',
  styleUrls: ['./addreport-item.component.sass']
})
export class AddreportItemComponent extends  UnsubscribeOnDestroyAdapter implements OnInit {
  itemList: any;
  displayedColumns = [
    'item_name',
    'damage',
    'existing',
    'new1',
    'notworking',
    'outofstock',
    'refurbished',
    'repair',
    'scrap',
    'others',
    'total',
   

  ];
  docForm: FormGroup;
  edit: boolean = false;
  dataSource: ExampleDataSource | null;
  exampleDatabase: ReportsService | null;
  selection = new SelectionModel<Reportscategory>(true, []);
  index: number;
  id: number;
  reportscategory: Reportscategory | null;




  constructor(private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    public reportsService: ReportsService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private router: Router,
    public httpClient: HttpClient,
    public commonService: CommonService,
    public route: ActivatedRoute,
    public purchaseOrderService: PurchaseOrderService,
  ) {
    
    super();

    this.docForm = this.fb.group({
      item: [""],
      company:[""],
     }); }


     
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  
  ngOnInit(): void {

    this.httpService.get(this.purchaseOrderService.fetchItem + "?company=" + parseInt(this.tokenStorage.getCompanyId())).subscribe((res: any) => {
      this.itemList = res.itemList;
     },
       (err: HttpErrorResponse) => {
         // error code here
       }
     );

     this.Search();

  }
loadData() {
  this.exampleDatabase = new ReportsService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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

Search() {
  this.reportscategory = this.docForm.value;
  this.loadData();
}
onReset()
{
  this.docForm = this.fb.group({
    item: [""],
    company:[""],
  });
  this.loadData();
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
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAssetItemList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((reportscategory: Reportscategory) => {
            const searchStr = (
              reportscategory.item_name +
              reportscategory.repair

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
        case "item_name":
          [propertyA, propertyB] = [a.item_name, b.item_name];
          break;
        case "repair":
            [propertyA, propertyB] = [a.repair, b.repair];
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


