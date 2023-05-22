import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoanReportService extends UnsubscribeOnDestroyAdapter {
  

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
  }
  public loanholder = `${this.serverUrl.apiServerAddress}app/otherdebits/getloanholderdd`;
  public loanrefference = `${this.serverUrl.apiServerAddress}app/otherdebits/getloanrefdd`;
  public loantype = `${this.serverUrl.apiServerAddress}app/otherdebits/getloantypedd`;
  public currency = `${this.serverUrl.apiServerAddress}app/otherdebits/getcurrencydd`;
  public bankname = `${this.serverUrl.apiServerAddress}app/otherdebits/getbanknamedd`;
  public bankifsc = `${this.serverUrl.apiServerAddress}app/otherdebits/getbankifscdd`;
  public loanHistoryListUrl = `${this.serverUrl.apiServerAddress}app/otherdebits/getloanHistoryListUrl`;
  public loanHistoryListExcelUrl = `${this.serverUrl.apiServerAddress}app/otherdebits/exportListExcel`;
  
  
}
