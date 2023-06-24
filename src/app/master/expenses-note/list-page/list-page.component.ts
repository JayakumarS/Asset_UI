import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ExpensesNoteService } from '../expenses-note.service';
import { expenese } from '../expenses-note.model';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.sass']
})
export class ListPageComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 
    "cashinout",
    "category",
    "detail",
    "currency",
    "amount",
    "date",
    "time",
    "paymentMethod",
  
    
    
  
  ];
  in: boolean = false;
  income: boolean = true;
  cashin: boolean = true;
  docForm: FormGroup;
  requestId: any;
  exampleDatabase:ExpensesNoteService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<expenese>(true, []);
  exporter: any;
  id: number;
  tid:number;
  index: number;
  url: string;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public expensesNoteService: ExpensesNoteService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    public route: ActivatedRoute, 
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
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


      this.docForm = this.fb.group({
         

    balance:[""],
    expensescash:[""],
    income:[""],
  
      })
     
      this.route.params.subscribe(params => {
       
        if(params.id!=undefined && params.id!=0){
         this.requestId = params.id;
        
         //For User login Editable mode
         this.fetchDetails(this.requestId) ;
        }
       });
    }
  
    fetchDetails(requestId: any): void{
     
      const obj = {
        dataId: requestId
      }
     
      this.expensesNoteService.getincome(obj).subscribe({
        next: (res) => {
        
  
        this.docForm.patchValue({
         
            'balance': res.expensesNoteBean.balance,
            'expensescash': res.expensesNoteBean.expensescash,
            'income': res.expensesNoteBean.income,
 
            'id' :this.requestId
        
           
        
        });
      },
      error: (error) => {
      }
    });
    }

  public loadData() {
    
    this.exampleDatabase = new ExpensesNoteService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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

  addincome(){
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("expensesFrom", "expenses");
    this.router.navigate(['/master/expenses/income']);
    }else if(this.url.includes('list')){
    window.sessionStorage.setItem("expensesFrom", "normal");
    this.router.navigate(['/master/expenses/income']);
    };
  }
  addexpenses(){
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("expensesFrom", "expenses");
    this.router.navigate(['/master/expenses/expensesnote']);
    }else if(this.url.includes('list')){
    window.sessionStorage.setItem("expensesFrom", "normal");
    this.router.navigate(['/master/expenses/expensesnote']);
    };
  }
  getCash(check: any){
    this.router.navigate(['/master/expenses/expensesnote']);
  }
  editCall(row) {
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("expensesFrom", "expenses");
    this.router.navigate(['/master/expenses/add-expenese-note/']);
  }else if(this.url.includes('list-expenses')){
    window.sessionStorage.setItem("expensesFrom", "normal");
    this.router.navigate(['/master/expenses/add-expenese-note/']);
    };
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
  onContextMenu(event: MouseEvent, item: expenese) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<expenese> {
  filterChange = new BehaviorSubject("");
  snackBar: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: expenese[] = [];
  renderedData: expenese[] = [];
  constructor(
    public exampleDatabase: ExpensesNoteService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<expenese[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getexpenseslist();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((ExpensesNoteService: expenese) => {
            const searchStr = (
              ExpensesNoteService.category+
              ExpensesNoteService.detail+
              ExpensesNoteService.amount+
              ExpensesNoteService.currency+
              ExpensesNoteService.date+
              ExpensesNoteService.paymentMethod+
              ExpensesNoteService.cashinout+ 
              ExpensesNoteService.time
             
              

             
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
  sortData(data: expenese[]): expenese[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "category":
          [propertyA, propertyB] = [a.category, b.category];
          break;
          case "detail":
            [propertyA, propertyB] = [a.detail, b.detail];
            break; 
            case "amount":
            [propertyA, propertyB] = [a.amount, b.amount];
            break;
            case "currency":
            [propertyA, propertyB] = [a.currency, b.currency];
            break;
            case "date":
            [propertyA, propertyB] = [a.date, b.date];
            break;
            case "paymentMethod":
            [propertyA, propertyB] = [a.paymentMethod, b.paymentMethod];
            break;
            case "cashinout":
            [propertyA, propertyB] = [a.cashinout, b.cashinout];
            break;
            case "time":
              [propertyA, propertyB] = [a.time, b.time];
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


