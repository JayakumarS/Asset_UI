import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { PurchaseInvoice } from './purchase-invoice.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { PurchaseInvoiceResultBean } from './purchase-invoice-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<PurchaseInvoice[]> = new BehaviorSubject<PurchaseInvoice[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseInvoice/getList`;
  public savePurchaseInvoiceMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseInvoice/save`;
  public editPurchaseInvoiceMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseInvoice/edit`;
  public updatePurchaseInvoiceMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseInvoice/update`;
  public deletePurchaseInvoiceMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseInvoice/delete`;
  
  get data(): PurchaseInvoice[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllPurchaseInvoices(): void {
    this.subs.sink = this.httpService.get<PurchaseInvoiceResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.purchaseInvoiceList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addPurchaseInvoice(PurchaseInvoiceMaster: PurchaseInvoice): Observable<any> {
    return this.httpClient.post<PurchaseInvoice>(this.savePurchaseInvoiceMaster, PurchaseInvoiceMaster);
  }

  editPurchaseInvoice(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editPurchaseInvoiceMaster, obj);
  }

  updatePurchaseInvoice(purchaseInvoice: PurchaseInvoice): Observable<any> {
    return this.httpClient.post<PurchaseInvoice>(this.updatePurchaseInvoiceMaster, purchaseInvoice);
  }

  deletePurchaseInvoice(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletePurchaseInvoiceMaster, obj);
  }

}
