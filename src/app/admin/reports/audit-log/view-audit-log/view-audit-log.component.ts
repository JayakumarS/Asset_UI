import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { AuditLogService } from '../audit-log.service';

@Component({
  selector: 'app-view-audit-log',
  templateUrl: './view-audit-log.component.html',
  styleUrls: ['./view-audit-log.component.sass']
})
export class ViewAuditLogComponent implements OnInit {auditLogId: any;
  data: any;
  oldData: any;
  appModuleId: any;
  actionName: any;
  dataArrayKey: any = [];
  dataArrayValue: any = [];
  dataArrayOldKey: any = [];
  dataArrayOldValue: any = []
  jsondata: any = [];
  jsonolddata: any = [];
  dataNew: any;
  oldDataNew: any;
  auditLogView: any;
  auditId: any;

  constructor(
    public activatedRoute: ActivatedRoute, 
    private router: Router, 
    private auditLogService: AuditLogService, 
    private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.auditId = params.id);
    this.fetchDetails();
  }

  fetchDetails(): void {
    this.httpService.get(this.auditLogService.getDetails+"?auditId="+this.auditId).subscribe((res: any)=> {
      this.auditLogView = res.auditLogBean;
      this.actionName = this.auditLogView.actions;
         //Data
         if(this.auditLogView.data != null) {
            this.data = JSON.parse(this.auditLogView.data);
          } else {
            this.data = "No Data Available";
          }
          //Old Data
          if(this.auditLogView.oldData != null) {
            this.oldData = JSON.parse(this.auditLogView.oldData);
          } else {
           this.oldData = "No Data Available";
          }    
          for (const key of Object.keys(this.data)) {
            this.dataArrayKey.push(key);
          } 
          for (const value of Object.values(this.data)) {
            this.dataArrayValue.push(value);
          } 
          for (const key of Object.keys(this.oldData)) {
            this.dataArrayOldKey.push(key);
          } 
          for (const value of Object.values(this.oldData)) {
            this.dataArrayOldValue.push(value);
          }
          
          this.dataArrayKey.forEach((elementdatakey, index1 ) => {        
          this.dataArrayOldKey.forEach((elementolddatakey, index2) => {
          this.dataArrayValue.forEach((elementdatavalue, index3) => {        
          this.dataArrayOldValue.forEach((elementolddatavalue, index4) => {  
            if(index1 == index2) { 
              if(index2 == index3){
                if(index3 == index4){
                  if(index1 == index4){
              if(JSON.stringify(elementdatavalue) !== JSON.stringify(elementolddatavalue)) {
                this.jsondata.push(elementdatakey + ":" + elementdatavalue);
                this.jsonolddata.push(elementolddatakey + ":" + elementolddatavalue)
              }   }  }  }  }
            });
           });
          });
        });
        if(this.actionName != "DELETE") {
          if(this.jsondata.length != 0) {
          this.dataNew = JSON.parse(JSON.stringify(this.jsondata));
          console.log(this.dataNew);
          } else {
            this.dataNew = "No Changes";
          }
        }
        if(this.actionName != "INSERT") {
          if(this.jsonolddata.length != 0) {
          this.oldDataNew = JSON.parse(JSON.stringify(this.jsonolddata));
        } else {
          this.oldDataNew = "No Changes";
        } } 
      }, (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      });
  }

  // Back
  back(){
    this.router.navigate(['/admin/reports/auditLog/list-audit-log']);
  }

}
