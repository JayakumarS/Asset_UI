
import { Router } from '@angular/router';
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
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { VehicleMaster } from '../vehicle-model';
import { VehicleService } from '../vehicle.service';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';

						
@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.sass']
})
export class ListVehicleComponent  extends UnsubscribeOnDestroyAdapter implements OnInit{

  displayedColumns=[
      "regno",
      "vehiclebrand",
      "engineno",
      "ownertype",
      "actions"
  ];

  dataSource:ExampleDataSource|null;
  selection = new SelectionModel<VehicleMaster>(true, []);
  exporter: any;
  isTblLoading: boolean;
  exampleDatabase: VehicleService| null;
  permissionList: any;
  url: string;
  id:number;

    constructor( public httpClient: HttpClient,
                 private spinner: NgxSpinnerService,
                 public dialog: MatDialog,
                 public vehicleService: VehicleService,
                 private snackBar: MatSnackBar,
                 private router: Router,
                 private serverUrl: serverLocations,
                 private httpService: HttpServiceService,
                 private tokenStorage: TokenStorageService,
                 public commonService: CommonService,
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
      const permissionObj = {
        formCode: 'F1041',
        roleId: this.tokenStorage.getRoleId()
      }
      this.spinner.show();
      this.commonService.getAllPagePermission(permissionObj).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.permissionList = data;
          }
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
      this.loadData();
    }

    addPage(){
      this.url=this.router.url;
      if(this.url.includes("allMaster")){
      window.sessionStorage.setItem("vehicleFrom", "vehicle");
      this.router.navigate(['/master/vehicle/add-vehicle/0']);
      }else if(this.url.includes('list-vehicle')){
      window.sessionStorage.setItem("vehicleFrom", "normal");
      this.router.navigate(['/master/vehicle/add-vehicle/0']);
      };
    }
   

    refresh() {
      this.loadData();
    }

    public loadData() {
      this.exampleDatabase = new VehicleService(this.httpClient, this.serverUrl, this.tokenStorage, this.httpService,);
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

    addVehicle(){
      this.router.navigate(['/master/vehicle/add-vehicle']);
    }

    editCall(row) {
      this.router.navigate(['master/vehicle/add-vehicle/' + row.id]);
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
  onContextMenu(event: MouseEvent, item: VehicleMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<VehicleMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: VehicleMaster[] = [];
  renderedData: VehicleMaster[] = [];

  constructor(
    public exampleDatabase: VehicleService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<VehicleMaster[]> {
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
          .filter((vehicleMaster: VehicleMaster) => {
            const searchStr = (
              vehicleMaster.id+
              vehicleMaster.vehiclename  +
              vehicleMaster.vehicletype  +
                vehicleMaster.vehiclebrand  +
              vehicleMaster.regno  +
           vehicleMaster.chassisno  +
           vehicleMaster.engineno  +
           vehicleMaster.bodytype  +
           vehicleMaster.fueltype  +
           vehicleMaster.ownertype  +
            vehicleMaster.dateofpurc  +
            vehicleMaster.insurancedetails  +
           vehicleMaster.service  +
           vehicleMaster.discardFromDate  +
            vehicleMaster.discardFromDate1  +
            vehicleMaster.vehiclewheel  +
           vehicleMaster.colour  +
            vehicleMaster.age  +
           vehicleMaster.rtocode  +
            vehicleMaster.purcamount  +
            vehicleMaster.insurancetype  +
           vehicleMaster.insuredamount  +
           vehicleMaster.payment  +
            vehicleMaster.insurername  +
            vehicleMaster.validity  +
           vehicleMaster.address  +
           vehicleMaster.yom  +
           vehicleMaster.license  +
           vehicleMaster.lin  +
           vehicleMaster.agency  +
             vehicleMaster.emiamount  
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
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: VehicleMaster[]): VehicleMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "vehiclename":
          [propertyA, propertyB] = [a.vehiclename, b.vehiclename];
          break;
          case "fueltype":
          [propertyA, propertyB] = [a.fueltype, b.fueltype];
          break;
        

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA.toString().toLowerCase() < valueB.toString().toLowerCase() ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}


  
