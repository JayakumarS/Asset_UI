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
import { AssetTypeService } from '../asset-type.service'; 
import { AssetType } from '../asset-type.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-asset-type',
  templateUrl: './list-asset-type.component.html',
  styleUrls: ['./list-asset-type.component.sass']
})
export class ListAssetTypeComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  [x: string]: any;

  displayedColumns = [
    "assetTypeId", "assetCategory","assetClassName", "assetTypeDesc", "depreciationRate"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: AssetTypeService | null;
  selection = new SelectionModel<AssetType>(true, []);
  index: number;
  id: number;
  assetType: AssetType | null;
  docForm: FormGroup;
  
  assetCategoryList:[{code:'Tangible',text:'Tangible'},{code:'Intangible',text:'Intangible'}];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public assetTypeService: AssetTypeService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
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
    this.exampleDatabase = new AssetTypeService(this.httpClient, this.serverUrl, this.httpService);
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
  //  this.router.navigate(['/audit/manageaudit/addManageAudit/'+row.auditCode]);
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
  onContextMenu(event: MouseEvent, item: AssetType) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<AssetType> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AssetType[] = [];
  renderedData: AssetType[] = [];
  constructor(
    public exampleDatabase: AssetTypeService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AssetType[]> {
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
          .filter((assetType: AssetType) => {
            const searchStr = (
              assetType.assetTypeId +
              assetType.assetCategory +
              assetType.assetClassName +
              assetType.assetTypeDesc +
              assetType.depreciationRate 
             
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
  sortData(data: AssetType[]): AssetType[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "assetTypeId":
          [propertyA, propertyB] = [a.assetTypeId, b.assetTypeId];
          break;
        case "assetCategory":
          [propertyA, propertyB] = [a.assetCategory, b.assetCategory];
          break;
        case "assetClassName":
          [propertyA, propertyB] = [a.assetClassName, b.assetClassName];
          break;
        
        case "assetTypeDesc":
          [propertyA, propertyB] = [a.assetTypeDesc, b.assetTypeDesc];
          break;

          case "depreciationRate":
          [propertyA, propertyB] = [a.depreciationRate, b.depreciationRate];
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

