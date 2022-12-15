import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { Auditresultbean } from '../audit-result-bean';


import { Addaudit } from '../audit.model';
import { AuditService } from '../audit.service';

@Component({
  selector: 'app-manage-audit',
  templateUrl: './manage-audit.component.html',
  styleUrls: ['./manage-audit.component.sass']
})

export class ManageAuditComponent implements OnInit {
  displayedColumns = [
  
  
   
      "startdate",
      "enddate",
      "auditname",
      "auditArray",
      
    ];
  auditlist:[""];

  

  
  docForm: FormGroup;
  requestId: any;
  edit:boolean=false;
   addaudit : Addaudit;
   auditArray: any;

 
  subs: any;
  dataSource: ExampleDataSource | null;
  exampleDatabase: AuditService | null;
  selection = new SelectionModel<Addaudit>(true, []);
  index: number;
  id: number;

 
  constructor(private fb: FormBuilder,
    private auditservice : AuditService,
    private httpService: HttpServiceService,
    // private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public auditService: AuditService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
  ){
  }

  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    contextMenuPosition = { x: "0px", y: "0px" };
  
  
    refresh(){
      this.loadData();
    }
  
    public loadData() {
      this.exampleDatabase = new AuditService(this.httpClient, this.serverUrl, this.httpService);
      this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort
      );
      // this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      //   () => {
      //     if (!this.dataSource) {
      //       return;
      //     }
      //     this.dataSource.filter = this.filter.nativeElement.value;
      //   }
      // );
    }
  
  
    editCall(row) {
  
      this.router.navigate(['/master/designation-Master/add-designation/'+row.id]);
  
    }
   
  
  ngOnInit(): void {
    this.docForm = this.fb.group({
      auditArray: [""],
      startdate:[""],
      enddate:[""],
      auditname:["", [Validators.required]],

   
    });
    this.loadData();
    this.httpService.get<Auditresultbean>(this.auditservice.activityserviceurl).subscribe(
      (data) => {
        this.auditlist = data.auditfielslist;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    ); 
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });
 }

 onSubmit(){
  this.addaudit = this.docForm.value;
    console.log(this.addaudit);
    this.auditservice.saveaudit(this.addaudit);
    
    this.router.navigate([]);
  }
  fetchDetails(id:any){
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
    onContextMenu(event: MouseEvent, item: Addaudit) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }
  }
  
  
  export class ExampleDataSource extends DataSource<Addaudit> {
    filterChange = new BehaviorSubject("");
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: Addaudit[] = [];
    renderedData: Addaudit[] = [];
    constructor(
      public exampleDatabase: AuditService,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      // Reset to the first page when the user changes the filter.
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
   /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Addaudit[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      // this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((addaudit: Addaudit) => {
            const searchStr = (
              
              addaudit.startdate +
              addaudit.enddate +
              addaudit.auditname +
              addaudit.auditArray 
             
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
    sortData(data: Addaudit[]): Addaudit[] {
      if (!this._sort.active || this._sort.direction === "") {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = "";
        let propertyB: number | string = "";
        switch (this._sort.active) {
        
          case "startdate":
            [propertyA, propertyB] = [a.startdate, b.startdate];
            break;
          case "enddate":
            [propertyA, propertyB] = [a.enddate, b.enddate];
            break;
            case "auditname":
            [propertyA, propertyB] = [a.auditname, b.auditname];
            break;
            case "auditArray":
            [propertyA, propertyB] = [a.auditArray, b.auditArray];
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
  
