import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MultipleUploadBrandComponent } from '../../brand/multiple-upload-brand/multiple-upload-brand.component';
import { Line } from '../line-master.model';
import { LineMasterService } from '../line-master.service';
import { LineMultipleUploadComponent } from '../line-multiple-upload/line-multiple-upload.component';

@Component({
  selector: 'app-list-line-master',
  templateUrl: './list-line-master.component.html',
  styleUrls: ['./list-line-master.component.sass']
})
export class ListLineMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "branch",
    "lineCode",
    "lineDescription",
    "actions",
  ];

  exampleDatabase:LineMasterService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Line>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  widgets: boolean= false

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public lineMasterService:LineMasterService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private tokenStorage: TokenStorageService
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
    this.loadData();

    this.url=this.router.url;
    if(this.url.includes("addCompany")){
      this.widgets = true
    }else if(this.url.includes('listLine')){
      this.widgets = false

    };
  }
 

  public loadData() {
    this.exampleDatabase = new LineMasterService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
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

  addLine(){
    this.url=this.router.url;
    if(this.url.includes("addCompany")){
    window.sessionStorage.setItem("LineFrom", "line");
    this.router.navigate(['/master/line/addLine/0']);
    }else if(this.url.includes('listLine')){
    window.sessionStorage.setItem("LineFrom", "normal");
    this.router.navigate(['/master/line/addLine/0']);
    };
  }
  editCall(row) {
    this.url=this.router.url;
    if(this.url.includes("addCompany")){
    window.sessionStorage.setItem("LineFrom", "line");
    this.router.navigate(['/master/line/addLine/'+row.id]);
    }else if(this.url.includes('listLine')){
    window.sessionStorage.setItem("LineFrom", "normal");
    this.router.navigate(['/master/line/addLine/'+row.id]);
    };
  }

  viewCall(row){
    this.router.navigate(['/master/line/line/'+row.id]);
  }


  multipleUploadPopupCall() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(LineMultipleUploadComponent, {
      data: {
        action: "edit",
      },
      width: "640px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 0) {
        this.refreshTable();
        this.showNotification(
          "black",
          "Upload Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
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
  onContextMenu(event: MouseEvent, item: Line) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Line> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Line[] = [];
  renderedData: Line[] = [];
  constructor(
    public exampleDatabase: LineMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Line[]> {
   
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
          .filter((lineService: Line) => {
            const searchStr = (
              lineService.branch+
              lineService.lineCode+
              lineService.lineDescription
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
      
        const sortedData = this.sortData(this.filteredData.slice());
        console.log(this.exampleDatabase.data);
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
  sortData(data: Line[]): Line[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "branch":
          [propertyA, propertyB] = [a.branch, b.branch];
          break;
          case "lineCode":
            [propertyA, propertyB] = [a.lineCode, b.lineCode];
            break; 
            case "lineDescription":
            [propertyA, propertyB] = [a.lineDescription, b.lineDescription];
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