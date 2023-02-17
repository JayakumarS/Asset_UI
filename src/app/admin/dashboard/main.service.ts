import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MainResultBean } from './main-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { main } from './main-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class MainService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<main[]> = new BehaviorSubject<main[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private getAllAssets = `${this.serverUrl.apiServerAddress}app/addAsset/getAssetList`;
  public earningsListCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/getEarningsListCount`;
  public auditorsListCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/getAuditorsListCount`;
  public assetsListCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/getAssetsListCount`;
  public usersListCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/getUsersListCount`;
  public purchaseAssetsCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/purchaseAssetsCount`;
  public depreciatedCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/depreciatedCount`;
  public getAuditableAssetListUrl = `${this.serverUrl.apiServerAddress}app/auditableAsset/getAuditableAssetList`;
  public getAssetListUrl = `${this.serverUrl.apiServerAddress}app/assetMaster/getAssetListForDashboard`;
  public getAssetSurveyURL = `${this.serverUrl.apiServerAddress}app/dashboard/getAssetSurvey`;
  public getClientSurveyURL = `${this.serverUrl.apiServerAddress}app/dashboard/getClientSurvey`;
  public getItSupportTicketURL = `${this.serverUrl.apiServerAddress}app/dashboard/getItSupportTicket`;
  public getActivityPopUpUrl = `${this.serverUrl.apiServerAddress}app/dashboard/getActivityPopUpDetails`;
  public companyAuditorsCountUrl = `${this.serverUrl.apiServerAddress}app/dashboard/getCompanyAuditorsCount`;
  public getCompanyAssetListUrl = `${this.serverUrl.apiServerAddress}app/assetMaster/getAssetList`;
  public getbookValueEndGraphURL = `${this.serverUrl.apiServerAddress}app/dashboard/getbookValueEndGraph`;
  public getBarChartURL = `${this.serverUrl.apiServerAddress}app/dashboard/getbarGraphDetails`;
  public AuditableAssetListDashboardUrl = `${this.serverUrl.apiServerAddress}app/auditableAsset/getAuditableAssetListForDashboard`;
  public userLogListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userLog/userloglistForDashboard`;

  get data(): main[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  


    /** CRUD METHODS */
    getAllList(date:any): void {
      this.subs.sink = this.httpService.get<MainResultBean>(this.getActivityPopUpUrl+ "?todayDate=" +date).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.scheduleActivityDetails);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
}
}
