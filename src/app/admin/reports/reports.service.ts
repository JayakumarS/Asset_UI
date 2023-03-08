import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Reportscategory } from './reports-model';
import { reportsresultbean } from './reports-result-bean';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dialogData: any;
  dataChange: BehaviorSubject<Reportscategory[]> = new BehaviorSubject<Reportscategory[]>(
    []
  );
  UserId: String;

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,  public tokenStorage: TokenStorageService
    ) {
    super();

    }
    public statusListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getstatusList`;
    public categoryListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getcategoryList`;
    // public statusListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getstatusList`;
    public assetListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getassetList`;
    public reportserach = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getreportserach`;
    public locationsearch = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getlocationserach`;
    public depreciationSerach = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getDepreciationSerach`;
    public auditSerach = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getAuditSerach`;
    public getdiscardedReports = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getDiscardedReports`;
    public getUserNameDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getusernamelist`;
    public getUserLogList = `${this.serverUrl.apiServerAddress}api/auth/app/userLog/getList`;
    public UserSerach = `${this.serverUrl.apiServerAddress}api/auth/app/userLog/getUserSerach`;
    public assetHistoryListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getassetHistoryList`;
    public assetHistoryListExcelUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/excelExport`;
    public assetdueList = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getDueList`;
    get data(): Reportscategory[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }


    userloglist(object){

      this.UserId=this.tokenStorage.getCompanyId();

        console.log(object);
      this.subs.sink = this.httpService.get<reportsresultbean>(this.getUserLogList+"?UserId="+this.UserId,object).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.usernamelist);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );

    }
    getAllList(object): void {
      console.log(object);
      this.subs.sink = this.httpService.post<any>(this.assetListUrl, object).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.assetList);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
}

getLocationList(object): void {
  console.log(object);
  this.subs.sink = this.httpService.post<any>(this.locationsearch, object).subscribe(
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.categoryList);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}

getDepreciationList(object): void {
  console.log(object);
  let companyId = this.tokenStorage.getCompanyId();

  this.subs.sink = this.httpService.post<any>(this.depreciationSerach , object).subscribe(
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.depreciationList);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}


getDueList(object): void {
  console.log(object);
  let companyId = this.tokenStorage.getCompanyId();

  this.subs.sink = this.httpService.post<any>(this.assetdueList + "?companyId=" + parseInt(companyId) , object).subscribe(
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.dueList);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}


}




