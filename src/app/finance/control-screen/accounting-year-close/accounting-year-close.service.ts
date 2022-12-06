import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AccountingYearClose } from "./accounting-year-close.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AccountingYearCloseResultBean } from './accounting-year-close-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountingYearCloseService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<AccountingYearClose[]> = new BehaviorSubject<AccountingYearClose[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAccountingYearClose = `${this.serverUrl.apiServerAddress}api/auth/app/accountingyearclose/getList`;
  private saveAccountingYearClose = `${this.serverUrl.apiServerAddress}api/app/accountingyearclose/save`;
  get data(): AccountingYearClose[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCurrency(): void {
        this.subs.sink = this.httpService.get<AccountingYearCloseResultBean>(this.getAccountingYearClose).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.list);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addCurrency(accountingYearClose: AccountingYearClose): void {
    this.dialogData = accountingYearClose;
    this.httpService.post<AccountingYearClose>(this.saveAccountingYearClose, accountingYearClose).subscribe(data => {
      console.log(data);
       },
      (err: HttpErrorResponse) => {
    });
  }
  updateCurrency(accountingYearClose: AccountingYearClose): void {
    this.dialogData = accountingYearClose;
  }
  deleteCurrency(id: number): void {
    console.log(id);
  }
}
