import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { Reportscategory } from '../reports-model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ReportsService } from '../reports.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, ElementRef,  QueryList, ViewChild, ViewChildren } from '@angular/core';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

import { serverLocations } from 'src/app/auth/serverLocations';

import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-discard-assets',
  templateUrl: './discard-assets.component.html',
  styleUrls: ['./discard-assets.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
      },
  } },CommonService
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiscardAssetsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<SubList>>;

  dataSource: MatTableDataSource<MainList>;
  docForm: FormGroup;
  locationDdList: any;
  discardReport: any;
  isTblLoading: boolean;
  locationList =[];
  mainList =[];

  columnsToDisplay = ["assetName", "discardReason","discardedDate", "location"];
  innerDisplayedColumns = ["srcLocation","dtnLocation","assetUser", "transferDate", "assetIdDiscard"];

  expandedElement: MainList | null;
  expandedElements: any[] = [];
  innerExpandedElements: any[] = [];
  glList=[];
  gllist: MainList[] = [];
  
  itemNameDdList: any;

  constructor(private fb: FormBuilder,private httpService:HttpServiceService,
    public dialog: MatDialog,
    public router:Router,
    private notificationService : NotificationService,
    private cd: ChangeDetectorRef,
    private cmnService:CommonService,private reportsService: ReportsService,
    private commonService: CommonService,   
     private tokenstroage: TokenStorageService) { 


       super();{ 
       }
    this.docForm = this.fb.group({
     
      // location: [""],
      // discardDateObj: [""],
      // discardDate:[""],

      discardDateFromObj:[""],
      discardFromDate:[""],
      discardDateToObj:[""],
      discardToDate:[""],
      companyId :this.tokenstroage.getCompanyId() 
     
      
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

    this.docForm = this.fb.group({
      discardDateFromObj:[""],
      discardDateToObj:[""],
      discardFromDate:[""],
      discardToDate:[""],
      companyId :this.tokenstroage.getCompanyId() 

    });

    this.viewReport();
     // Location dropdown
 this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
  next: (data) => {
    this.locationDdList = data;
  },
  error: (error) => {

  }
}
);
  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='discardFromDate'){
      this.docForm.patchValue({discardFromDate:cdate});
    }
     else if (inputFlag=='discardToDate'){
      this.docForm.patchValue({discardToDate:cdate});
    }
  }

 
  viewReport(){
    this.discardReport = this.docForm.value;
    this.mainList=[];
    this.gllist=[];
    this.httpService.post(this.reportsService.getdiscardedReports, this.discardReport).subscribe((res: any) => {
      console.log(res.discardedReports);
      this.mainList=res.discardedReports;
      if(this.mainList!=null){
      this.mainList.forEach(data => {
        if (data.subList && Array.isArray(data.subList) && data.subList.length) {
          this.gllist = [...this.gllist,
            { ...data, subList: new MatTableDataSource(data.subList) }
          ];
        } 
      
        else {
          this.gllist = [...this.gllist, data];
        }
      });
    }
      this.dataSource = new MatTableDataSource(this.mainList);
     this.dataSource.sort = this.sort;
    });
 
  }


  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<SubList>).filter = filterValue.trim().toLowerCase())
    );
  }

  toggleRow(element: MainList) {
    element.subList &&(element.subList as MatTableDataSource<SubList>)? this.toggleElement(element): null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<SubList>).sort = this.innerSort.toArray()[index])
    );
  }
  toggleElement(row1: MainList) {
    const index = this.expandedElements.findIndex(x => x.assetName == row1.assetName);
    if (index === -1) {
      this.expandedElements.push(row1);
    } else {
      this.expandedElements.splice(index, 1);
    }
  }
  isExpanded(row1: MainList): string {
    const index = this.expandedElements.findIndex(x => x.assetName == row1.assetName);
    if (index !== -1) {
      return 'expanded';
    }
    return 'collapsed';
  }

  reset(){
   
    this.docForm = this.fb.group({
      discardDateFromObj:[""],
      discardFromDate:[""],
      discardDateToObj:[""],
      discardToDate:[""],
     
    });
    this.mainList=[];
    this.gllist=[];
    this.viewReport();
  }
}


export interface MainList {
  assetName:String;
  location:String;
  categoryName:String;
  quantity:String;
  subList?: SubList[] | MatTableDataSource<SubList>;
}

export interface SubList {
  transferDate:String;
  transferQuantity:String;
  sourceLocation:String;
  destinationLocation:String;
}

