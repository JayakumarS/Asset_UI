import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PaymentHistoryAdd } from './payment-history-add.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsHistoryAddService extends UnsubscribeOnDestroyAdapter{

  DeleteauditComponent: string;
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  dataChange: BehaviorSubject<PaymentHistoryAdd[]> = new BehaviorSubject<PaymentHistoryAdd[]>([]);
  
  dialogData:any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }


  public getAllPendingPayments = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/billPayment/getAllPendingPayments`;
  public savePaymentDetails = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/billPayment/saveBillPayments`;
  public getAuditorList = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/billPayment/getAuditorList`;

  get data(): PaymentHistoryAdd[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllPendingPayment(): void {
    this.subs.sink = this.httpService.get<any>(this.getAllPendingPayments).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.billPendingList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}




}

