
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { FixedDepositService } from '../fixed-deposit.service';
import { Deposit } from '../fixed-deposit.model';
import { DeleteFixedDepositComponent } from './delete-fixed-deposit/delete-fixed-deposit.component';

@Component({
  selector: 'app-list-fixed-deposit',
  templateUrl: './list-fixed-deposit.component.html',
  styleUrls: ['./list-fixed-deposit.component.sass']
})
export class ListFixedDepositComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "applicationNo",
    "fdName",
    "investmentTerm",
    "fixeddeposittype",
    "actions",
  ];

  exampleDatabase:FixedDepositService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<FixedDepositService>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  widgets: boolean = false

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public fixedDepositService:FixedDepositService,
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
    if(this.url.includes("allMaster")){
    this.widgets = true
    }else if(this.url.includes('list-fixed-deposit')){
    this.widgets = false

    };
  }
 

  public loadData() {
    this.exampleDatabase = new FixedDepositService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
    window.sessionStorage.setItem("fixedFrom", "fixed");
    this.router.navigate(['/master/Fixed-deposit/add-fixed-deposit/0']);
    }else if(this.url.includes('list-fixed-deposit')){
    window.sessionStorage.setItem("fixedFrom", "normal");
    this.router.navigate(['/master/Fixed-deposit/add-fixed-deposit/0']);
    };
  }
  editCall(row) {
 
      this.url=this.router.url;
      if(this.url.includes("allMaster")){
      window.sessionStorage.setItem("fixedFrom", "fixed");
      this.router.navigate(['/master/Fixed-deposit/add-fixed-deposit/'+row.id]);
    }else if(this.url.includes('list-fixed-deposit')){
      window.sessionStorage.setItem("fixedFrom", "normal");
      this.router.navigate(['/master/Fixed-deposit/add-fixed-deposit/'+row.id]);
    };
      
    
  
  }
//   deleteItem(row){
//  this.id = row.id;
//     let tempDirection;
//     if (localStorage.getItem("isRtl") === "true") {
//       tempDirection = "rtl";
//     } else {
//       tempDirection = "ltr";
//     }
//     const dialogRef = this.dialog.open(DeleteFixedDepositComponent, {
//       height: "270px",
//       width: "400px",
//       data: row,
//       direction: tempDirection,
//     });
//     this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


//       if (data.data == true) {

//         this.httpService.get(this.fixedDepositService.delete+ "?id=" + this.id).subscribe((res: any) => {
//           this.showNotification(
//             "snackbar-success",
//             "Delete Record Successfully...!!!",
//             "bottom",
//             "center"
//           );
//           this.loadData();
//         },
//           (err: HttpErrorResponse) => {
//             // error code here
//           }
//         );


//       } else{
//         this.loadData();
//       }

//     });

//   }

  
  deleteItem(row){
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
    const dialogRef = this.dialog.open(DeleteFixedDepositComponent, {
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
       this.fixedDepositService.deletefd(obj).subscribe({
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
  viewCall(row){
    this.router.navigate(['/master/Fixed-deposit/add-fixed-deposit/'+row.id]);
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
  onContextMenu(event: MouseEvent, item: Deposit) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Deposit> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Deposit[] = [];
  renderedData: Deposit[] = [];
  constructor(
    public exampleDatabase:FixedDepositService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Deposit[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getlist();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((fixedDepositService: Deposit) => {
            const searchStr = (
              fixedDepositService.applicationNo+
              fixedDepositService.investmentTerm+
              fixedDepositService.fixeddeposittype+
              fixedDepositService.fdName
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
  sortData(data: Deposit[]): Deposit[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "applicationNo":
          [propertyA, propertyB] = [a.applicationNo, b.applicationNo];
          break;
        
            case "investmentTerm":
            [propertyA, propertyB] = [a.investmentTerm, b.investmentTerm];
            break;
            case "fixeddeposittype":
            [propertyA, propertyB] = [a.fixeddeposittype, b.fixeddeposittype];
            break;
            case "fdName":
            [propertyA, propertyB] = [a.fdName, b.fdName];
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