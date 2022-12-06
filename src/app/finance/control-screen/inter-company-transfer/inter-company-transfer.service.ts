import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { InterCompanyTransfer } from "./inter-company-transfer.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { InterCompanyTransferResultBean } from './inter-company-transfer-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InterCompanyTransferService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<InterCompanyTransfer[]> = new BehaviorSubject<InterCompanyTransfer[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getInterCompanyTransfer = `${this.serverUrl.apiServerAddress}api/auth/app/intercompanytraansfr/getList`;
  private saveInterCompanyTransfer = `${this.serverUrl.apiServerAddress}api/app/intercompanytraansfr/save`;
  get data(): InterCompanyTransfer[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCurrency(): void {
        this.subs.sink = this.httpService.get<InterCompanyTransferResultBean>(this.getInterCompanyTransfer).subscribe(
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
  addCurrency(interCompanyTransfer: InterCompanyTransfer): void {
    this.dialogData = interCompanyTransfer;
    this.httpService.post<InterCompanyTransfer>(this.saveInterCompanyTransfer, interCompanyTransfer).subscribe(data => {
      console.log(data);
       },
      (err: HttpErrorResponse) => {
    });
  }
  updateCurrency(interCompanyTransfer: InterCompanyTransfer): void {
    this.dialogData = interCompanyTransfer;
  }
  deleteCurrency(id: number): void {
    console.log(id);
  }
}
