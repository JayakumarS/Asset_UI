import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BillOfOperation } from './boo.model';
import { BillOfOperationResultBean } from './boo-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BooService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<BillOfOperation[]> = new BehaviorSubject<BillOfOperation[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, 
    private serverUrl: serverLocations, 
    private httpService: HttpServiceService)
  {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/getList`;
  private saveBillOfOperation = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/save`;
  public billOfOperationNumber = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/getBooNo`;
  public billOfOperationList = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/getBooNoList`;
  public editBillOfOperation = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/edit`;
  public updateBillOfOperation = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/update`;
  public deleteBillOfOperation = `${this.serverUrl.apiServerAddress}api/auth/app/billOfOperation/delete`;

  get data(): BillOfOperation[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  getAllList(): void {
    this.subs.sink = this.httpService.get<BillOfOperationResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.billOfOperationDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  //This is for update
  billOfOperationUpdate(billOfOperation: BillOfOperation): void {
    this.dialogData = billOfOperation;
    this.httpService.post<BillOfOperation>(this.updateBillOfOperation, billOfOperation).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
    });
  }
  // This is for save
  addBillOfOperation(billOfOperation: BillOfOperation): void {
    this.dialogData = billOfOperation;
    this.httpService.post<BillOfOperation>(this.saveBillOfOperation, billOfOperation).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
    });
  }
  DeleteBillOfOperation(booNo: any): void {
    this.httpService.get(this.deleteBillOfOperation+"?billOfOperation="+booNo).subscribe(data => {
      console.log(booNo);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
