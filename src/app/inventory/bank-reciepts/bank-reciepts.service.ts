import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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

    public companyListUrl = `${this.serverUrl.apiServerAddress}app/department/userBasedCompanyList`;
    public saveUrl = `${this.serverUrl.apiServerAddress}app/inventory/bankReceipt/save`;
    public getAlllist = `${this.serverUrl.apiServerAddress}app/inventory/bankReceipt/List`;
    public editbankReceipt = `${this.serverUrl.apiServerAddress}app/inventory/bankReceipt/edit`;
    public updateBankReceipt=`${this.serverUrl.apiServerAddress}app/inventory/bankReceipt/update`
    public deleteBankReceipt = `${this.serverUrl.apiServerAddress}app/inventory/bankReceipt/delete`;


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
          if(data.success==true){
            notificationService.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);
          }else {
            notificationService.showNotification(
              "snackbar-danger",
              "Please Fill The All Required fields",
              "bottom",
              "center"
            );
          }
          },
          (err: HttpErrorResponse) => {
            
        });
      }

      UpdateSalesQuote(bankReceipt: BankReceipt,router,notificationService): void {
        this.dialogData = bankReceipt;
       this.httpService.post<any>(this.updateBankReceipt,bankReceipt ).subscribe(data => {
        console.log(data);
        if(data.success===true){
          notificationService.showNotification(
            "snackbar-success",
            "Updated Record Successfully...!!!",
            "bottom",
            "center"
          );
          router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);
        }else{
          notificationService.showNotification(
            "snackbar-danger",
            "Not Updated Successfully...!!!",
            "bottom",
            "center"
          );
        }
        },
        (err: HttpErrorResponse) => {
          
      });
      }

      DeleteBankReceipt(bankReceipt:any,router,notificationService): void {
        this.httpService.get<BankReceipt>(this.deleteBankReceipt+"?bankReceipt="+bankReceipt).subscribe(data => {
        console.log(data);
        if(data.success===true){
          notificationService.showNotification(
            "snackbar-success",
            "Deleted Record Successfully...!!!",
            "bottom",
            "center"
          );
          router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);
        }
        else if(data.success===false){
          notificationService.showNotification(
            "snackbar-danger",
            "Error in delete...!!!",
            "bottom",
            "center"
          );
        }
          },
          (err: HttpErrorResponse) => {
             // error code here
          }
        );
      }
}