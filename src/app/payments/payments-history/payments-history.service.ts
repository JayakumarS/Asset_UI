import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID  } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Payments } from "../payments.model";
import { isPlatformBrowser } from '@angular/common';
import { PaymentsHistoryResultBean } from "../payments-history-result-bean";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { PaymentHistoryList } from "./payment-history-list/payment-history-list.model";
function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsHistoryService extends UnsubscribeOnDestroyAdapter{

  DeleteauditComponent: string;
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  dataChange: BehaviorSubject<Payments[]> = new BehaviorSubject<Payments[]>([]);
  
  dialogData:any;
  // constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,@Inject(PLATFORM_ID) private platformId: object) { 
  // super();
  // }

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }


  private getPaymentHistory = `${this.serverUrl.apiServerAddress}api/auth/app/paymentHistory/getPaymentHistory`;
  public getPaidBillPrint = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/billPayment/getPaidBillPrint`;

  get data(): Payments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

 

getPaymentsHistory(): void {
    this.subs.sink = this.httpService.get<PaymentsHistoryResultBean>(this.getPaymentHistory).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.payementHistoryList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

}