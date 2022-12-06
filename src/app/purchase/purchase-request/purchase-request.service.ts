import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PurchaseRequestResultBean } from './purchase-request-result-bean';
import { PurchaseRequest } from './purchase-request.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService extends UnsubscribeOnDestroyAdapter{
  
  isTblLoading = true;
  dataChange: BehaviorSubject<PurchaseRequest[]> = new BehaviorSubject<PurchaseRequest[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient:HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) { 
    super();
  }
  private getAllPurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/getList`;
  private savePurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/save`;
  public editPurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/edit`;
  public updatePurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/update`;
  public deletePurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/delete`;
 
  get data(): PurchaseRequest[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */ 
  getAllList(): void {
    this.subs.sink = this.httpService.get<PurchaseRequestResultBean>(this.getAllPurchase).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.purchaseRequestDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addPurchase(purchaseRequest: PurchaseRequest): void {
    this.dialogData = purchaseRequest;
    /*  this.httpClient.post(this.API_URL, employees).subscribe(data => {
      this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
    this.httpService.post<PurchaseRequest>(this.savePurchase, purchaseRequest).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  UpdatePurchase(purchaseRequest: PurchaseRequest): void {
    this.dialogData = purchaseRequest;
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  this.httpService.post<PurchaseRequest>(this.updatePurchase, purchaseRequest).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
  }
  DeletePurchase(requisitionId:any): void {
    this.httpService.get(this.deletePurchase+"?purchaseRequest="+requisitionId).subscribe(data => {
    console.log(requisitionId);
      // this.httpClient.delete(this.API_URL + id).subscribe(data => {
      // console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  
}
