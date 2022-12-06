import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { WorkOrder } from "./work-order.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { WorkOrderResultBean } from './work-order-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class WorkOrderService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<WorkOrder[]> = new BehaviorSubject<WorkOrder[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, 
    private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getList`;
  private saveWorkOrder = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/save`;
  public workOrderNumber = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getWorkOrderNumber`;
  public workOrderNoList = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getSalesOrderNoList`;
  public uomList = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getUomList`;
  public itemListUrl  = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getItemList`;
  public editWorkOrderHdr  = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/edit`;
  public updateWorkOrderHdr  = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/update`;
  public deleteWorkOrderHdr  = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/delete`;

  
  get data(): WorkOrder[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<WorkOrderResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.workOrderDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  addWorkOrder(workOrder: WorkOrder): void {
    this.dialogData = workOrder;
    this.httpService.post<WorkOrder>(this.saveWorkOrder, workOrder).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  //This is for update
  workOrderUpdate(workOrder: WorkOrder): void {
  this.dialogData = workOrder;
  this.httpService.post<WorkOrder>(this.updateWorkOrderHdr, workOrder).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
}

  workOrderDelete(workorderNo: any): void {
  this.httpService.get(this.deleteWorkOrderHdr+"?workOrder="+workorderNo).subscribe(data => {
    console.log(workorderNo);
    this.getAllList();
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
  
}

}
