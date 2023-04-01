import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable, startWith } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CityMaster } from '../city-model';
import { CityService } from '../city.service';
import { DeleteCityComponent } from './delete-city/delete-city.component';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.sass']
})
export class ListCityComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    
    "villageName",
    "districtId",
    "stateId",
    "countryId",
  ];
  docForm: FormGroup;
  pincodeList = [];
  exampleDatabase:CityService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<CityMaster>(true, []);
  cityService:CityService | null;
  exporter: any;
  index: any;
  id: any;
  subs: any;
  formfilteredOptions: Observable<string[]>;
  myControl = new FormControl('');
  myControlUser = new FormControl('');

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    super();

    this.docForm = this.fb.group({
      pincode : '',

   });
  }

  valueforForm = {
    pincode : '',
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  
  ngOnInit(): void {
    this.loadData();


    
    this.formfilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterForm(value)),
    );

  }
  private _filterForm(value: any): any {
    throw new Error('Method not implemented.');
  }
  
    
  
    onContextMenu(event: MouseEvent, item: CityMaster) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }
    load(){
      this.router.navigate(['/master/cityMaster/listCity']);
     }
    public loadData() {
      this.exampleDatabase = new CityService (this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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

    onSubmit() {
   
      this.cityService = this.docForm.value;
      this.docForm.value.pincode = this.valueforForm.pincode;
      this.exampleDatabase.getAllList(this.cityService);
     
  }
  
    // editCall(row){
    // this.router.navigate(['/master/cityMaster/addCity/'+row.city_id]);
    // }
    deleteItem(index,row) {
      let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
   tempDirection = "rtl";
 } else {
   tempDirection = "ltr";
 }
  const dialogRef = this.dialog.open(DeleteCityComponent, {
   height: "270px",
   width: "400px",
   data: row,
   direction: tempDirection,
   disableClose: true
 });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
   if (data.data == true) {
     const obj = {
       deletingId: row.city_id
     }
     this.cityService.deleteCity(obj).subscribe({
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
      this.snackBar.open(text, " ", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    refresh(){
      this.docForm = this.fb.group({
        pincode: [""]
     });
     this.valueforForm.pincode = '';
     this.exampleDatabase.getAllList(this.docForm.value);
     }
  
  }

     
    
    export class ExampleDataSource extends DataSource<CityMaster> {
      filterChange = new BehaviorSubject("");
      get filter(): string {
        return this.filterChange.value;
      }
      set filter(filter: string) {
        this.filterChange.next(filter);
      }
      filteredData: CityMaster[] = [];
      renderedData: CityMaster[] = [];
      constructor(
        public exampleDatabase: CityService,
        public paginator: MatPaginator,
        public _sort: MatSort,
        public docForm:FormGroup

      ) {
        super();
        // Reset to the first page when the user changes the filter.
        this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
      }
      /** Connect function called by the table to retrieve one stream containing the data to render. */
      connect(): Observable<CityMaster[]> {
       
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
              .filter((cityMaster: CityMaster) => {
                const searchStr = (
                  cityMaster.villageName+
                  cityMaster.state_id+
                  cityMaster.city_id
                ).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
              });
          
            const sortedData = this.sortData(this.filteredData.slice());
            //console.log(this.exampleDatabase.data);
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
      sortData(data: CityMaster[]): CityMaster[] {
        if (!this._sort.active || this._sort.direction === "") {
          return data;
        }
        return data.sort((a, b) => {
          let propertyA: number | string | boolean = "";
          let propertyB: number | string | boolean = "";
          switch (this._sort.active) {
            case "villageName":
              [propertyA, propertyB] = [a.villageName, b.villageName];
              break;
              case "state_id":
                [propertyA, propertyB] = [a.state_id, b.state_id];
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
