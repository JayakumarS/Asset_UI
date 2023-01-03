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
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CustomerMaster } from '../customer-model';
import { CustomerService } from '../customer.service';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.sass']
})
export class ListCustomerComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns=[
    "auditorname",
    "person",
    "email",
    "phone",
    "state",
    "actions"


  ];

exampleDatabase:CustomerService | null;
dataSource:ExampleDataSource|null;
  selection = new SelectionModel<CustomerMaster>(true, []);
exporter: any;



  constructor( public httpClient: HttpClient,
    public dialog: MatDialog,
    public customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
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
    //window.location.reload();
    this.load();
  }

  load(){
    this.router.navigate(['/master/customer/list-customer']);
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CustomerService(this.httpClient,this.serverUrl,this.httpService);
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

  editCall(row) {
 
    this.router.navigate(['/master/customer/add-customer/'+row.cus_id]);

  }
  deleteItem(row) {
    let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(DeleteComponent, {
     height: "270px",
     width: "400px",
     data: row,
     direction: tempDirection,
     disableClose: true
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     if (data.data == true) {
       const obj = {
         deletingId: row.cus_id
       }
       this.customerService.deleteCustomer(obj).subscribe({
        next: (data) => {
          if (data.success) {
            this.loadData();
            this.showNotification(
              "snackbar-success",
              "Delete Record Successfully...!!!",
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
















  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
// context menu
  onContextMenu(event: MouseEvent, item: CustomerMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

export class ExampleDataSource extends DataSource<CustomerMaster> {
 filterChange = new BehaviorSubject("");
 get filter(): string {
   return this.filterChange.value;
 }
 set filter(filter: string) {
   this.filterChange.next(filter);
 }
 filteredData: CustomerMaster[] = [];
 renderedData: CustomerMaster[] = [];
 constructor(
   public exampleDatabase: CustomerService,
   public paginator: MatPaginator,
   public _sort: MatSort
 ) {
   super();
  
   this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
 }
 /** Connect function called by the table to retrieve one stream containing the data to render. */
 connect(): Observable<CustomerMaster[]> {
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
         .filter((customerMaster: CustomerMaster) => {
           const searchStr = (
            customerMaster.auditorname +
            customerMaster.registercode +
            customerMaster.person +
            customerMaster.phone+ 
            customerMaster.address+ 
            customerMaster.addresstwo+ 
            customerMaster.city+ 
            customerMaster.state+ 
            customerMaster.postalcode+ 
            customerMaster.panno+ 
            customerMaster.gstno+ 
            customerMaster.cstno+ 
            customerMaster.remarks+ 
            customerMaster.active
            
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
 sortData(data: CustomerMaster[]): CustomerMaster[] {
   if (!this._sort.active || this._sort.direction === "") {
     return data;
   }
   return data.sort((a, b) => {
     let propertyA: number | string |boolean= "";
     let propertyB: number | string |boolean= "";
     switch (this._sort.active) {
      
       case "auditorname":
         [propertyA, propertyB] = [a.auditorname, b.auditorname];
         break;
       case "registercode":
         [propertyA, propertyB] = [a.registercode, b.registercode];
         break;
       case "person":
         [propertyA, propertyB] = [a.person, b.person];
         break;
       case "email":
           [propertyA, propertyB] = [a.email, b.email];
         break;  
         case "phone":
          [propertyA, propertyB] = [a.phone, b.phone];
        break;  
        case "address":
          [propertyA, propertyB] = [a.address, b.address];
        break;  
        case "addresstwo":
          [propertyA, propertyB] = [a.addresstwo, b.addresstwo];
        break;  
        case "city":
          [propertyA, propertyB] = [a.city, b.city];
        break;  
        case "state":
          [propertyA, propertyB] = [a.state, b.state];
        break;  
        case "postalcode":
          [propertyA, propertyB] = [a.postalcode, b.postalcode];
        break;  
        case "panno":
          [propertyA, propertyB] = [a.panno, b.panno];
        break;  
        case "gstno":
          [propertyA, propertyB] = [a.gstno, b.gstno];
        break;  
        case "cstno":
          [propertyA, propertyB] = [a.cstno, b.cstno];
        break;  
        case "remarks":
          [propertyA, propertyB] = [a.remarks, b.remarks];
        break;  

        case "active":
          [propertyA, propertyB] = [a.active, b.active];
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
