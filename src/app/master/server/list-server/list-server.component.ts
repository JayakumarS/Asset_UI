

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
import { Assetserver } from '../server.model';
import { ServerService } from '../server.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DeleteServerComponent } from './delete-server/delete-server.component';


@Component({
  selector: 'app-list-server',
  templateUrl: './list-server.component.html',
  styleUrls: ['./list-server.component.sass'],
})
export class ListServerComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "customer",
    "osType",
    "privateIp",
    "serverName",
    "location",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: ServerService | null;
  selection = new SelectionModel<Assetserver>(true, []);
  index: number;
  id: number;
  exporter: any;
  tid:number;
  url: string;
  widgets: boolean = false

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public serverService: ServerService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private router: Router,
    private tokenStorage: TokenStorageService,

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
    if(this.url.includes("allMaster")){
    this.widgets = true
    }else if(this.url.includes('list-server')){
    this.widgets = false

    };
  }

  public loadData() {
    this.exampleDatabase = new ServerService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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

  addPage(){
    
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("propFrom", "prop");
    this.router.navigate(['/master/server/add-server/0']);
    }else if(this.url.includes('list-server')){
    window.sessionStorage.setItem("propFrom", "normal");
    this.router.navigate(['/master/server/add-server/0']);
    };
  }

  editCall(row) {
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
      window.sessionStorage.setItem("propFrom", "prop");
      this.router.navigate(['/master/server/add-server/'+row.serverId]);
    }else if(this.url.includes('list-server')){
      window.sessionStorage.setItem("propFrom", "normal");
      this.router.navigate(['/master/server/add-server/'+row.serverId]);
    };
  }

  viewCall(row) {
    // this.url=this.router.url;
    // if(this.url.includes("allMaster")){
    //   window.sessionStorage.setItem("propFrom", "prop");
    //   this.router.navigate(['/master/server/view-server/' + row.serverId]);
    // }else if(this.url.includes('list-server')){
    //   window.sessionStorage.setItem("propFrom", "normal");
    //   this.router.navigate(['/master/server/view-server/' + row.serverId]);
    // };

    this.router.navigate(['/master/server/view-server/', row.serverId]);

  }

  
  deleteItem(row){
    
    this.id = row.serverId;
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
        tempDirection = "rtl";
      } else {
        tempDirection = "ltr";
      }
      const dialogRef = this.dialog.open(DeleteServerComponent, {
        height: "270px",
        width: "400px",
        data: row,
        direction: tempDirection,
      });
      this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  
        if (data.data == true) {
          
          this.spinner.show();
          this.serverService.deleteServerList(this.id).subscribe({
            next: (data) => {
              this.spinner.hide();
              if (data.success) {
                this.loadData();
                this.showNotification(
                  "snackbar-success",
                  "Delete Record Successfully...!!!",
                  "bottom",
                  "center"
                );
              }
              else{
                this.showNotification(
                  "snackbar-danger",
                  "You Can't Delete Related Data Exist...!!!",
                  "bottom",
                  "center"
                );
              }
            },
            error: (error) => {
              this.spinner.hide();
            }
          });
    
        }else{
          this.loadData();
        }
        
    });
  
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
  onContextMenu(event: MouseEvent, item: Assetserver) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }


}




export class ExampleDataSource extends DataSource<Assetserver> {
  filterChange = new BehaviorSubject("");
  url: any;
  router: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Assetserver[] = [];
  renderedData: Assetserver[] = [];
  constructor(
    public exampleDatabase: ServerService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Assetserver[]> {
   
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
          .filter((ServerService: Assetserver) => {
            const searchStr = (
              ServerService.customer+
              ServerService.osType+
              ServerService.privateIp+
              ServerService.serverName+
              ServerService.location
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
  sortData(data: Assetserver[]): Assetserver[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "customer":
          [propertyA, propertyB] = [a.customer, b.customer];
          break;
        case "osType":
          [propertyA, propertyB] = [a.osType, b.osType];
          break; 
        case "privateIp":
          [propertyA, propertyB] = [a.privateIp, b.privateIp];
          break;
        case "serverName":
          [propertyA, propertyB] = [a.serverName, b.serverName];
          break;
        case "location":
          [propertyA, propertyB] = [a.location, b.location];
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
