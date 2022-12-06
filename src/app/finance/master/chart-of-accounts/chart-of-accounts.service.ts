import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ChartOfAccounts } from "./chart-of-accounts.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ChartOfAccountsResultBean } from './chart-of-accounts-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<ChartOfAccounts[]> = new BehaviorSubject<ChartOfAccounts[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getSubGroupAccountMaster = `${this.serverUrl.apiServerAddress}api/auth/app/chartofaccounts/getList`;
   get data(): ChartOfAccounts[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllAccountHead(): void {
        this.subs.sink = this.httpService.get<ChartOfAccountsResultBean>(this.getSubGroupAccountMaster).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.lChartOfAccountsBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
}
