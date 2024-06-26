import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID  } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Payments } from "../payments.model";
import { isPlatformBrowser } from '@angular/common';
function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPageService extends UnsubscribeOnDestroyAdapter{

  DeleteauditComponent: string;
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  dataChange: BehaviorSubject<Payments[]> = new BehaviorSubject<Payments[]>([]);
  
  dialogData:any;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,@Inject(PLATFORM_ID) private platformId: object) { 
  super();

  }

  public initiatePaymentUrl = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/Subscriptionpayment`;
  public paymentHistoryUrl = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/paymentHistory`;
  public verifyPromoCodeUrl = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/verifyPromoCode`;
  public getPromoCodePercent = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/getPromoCodePercent`;
  public getNoOfUsers = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/getNoOfUsers`;
  public updateRole =`${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/updateroletest`;
  public updateroleeNew = `${this.serverUrl.apiServerAddress}api/auth/app/subscription/payments/updateroleNew`;

 
  get data(): Payments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }
  updateroleNew(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.updateroleeNew, obj);
  }
}

