import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Reportscategory } from '../reports-model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceivablesreportService {  isTblLoading = true;
  dialogData: any;
  dataChange: BehaviorSubject<Reportscategory[]> = new BehaviorSubject<Reportscategory[]>(
    []
  );
  UserId: String;

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,  public tokenStorage: TokenStorageService
    ) {
  

    }
    public assettype = `${this.serverUrl.apiServerAddress}app/loanreceivables/getassettype`;
    public debtorsname = `${this.serverUrl.apiServerAddress}app/loanreceivables/getdebtorsname`;
    public paymentreference = `${this.serverUrl.apiServerAddress}app/loanreceivables/getpaymentreference`;
    public accounttype = `${this.serverUrl.apiServerAddress}app/loanreceivables/getaccounttype`;
    public currency = `${this.serverUrl.apiServerAddress}app/loanreceivables/getcurrency`;
    public paymentstatus = `${this.serverUrl.apiServerAddress}app/loanreceivables/getpaymentstatus`;
    public receivablesreportListUrl = `${this.serverUrl.apiServerAddress}app/loanreceivables/getReceivablesreport`;
    get data(): Reportscategory[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }
  
}
