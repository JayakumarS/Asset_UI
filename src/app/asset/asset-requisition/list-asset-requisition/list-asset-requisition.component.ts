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
import { AssetRequisitionService } from '../asset-requisition.service'; 
import { AssetRequisition } from '../asset-requisition.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-list-asset-requisition',
  templateUrl: './list-asset-requisition.component.html',
  styleUrls: ['./list-asset-requisition.component.sass']
})
export class ListAssetRequisitionComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  [x: string]: any;

  displayedColumns = [
    "requisitionNumber", "requestedBy","requisitionDate", "sourceLocationText", "destinationLocationText","actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: AssetRequisitionService | null;
  selection = new SelectionModel<AssetRequisition>(true, []);
  index: number;
  id: number;
  assetType: AssetRequisition | null;
  docForm: FormGroup;
  
  assetCategoryList:[{code:'Tangible',text:'Tangible'},{code:'Intangible',text:'Intangible'}];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public assetTypeService: AssetRequisitionService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private token: TokenStorageService,
    private router:Router,
    private fb: FormBuilder
  ) {
     super();

     this.docForm = this.fb.group({
      assetCategory: [""],
      assetClassName: [""]
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.onSubmit();
  }

  refresh(){
    this.loadData();
  }

  onSubmit(){
   
    this.assetType = this.docForm.value;
    console.log(this.assetType);
    this.loadData();
}


  public loadData() {
    this.exampleDatabase = new AssetRequisitionService(this.httpClient, this.serverUrl,this.token, this.httpService);
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


  editCall(row) { 
    this.router.navigate(['/asset/assetRequisition/addAssetRequisition/'+row.assetRequisitionId+'/'+row.requisitionType]);
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
  onContextMenu(event: MouseEvent, item: AssetRequisition) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<AssetRequisition> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AssetRequisition[] = [];
  renderedData: AssetRequisition[] = [];
  constructor(
    public exampleDatabase: AssetRequisitionService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AssetRequisition[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((assetType: AssetRequisition) => {
            const searchStr = (
              assetType.requisitionNumber +
              assetType.requestedBy +
              assetType.requisitionDate +
              assetType.sourceLocationText +
              assetType.destinationLocationText 
             
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
  sortData(data: AssetRequisition[]): AssetRequisition[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "requisitionNumber":
          [propertyA, propertyB] = [a.requisitionNumber, b.requisitionNumber];
          break;
        case "requestedBy":
          [propertyA, propertyB] = [a.requestedBy, b.requestedBy];
          break;
        case "requisitionDate":
          [propertyA, propertyB] = [a.requisitionDate, b.requisitionDate];
          break;
        
        case "sourceLocationText":
          [propertyA, propertyB] = [a.sourceLocationText, b.sourceLocationText];
          break;

          case "destinationLocationText":
          [propertyA, propertyB] = [a.destinationLocationText, b.destinationLocationText];
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