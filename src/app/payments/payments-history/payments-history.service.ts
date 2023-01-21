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

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService) {
    super();
  }


  private getPaymentHistory = `${this.serverUrl.apiServerAddress}api/auth/app/paymentHistory/getPaymentHistory`;


  get data(): Payments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  // get nativeWindow(): any {
  //   if (isPlatformBrowser(this.platformId)) {
  //     return _window();
  //   }
  // }


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