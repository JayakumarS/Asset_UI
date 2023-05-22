import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Reportscategory } from '../reports-model';

@Injectable({
  providedIn: 'root'
})
export class MutualfundReportService  extends  UnsubscribeOnDestroyAdapter{
  dataChange: any;
  dialogData: any;
 
  
   constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,  public tokenStorage: TokenStorageService)
   { 
    super();
   }
   //public mutualfundList = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getmutualfundList`;
   public mutualfundListUrl = `${this.serverUrl.apiServerAddress}app/mutualfund/getmutualfundList`;
   public mutualfundListExcelUrl = `${this.serverUrl.apiServerAddress}app/mutualfund/excelExport`;
   
   public getfundType = `${this.serverUrl.apiServerAddress}app/mutualfund/getfundType`;
   public getinvestmentMethod = `${this.serverUrl.apiServerAddress}app/mutualfund/getinvestmentMethod`;
   public getpaymentMethod = `${this.serverUrl.apiServerAddress}app/mutualfund/getpaymentMethod`;
   public getmodeOfInvestment = `${this.serverUrl.apiServerAddress}app/mutualfund/getmodeOfInvestment`;
 
   get data(): Reportscategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
}
