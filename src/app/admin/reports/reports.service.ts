import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Reportscategory } from './reports-model';
import { reportsresultbean } from './reports-result-bean';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dialogData: Reportscategory;
  dataChange: BehaviorSubject<Reportscategory[]> = new BehaviorSubject<Reportscategory[]>(
    []
  );


  

  data: any;
  

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) { 
    super();
  
    }

    public categoryListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getcategoryList`;
    public statusListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getstatusList`;
    public assetListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getassetList`;
    public reportserach = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getreportserach`;
    public locationsearch = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getlocationserach`;
    public depreciationSerach = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getDepreciationSerach`;
    public auditSerach = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getAuditSerach`;
    public getdiscardedReports = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getDiscardedReports`;
    public getUserNameDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getusernamelist`;
    public getUserLogList = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getUserLoglist`;

    

   
    getDialogData() {
      return this.dialogData;
    }
    userloglist(object){
      console.log(object);
      this.subs.sink = this.httpService.post<reportsresultbean>(this.getUserLogList,object).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.userlogDetails);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  
    }
  
    getAllList(){
  this.subs.sink = this.httpService.get<reportsresultbean>(this.reportserach).subscribe(
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.reportsDetails);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}

  
}




