import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PaymentsHistoryResultBean } from '../../payments-history-result-bean';
import { Payments } from '../../payments.model';
import { PaymentHistoryList } from './payment-history-list.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryListService extends UnsubscribeOnDestroyAdapter{

  DeleteauditComponent: string;
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  dataChange: BehaviorSubject<PaymentHistoryList[]> = new BehaviorSubject<PaymentHistoryList[]>([]);
  
  dialogData:any;
  // constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,@Inject(PLATFORM_ID) private platformId: object) { 
  // super();
  // }

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }


  private getBillPaymentList = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/billPayment/getBillPaymentList`;

  get data(): PaymentHistoryList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllPayments(): void {
    this.subs.sink = this.httpService.get<any>(this.getBillPaymentList).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.billPaidList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}




}
