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
import { JewelleryService } from '../jewellery.service';
import { jewel } from '../jewellery.model';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DeleteJewelleryDetailsComponent } from './delete-jewellery-details/delete-jewellery-details.component';


@Component({
  selector: 'app-list-jewellery-details',
  templateUrl: './list-jewellery-details.component.html',
  styleUrls: ['./list-jewellery-details.component.sass']
})
export class ListJewelleryDetailsComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "jewelName",
    "material",
    "weight",
    "actions",
  ];

  exampleDatabase:JewelleryService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<jewel>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  widgets: boolean = false

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public jewelleryService: JewelleryService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService
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
    }else if(this.url.includes('list-jewellery-details')){
    this.widgets = false

    };
  }
 

  public loadData() {
    this.exampleDatabase = new JewelleryService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
    window.sessionStorage.setItem("jewelFrom", "jewel");
    this.router.navigate(['/master/jewellery/add-jewellery-details/0']);
    }else if(this.url.includes('list-jewellery-details')){
    window.sessionStorage.setItem("jewelFrom", "normal");
    this.router.navigate(['/master/jewellery/add-jewellery-details/0']);
    };
  }
  
  editCall(row) {
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("jewelFrom", "jewel");
    this.router.navigate(['/master/jewellery/add-jewellery-details/'+row.id]);
  }else if(this.url.includes('list-jewellery-details')){
    window.sessionStorage.setItem("jewelFrom", "normal");
    this.router.navigate(['/master/jewellery/add-jewellery-details/'+row.id]);
    };
  }

  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteJewelleryDetailsComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.jewelleryService.deletejewellery+ "?jewel_id=" + this.id).subscribe((res: any) => {
          this.showNotification(
            "snackbar-success",
            "Deleted record successfully...!!!",
            "bottom",
            "center"
          );
          this.loadData();
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );


      } else{
        this.loadData();
      }




      // else{
      //   this.showNotification(
      //     "snackbar-danger",
      //     "Error in Delete....",
      //     "bottom",
      //     "center"
      //   );
      // }
    });

  }
  viewCall(row){
    this.router.navigate(['/master/jewellery/add-jewellery-details/'+row.id]);
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
  onContextMenu(event: MouseEvent, item: jewel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<jewel> {
  filterChange = new BehaviorSubject("");
  snackBar: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: jewel[] = [];
  renderedData: jewel[] = [];
  constructor(
    public exampleDatabase: JewelleryService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<jewel[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getjewellerylist();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((jewelleryService: jewel) => {
            const searchStr = (
              jewelleryService.jewelName+
              jewelleryService.weight+
              jewelleryService.currentValue
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
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  // deleteItem(row){

  //   this.id = row.UserId;
  //   let tempDirection;
  //   if (localStorage.getItem("isRtl") === "true") {
  //     tempDirection = "rtl";
  //   } else {
  //     tempDirection = "ltr";
  //   }
  //   const dialogRef = this.dialog.open(DeleteJewelleryDetailsComponent, {
  //     height: "270px",
  //     width: "400px",
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      

  //     if (data.data == true) {

  //       this.httpService.get(this.JewelleryService.deleteCompany+ "?UserId=" + this.id).subscribe((res:any) => {
  //           if(res.success == true){
  //             this.showNotification(
  //               "snackbar-success",
  //               "Delete Record Successfully...!!!",
  //               "bottom",
  //               "center"
  //             );
  //           }
  //           else if(res.success == false){
  //             this.showNotification(
  //               "snackbar-danger",
  //               "You Can't Delete Related Data Exist...!!!",
  //               "bottom",
  //               "center");
  //             // this.loadData();
  //           }
          
          
  //       },
  //         (err: HttpErrorResponse) => {
  //           // error code here
  //         }
  //       );

      
  //     } 

  //   });

  // }


 
 
  
  
  
  
  
  
  
  
  
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: jewel[]): jewel[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "material":
          [propertyA, propertyB] = [a.material, b.material];
          break;
          case "weight":
            [propertyA, propertyB] = [a.weight, b.weight];
            break; 
            case "loan":
            [propertyA, propertyB] = [a.loan, b.loan];
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
