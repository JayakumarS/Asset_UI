import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MutualFundService } from '../mutualfund.service';
import { Fund } from '../mutualfund-model';
import { DeleteFundComponent } from './delete-fund/delete-fund.component';

@Component({
  selector: 'app-list-fund',
  templateUrl: './list-fund.component.html',
  styleUrls: ['./list-fund.component.sass']
})
export class ListFundComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "name",
    "accountnumber",
    "tin",
    "actions",
  ];
  docForm: FormGroup;
  exampleDatabase:MutualFundService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Fund>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  constructor(private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public mutualFundService:MutualFundService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    public commonService: CommonService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,

  ) {
    super(); 
    this.docForm = this.fb.group({
     
      
      name:[""],
      accountnumber:[""],
      tin:[""],
      actions: [""],
      loginedUser: this.tokenStorage.getUserId()
   
    }); 
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
    this.exampleDatabase = new MutualFundService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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
  addNew(){
    
    this.router.navigate(['/master/mutualfund/add-fund/0']);
    };
  
  editCall(row) {
  
    
    this.router.navigate(['/master/mutualfund/add-fund/'+row.fundNo]);
   
  }
  deleteItem(row){
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
    const dialogRef = this.dialog.open(DeleteFundComponent, {
     height: "270px",
     width: "400px",
     data: row,
     direction: tempDirection,
     disableClose: true
   });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     if (data.data == true) {
       const obj = {
         deletingId: row.fundNo
       }
       this.mutualFundService.deletefund(obj).subscribe({
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
  
  
  
                
          
 

  viewCall(row){
    this.router.navigate(['/master/mutualfund/add-fund/'+row.fundNo]);
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
  onContextMenu(event: MouseEvent, item: Fund) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Fund> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Fund[] = [];
  renderedData: Fund[] = [];
  constructor(
    public exampleDatabase: MutualFundService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Fund[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getfundList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((Fund: Fund) => {
            const searchStr = (
              Fund.name+
              Fund.accountnumber+
              Fund.tin
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
  sortData(data: Fund[]): Fund[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
          case "accountnumber":
            [propertyA, propertyB] = [a.accountnumber, b.accountnumber];
            break; 
            case "tin":
            [propertyA, propertyB] = [a.tin, b.tin];
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




