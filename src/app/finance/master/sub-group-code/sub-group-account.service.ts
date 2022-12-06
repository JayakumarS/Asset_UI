import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { SubGroupAccountMaster } from "./sub-group-account.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { SubGroupAccountResultBean } from './sub-group-account-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubGroupAccountService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<SubGroupAccountMaster[]> = new BehaviorSubject<SubGroupAccountMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getSubGroupAccountMaster = `${this.serverUrl.apiServerAddress}api/auth/app/subgroupacct/getList`;
  private saveSubGroupAccountMasterr = `${this.serverUrl.apiServerAddress}api/app/subgroupacct/save`;
  get data(): SubGroupAccountMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllAccountHead(): void {
        this.subs.sink = this.httpService.get<SubGroupAccountResultBean>(this.getSubGroupAccountMaster).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.objSubGroupAccountBeanBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addAccountHeadMaster(subGroupAccountMaster: SubGroupAccountMaster): void {
    this.dialogData = subGroupAccountMaster;
    this.httpService.post<SubGroupAccountMaster>(this.saveSubGroupAccountMasterr, subGroupAccountMaster).subscribe(data => {
      console.log(data);
       },
      (err: HttpErrorResponse) => {
    });
  }
  updateAccountHeadMaster(subGroupAccountMaster: SubGroupAccountMaster): void {
    this.dialogData = subGroupAccountMaster;
  }
  deleteAccountHeadMaster(id: number): void {
    console.log(id);
  }
}
