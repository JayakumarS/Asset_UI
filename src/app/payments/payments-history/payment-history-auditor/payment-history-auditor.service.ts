import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PaymentHistoryAuditor } from './payment-history-auditor.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryAuditorService extends UnsubscribeOnDestroyAdapter{

  DeleteauditComponent: string;
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  totalAmountPaid = 0;
  amountPending = 0;
  actual = 0;
  now = new Date();
  currDate;
  currency;
  dataChange: BehaviorSubject<PaymentHistoryAuditor[]> = new BehaviorSubject<PaymentHistoryAuditor[]>([]);
  
  dialogData:any;
  // constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,@Inject(PLATFORM_ID) private platformId: object) { 
  // super();
  // }

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }


  public getAudpaymentHistoryList = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/billPayment/getAudpaymentHistoryList`;

  get data(): PaymentHistoryAuditor[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllPayments(userId): void {
    this.subs.sink = this.httpService.get<any>(this.getAudpaymentHistoryList+"?userId="+userId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.billPaidList);
     //   this.actual = data.actualAmount;
     //   this.totalAmountPaid = data.totalAmount;
        this.currency = data.currencySymbol;
        this.amountPending = data.pendingAmount;
        this.currDate= this.now.toLocaleDateString();
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}




}
