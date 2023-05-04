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
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle-model';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';



@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.sass']
})
export class ListVehicleComponent   extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "brand",
    "bodyStyle",
    "driveType",
    "actions",
  ];

  exampleDatabase:VehicleService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Vehicle>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public vehicleService:VehicleService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private tokenStorage: TokenStorageService,
    private notificationService:NotificationService
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
    this.exampleDatabase = new VehicleService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
    this.router.navigate(['/master/line/addLine/']);
    };
  }
  editCall(row) {
    
    this.router.navigate(['/master/vehicle/add-vehicle/'+row.id]);
    };
    deleteItem(row){
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
       tempDirection = "rtl";
     } else {
       tempDirection = "ltr";
     }
      const dialogRef = this.dialog.open(DeleteVehicleComponent, {
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
         this.vehicleService.deletevehicle(obj).subscribe({
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
    
    
    
 

 
 
   showNotification(colorName, text, placementFrom, placementAlign) {
     this.snackBar.open(text, "", {
       duration: 2000,
      verticalPosition: placementFrom,
       horizontalPosition: placementAlign,
       panelClass: colorName,
     });
   }

// context menu
  onContextMenu(event: MouseEvent, item: Vehicle) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
     this.contextMenuPosition.y = event.clientY + "px";
     this.contextMenu.menuData = { item: item };
     this.contextMenu.menu.focusFirstItem("mouse");
     this.contextMenu.openMenu();
   }
 }

export class ExampleDataSource extends DataSource<Vehicle> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Vehicle[] = [];
  renderedData: Vehicle[] = [];
  constructor(
    public exampleDatabase: VehicleService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  // Connect function called by the table to retrieve one stream containing the data to render. 
  connect(): Observable<Vehicle[]> {
   
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
          .filter(( VehicleService: Vehicle) => {
            const searchStr = (
              VehicleService.brand+
              VehicleService.bodyStyle+
              VehicleService.driveType
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
  //Returns a sorted copy of the database data. 
  sortData(data: Vehicle[]): Vehicle[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "brand":
          [propertyA, propertyB] = [a.brand, b.brand];
          break;
          case "bodyStyle":
            [propertyA, propertyB] = [a.bodyStyle, b.bodyStyle];
            break; 
            case "driveType":
            [propertyA, propertyB] = [a.driveType, b.driveType];
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
    