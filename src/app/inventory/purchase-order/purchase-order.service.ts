import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { PurchaseOrder } from './purchase-order-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { PurchaseOrderResultBean } from './purchase-order-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<PurchaseOrder[]> = new BehaviorSubject<PurchaseOrder[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseOrder/getList`;
  public savePurchaseOrderMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseOrder/save`;
  public editPurchaseOrderMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseOrder/edit`;
  public updatePurchaseOrderMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseOrder/update`;
  public deletePurchaseOrderMaster = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseOrder/delete`;


  get data(): PurchaseOrder[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllPurchaseOrders(): void {
    this.subs.sink = this.httpService.get<PurchaseOrderResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.purchaseOrderList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addPurchaseOrder(PurchaseOrderMaster: PurchaseOrder): Observable<any> {
    return this.httpClient.post<PurchaseOrder>(this.savePurchaseOrderMaster, PurchaseOrderMaster);
  }

  editPurchaseOrder(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editPurchaseOrderMaster, obj);
  }

  updatePurchaseOrder(drugInfoMaster: PurchaseOrder): Observable<any> {
    return this.httpClient.post<PurchaseOrder>(this.updatePurchaseOrderMaster, drugInfoMaster);
  }

  deletePurchaseOrder(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletePurchaseOrderMaster, obj);
  }

}
