

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
import { ApplicationDetails } from '../application-details.model';
import { ApplicationDetailsService } from '../application-details.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DeleteApplicationDetailsComponent } from './delete-application-details/delete-application-details.component';


@Component({
  selector: 'app-list-appliction-details',
  templateUrl: './list-appliction-details.component.html',
  styleUrls: ['./list-appliction-details.component.sass']
})
export class ListApplictionDetailsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "feCode",
    "beCode",
    "db",
    "actions"
  ];

  url: string;
  dataSource: ExampleDataSource | null;
  widgets: boolean = false;
  exampleDatabase: ApplicationDetailsService | null;
  id: number;

  constructor(
        public httpClient: HttpClient,
        public dialog: MatDialog,
        public applicationDetailsService: ApplicationDetailsService,
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
    }else if(this.url.includes('list-application-details')){
    this.widgets = false

    };
  }

  public loadData() {
      this.exampleDatabase = new ApplicationDetailsService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
    this.router.navigate(['/master/application-details/add-application-details/0']);
    }else if(this.url.includes('list-application-details')){
    window.sessionStorage.setItem("propFrom", "normal");
    this.router.navigate(['/master/application-details/add-application-details/0']);
    };
  }

  editCall(row) {
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
      window.sessionStorage.setItem("propFrom", "prop");
      this.router.navigate(['/master/application-details/add-application-details/'+row.applicationId]);
    }else if(this.url.includes('list-application-details')){
      window.sessionStorage.setItem("propFrom", "normal");
      this.router.navigate(['/master/application-details/add-application-details/'+row.applicationId]);
    };
  }

  viewCall(row) {

    this.router.navigate(['/master/application-details/view-application-details/', row.applicationId]);

  }

  deleteItem(row){
      
      this.id = row.applicationId;
        let tempDirection;
        if (localStorage.getItem("isRtl") === "true") {
          tempDirection = "rtl";
        } else {
          tempDirection = "ltr";
        }
        const dialogRef = this.dialog.open(DeleteApplicationDetailsComponent, {
          height: "270px",
          width: "400px",
          data: row,
          direction: tempDirection,
        });
        this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    
          if (data.data == true) {
            
            this.spinner.show();
            this.applicationDetailsService.deleteApplicationDetailsList(this.id).subscribe({
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

  onContextMenu(event: MouseEvent, item: ApplicationDetails) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }


}

export class ExampleDataSource extends DataSource<ApplicationDetails> {
  filterChange = new BehaviorSubject("");
  url: any;
  router: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ApplicationDetails[] = [];
  renderedData: ApplicationDetails[] = [];
  constructor(
    public exampleDatabase: ApplicationDetailsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ApplicationDetails[]> {
   
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
          .filter((ApplicationDetailsService: ApplicationDetails) => {
            const searchStr = (
              ApplicationDetailsService.feCode+
              ApplicationDetailsService.beCode+
              ApplicationDetailsService.db
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
  sortData(data: ApplicationDetails[]): ApplicationDetails[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "feCode":
          [propertyA, propertyB] = [a.feCode, b.feCode];
          break;
        case "beCode":
          [propertyA, propertyB] = [a.beCode, b.beCode];
          break; 
        case "db":
          [propertyA, propertyB] = [a.db, b.db];
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
