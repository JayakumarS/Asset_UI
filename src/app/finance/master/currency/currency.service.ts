import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CurrencyMaster } from "./currency.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CurrencyResultBean } from './currency-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<CurrencyMaster[]> = new BehaviorSubject<CurrencyMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getCurrency = `${this.serverUrl.apiServerAddress}api/auth/app/currency/getList`;
  private saveCurrency = `${this.serverUrl.apiServerAddress}api/app/currency/save`;
  get data(): CurrencyMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCurrency(): void {
        this.subs.sink = this.httpService.get<CurrencyResultBean>(this.getCurrency).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.lCurrencyBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addCurrency(currencyMaster: CurrencyMaster): void {
    this.dialogData = currencyMaster;
    this.httpService.post<CurrencyMaster>(this.saveCurrency, currencyMaster).subscribe(data => {
      console.log(data);
       },
      (err: HttpErrorResponse) => {
    });
  }
  updateCurrency(currencyMaster: CurrencyMaster): void {
    this.dialogData = currencyMaster;
  }
  deleteCurrency(id: number): void {
    console.log(id);
  }
}
