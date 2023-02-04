import { Component, OnInit,ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/common-service/common.service';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";

@Component({
  selector: 'app-add-audit-report',
  templateUrl: './add-audit-report.component.html',
  styleUrls: ['./add-audit-report.component.sass']
})
export class AddAuditReportComponent extends UnsubscribeOnDestroyAdapter implements OnInit {



  docForm: FormGroup;
  dataSource: MatTableDataSource<MainList>;

  displayedColumns = ["siNo", "assetId","name","acqDate","currency","acqValue","accDep","bookValue","actions"];

  constructor(private fb: FormBuilder,private cmnService:CommonService,) 
  
  {  
    
    super();
    
    this.docForm = this.fb.group({
     
    
    discardDateFromObj:[""],
    discardFromDate:[""],
    discardDateToObj:[""],
    discardToDate:[""],
    
    siNo:[""],
    assetId:[""],
    name:[""],
    acqDate:[""],
    currency:[""],
    acqValue:[""],
    accDep:[""],
    bookValue:[""],
    actions:[""],
  });
}

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

   
  }
  
  getDateString(event,inputFlag){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='discardFromDate'){
      this.docForm.patchValue({discardFromDate:cdate});
    }
    else if (inputFlag == 'discardToDate') {
      this.docForm.patchValue({ discardToDate: cdate });
    }

  };

}
export interface MainList {
  siNo:String;
  assetId:String;
  name:String;
  acqDate:String;
  currency:String;
  acqValue:String;
  accDep:String;
  bookValue:String;
  // subList?: SubList[] | MatTableDataSource<SubList>;
}
