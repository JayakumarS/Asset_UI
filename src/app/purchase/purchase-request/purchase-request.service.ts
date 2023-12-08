import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PurchaseRequestResultBean } from './purchase-request-result-bean';
import { PurchaseRequest } from './purchase-request.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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

  constructor(private httpClient:HttpClient, private serverUrl: serverLocations,
     private httpService: HttpServiceService,private tokenStorage: TokenStorageService) { 
    super();
  }
  private getAllPurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/getList`;
  private savePurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/save`;
  public editPurchaseRequest = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/edit`;
  public updatePurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/update`;
  public deletePurchase = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/delete`;  
  public getPurchaseRequestDetails = `${this.serverUrl.apiServerAddress}api/auth/app/purchaseRequest/getPrDetails`;


  get data(): PurchaseRequest[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */ 
  getAllList(): void {
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }
    this.subs.sink = this.httpService.post<any>(this.getAllPurchase,obj).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.purchaseRequestList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }


  addPurchase(purchaseRequest: PurchaseRequest): Observable<any> {
    return this.httpClient.post<PurchaseRequest>(this.savePurchase, purchaseRequest);
  }

  editPurchase(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editPurchaseRequest, obj);
  }


  UpdatePurchase(purchaseRequest: PurchaseRequest): Observable<any> {
    return this.httpClient.post<PurchaseRequest>(this.updatePurchase, purchaseRequest);
  }

  DeletePurchase(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletePurchase, obj);
  }



  getPrDetails(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.getPurchaseRequestDetails, obj);
  }

}
