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
  dataChange: BehaviorSubject<Reportscategory[]> = new BehaviorSubject<Reportscategory[]>(
    []
  );
  
  dialogData:any;
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


   
    getDialogData() {
      return this.dialogData;
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




