import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { InterCompanyTransferApprove } from "./inter-company-transfer-approve.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { InterCompanyTransferApproveResultBean } from './inter-company-transfer-approve-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InterCompanyTransferApproveService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<InterCompanyTransferApprove[]> = new BehaviorSubject<InterCompanyTransferApprove[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getInterCompanyTransferApprove = `${this.serverUrl.apiServerAddress}api/auth/app/intercompanytransfer/getList`;
   get data(): InterCompanyTransferApprove[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCurrency(): void {
        this.subs.sink = this.httpService.get<InterCompanyTransferApproveResultBean>(this.getInterCompanyTransferApprove).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.lInterCompanyPettyCashTransfer);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
}
