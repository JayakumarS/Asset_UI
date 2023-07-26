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
import { LoanOtherdebitsService } from '../loan-otherdebits.service';
import { Otherdebits } from '../loan-otherdebits.model';
import { DeleteOtherdebitsComponent } from './delete-otherdebits/delete-otherdebits.component';


@Component({
  selector: 'app-list-otherdebits',
  templateUrl: './list-otherdebits.component.html',
  styleUrls: ['./list-otherdebits.component.sass']
})
export class ListOtherdebitsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    // "branch",
    // "lineCode",
    // "lineDescription",
    // "actions",
    "bankname",
    "type",
    "loan",
    
    "loanAmount",
    "actions"
    // "hisher",
    // "amount",
    // "type",
    
  ];

  exampleDatabase:LoanOtherdebitsService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Otherdebits>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  permissionList: any;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public loanOtherdebitsService:LoanOtherdebitsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
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
  }
 

  public loadData() {
    this.exampleDatabase = new LoanOtherdebitsService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
  window.sessionStorage.setItem("loanFrom", "loan");
  this.router.navigate(['/master/loan-otherdebits/add-otherdebits/0']);
  }else if(this.url.includes('otherdebits')){
  window.sessionStorage.setItem("loanFrom", "normal");
  this.router.navigate(['/master/loan-otherdebits/add-otherdebits/0']);
  };
  }
  editCall(row) {
      this.router.navigate(['/master/loan-otherdebits/add-otherdebits/'+row.id]);
    }

    deleteItem(row){
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
       tempDirection = "rtl";
     } else {
       tempDirection = "ltr";
     }
      const dialogRef = this.dialog.open(DeleteOtherdebitsComponent, {
       height: "270px",
       width: "400px",
       data: row,
       direction: tempDirection,
       disableClose: true
     });
      this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
       if (data.data == true) {
         const obj = {
           deletingId: row.id
         }
         this.loanOtherdebitsService.deleteother(obj).subscribe({
          next: (data) => {
            if (data.success) {
              this.loadData();
              this.showNotification(
                "snackbar-success",
                "Deleted record successfully...!!!",
                "bottom",
                "center"
               );
             }
           },
           error: (error) => {
           }
         });
    
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
  onContextMenu(event: MouseEvent, item: Otherdebits) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Otherdebits> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Otherdebits[] = [];
  renderedData: Otherdebits[] = [];
  constructor(
    public exampleDatabase: LoanOtherdebitsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Otherdebits[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((loanOtherdebitsService: Otherdebits) => {
            const searchStr = (
              // lineService.lineCode+
              loanOtherdebitsService.bankname+
              loanOtherdebitsService.type +
              loanOtherdebitsService.loan +
              loanOtherdebitsService.loanAmount +
              loanOtherdebitsService.id 
              
    
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
  sortData(data: Otherdebits[]): Otherdebits[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        // case "lineCode":
          //   [propertyA, propertyB] = [a.lineCode, b.lineCode];
          //   break;
          case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
         case "bankname":
          [propertyA, propertyB] = [a.bankname, b.bankname];
          break;
          case "type":
          [propertyA, propertyB] = [a.type, b.type];
          break;
          case "loan":
          [propertyA, propertyB] = [a.loan, b.loan];
          break;
          
          case "loanAmount":
          [propertyA, propertyB] = [a.loanAmount, b.loanAmount];
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
