import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AccountHeadMaster } from "./account-head.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AccountHeadMasterResultBean } from './account-head-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountHeadMasterService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<AccountHeadMaster[]> = new BehaviorSubject<AccountHeadMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAccountHeadMaster = `${this.serverUrl.apiServerAddress}api/auth/app/accounthead/getList`;
  private saveAccountHeadMaster = `${this.serverUrl.apiServerAddress}api/app/accounthead/save`;
  get data(): AccountHeadMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllAccountHead(): void {
        this.subs.sink = this.httpService.get<AccountHeadMasterResultBean>(this.getAccountHeadMaster).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.lAccountHeadMasterBeanBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addAccountHeadMaster(accountHeadMaster: AccountHeadMaster): void {
    this.dialogData = accountHeadMaster;
    this.httpService.post<AccountHeadMaster>(this.saveAccountHeadMaster, accountHeadMaster).subscribe(data => {
      console.log(data);
       },
      (err: HttpErrorResponse) => {
    });
  }
  updateEmployees(accountHeadMaster: AccountHeadMaster): void {
    this.dialogData = accountHeadMaster;
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteEmployees(id: number): void {
    console.log(id);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
