import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Reportscategory } from '../reports-model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositReportService extends UnsubscribeOnDestroyAdapter {  isTblLoading = true;
  dialogData: any;
  dataChange: BehaviorSubject<Reportscategory[]> = new BehaviorSubject<Reportscategory[]>(
    []
  );
  UserId: String;

  constructor( private httpClient: HttpClient,
    private serverUrl:serverLocations, private httpService:HttpServiceService,  
    public tokenStorage: TokenStorageService
   ) { 
    super();

    } 
  public fdHistoryListUrl = `${this.serverUrl.apiServerAddress}app/fixeddeposit/getfdHistoryList`;
   public fdHistoryListExcelUrl = `${this.serverUrl.apiServerAddress}app/fixeddeposit/excelExport`;
   public getautoRenewalList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/autoRenewalList`;
   public getinvestmentTermList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/investmentTermList`;
   public getfixeddeposittypeList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/fixeddeposittypeList`;
   public getcurrencyList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/currencyList`;
   public getfrequencyList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/frequencyList`;

   get data(): Reportscategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
}
