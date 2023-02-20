import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, map, merge, Observable, startWith } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuditLogMaster } from '../audit-log.model';
import { AuditLogService } from '../audit-log.service';

@Component({
  selector: 'app-list-audit-log',
  templateUrl: './list-audit-log.component.html',
  styleUrls: ['./list-audit-log.component.sass']
})
export class ListAuditLogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "userName",
    "actions",
    "form",
    "ipAddress",
    "dateTime",
    "action"
    
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: AuditLogService | null;
  selection = new SelectionModel<AuditLogMaster>(true, []);
  index: number;
  id: number;
  auditLogMaster: AuditLogMaster | null;
  docForm : FormGroup
  userNameList: [];
  formNameList: [];
  userfilteredOptions: Observable<string[]>;
  formfilteredOptions: Observable<string[]>;
  userOptions: string[];
  formOptions: string[];
  selectedUser: any;
  userArray = [];
  formArray = [];
  form : String;
  myControl = new FormControl('');
  myControlUser = new FormControl('');

  constructor(
    public httpClient: HttpClient,
     public dialog: MatDialog,
     public auditLogService: AuditLogService,
     private serverUrl:serverLocations,
     private httpService:HttpServiceService,
     public router: Router,
     private notificationService : NotificationService,
    //  private EncrDecr:EncrDecrService,
     private spinner: NgxSpinnerService,
     private snackBar: MatSnackBar,
     private fb: FormBuilder,
     private cmnService:CommonService
  ) {
    super();

    this.docForm = this.fb.group({
      userName : [""],
      actions : [""],
      form : [""],
      dateTime : [""],
      ipAddress : [""],
      fromDate : [""],
      toDate : [""],
      formName : [""],
      fromDateObj : [""],
      toDateObj : [""]
      
   });
  }

  valueforForm = {
    formName : '',
    userName : ''
  }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild("filter", { static: true }) filter: ElementRef;
   @ViewChild(MatMenuTrigger)
   contextMenu: MatMenuTrigger;
   contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.loadData();

    // this.httpService.get<AuditLogMasterResultBean>(this.auditLogService.userNameList).subscribe(
    //   (data) => {
    //     this.userNameList = data.userNameList;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.name + " " + error.message);
    //   }
    // );

    this.httpService.get(this.auditLogService.userNameList).subscribe((res: any) => {
      this.userNameList = res.userNameList;
      for (let m = 0; m < res.userNameList.length; m++) {
        this.userArray.push(res.userNameList[m].text);
        this.userOptions = this.userArray;
      }


      this.userfilteredOptions = this.myControlUser.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );

    });

    // this.httpService.get<AuditLogMasterResultBean>(this.auditLogService.formNameList).subscribe(
    //   (data) => {
    //     this.formNameList = data.formList;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.name + " " + error.message);
    //   }
    // );
    

    this.httpService.get(this.auditLogService.formNameList).subscribe((res: any) => {
      this.formNameList = res.formList;
      for (let m = 0; m < res.formList.length; m++) {
        this.formArray.push(res.formList[m].text);
        this.formOptions = this.formArray;
      }

      this.formfilteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterForm(value)),
      );

    });
  }

  public loadData() {
    this.exampleDatabase = new AuditLogService(this.httpClient,this.serverUrl,this.httpService);
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
   
    this.auditLogMaster = this.docForm.value;
    this.docForm.value.formName = this.valueforForm.formName;
    this.docForm.value.userName = this.valueforForm.userName;
    this.exampleDatabase.getAllList(this.auditLogMaster);
   
}

viewCall(row) {
 // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.auditId);
  this.router.navigate(['/admin/reports/auditLog/view-audit-log/',  row.auditId]);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.userOptions.filter(obj => obj.toLowerCase().includes(filterValue));
}

private _filterForm(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.formOptions.filter(obj => obj.toLowerCase().includes(filterValue));
}


// viewCall(row :{ auditId:any }) {
//   var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.auditId);
//   this.router.navigate(['/admin/auditLog/view-audit-log/',  encrypted]);
// }

  // context menu
  onContextMenu(event: MouseEvent, item: AuditLogMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='fromDate'){
      this.docForm.patchValue({fromDate:cdate});
    }else if(inputFlag == 'toDate') {
      this.docForm.patchValue({toDate:cdate});
    }
  }

  refresh(){
    this.docForm = this.fb.group({
      userName : [""],
      actions : [""],
      form : [""],
      dateTime : [""],
      ipAddress : [""],
      fromDate : [""],
      toDate : [""],
      formName: [""],
      fromDateObj : [""],
      toDateObj : [""]
   });
   this.valueforForm.formName = '';
   this.valueforForm.userName = '';
   this.exampleDatabase.getAllList(this.docForm.value);
   }

}

export class ExampleDataSource extends DataSource<AuditLogMaster> {
  filterChange = new BehaviorSubject("");
 
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AuditLogMaster[] = [];
  renderedData: AuditLogMaster[] = [];
  constructor(
    public exampleDatabase: AuditLogService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm:FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AuditLogMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
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
          .filter((auditLogMaster: AuditLogMaster) => {
            const searchStr = (
              auditLogMaster.userName ,
              auditLogMaster.form 
              
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
  sortData(data: AuditLogMaster[]): AuditLogMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      
      switch (this._sort.active) {
        case "userName":
          [propertyA, propertyB] = [a.userName, b.userName];
        break;
        case "form":
            [propertyA, propertyB] = [a.form, b.form];
        break;
        case "actions":
          [propertyA, propertyB] = [a.actions, b.actions];
        break;
        case "ipAddress":
          [propertyA, propertyB] = [a.ipAddress, b.ipAddress];
        break;
        case "dateTime":
          [propertyA, propertyB] = [a.dateTime, b.dateTime];
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
