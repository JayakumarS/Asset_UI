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

  private getAllAssets = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getAssetList`;
  public earningsListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/dashboard/getEarningsListCount`;
  public auditorsListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/dashboard/getAuditorsListCount`;
  public assetsListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/dashboard/getAssetsListCount`;
  public usersListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/dashboard/getUsersListCount`;
  get data(): main[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  


    /** CRUD METHODS */
    getAllList(): void {
      this.subs.sink = this.httpService.get<MainResultBean>(this.getAllAssets).subscribe(
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
}
