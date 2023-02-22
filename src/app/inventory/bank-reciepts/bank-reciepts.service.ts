import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { BankReceiptResultBean } from "./bank-reciepts-result-bean";
import { BankReceipt } from "./bank-reciepts.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class BankReceiptservice extends UnsubscribeOnDestroyAdapter {
    
    isTblLoading = true;
    dataChange: BehaviorSubject<BankReceipt[]> = new BehaviorSubject<BankReceipt[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
    bankReceipt: BankReceipt;
    constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
      super();
    }
    public saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/BankReceiptService/save`;
    public getAlllist = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/BankReceiptService/List`;
    companyListUrl
    get data(): BankReceipt[] {
        return this.dataChange.value;
      }
      getDialogData() {
        return this.dialogData;
      }
    
      getAllPurchaseOrders (): void {
        let companyid=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<BankReceiptResultBean>(this.getAlllist+"?companyid="+parseInt(companyid)).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.bankReceiptDtl);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
    
      }
    save(bankReceipt:BankReceipt,router,notificationService): void {
        this.dialogData = bankReceipt;  
        this.httpService.post<any>(this.saveUrl,bankReceipt ).subscribe(data => {
          console.log(data);
          if(data.success){
            notificationService.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);
          }
          else {
            notificationService.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "bottom",
              "center"
            );
          }
          },
          (err: HttpErrorResponse) => {
            
        });
      }
     
}