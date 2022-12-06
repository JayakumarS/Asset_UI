import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { BomModel } from "./bom.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { BomResultBean } from './bom-result-bean';
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


export class BomService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<BomModel[]> = new BehaviorSubject<BomModel[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, 
    private httpService: HttpServiceService) {
    super();
  }
  private getListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/getList`;
  private saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/save`;
  public workOrderNumber = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/getBomNumber`;
  public workOrderNoList = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/getWorkOrderList`;
  public uomList = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getUomList`;
  public editBillOfMaterial = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/edit`;
  public updateBillOfMaterial = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/update`;
  private deleteBillOfMaterial = `${this.serverUrl.apiServerAddress}api/auth/app/billofmaterial/delete`;

   get data(): BomModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<BomResultBean>(this.getListUrl).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.bomDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  save(bomModel: BomModel): void {
    this.dialogData = bomModel;
    this.httpService.post<BomModel>(this.saveUrl, bomModel).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  //This is for update
  billOfMaterialUpdate(bomModel: BomModel): void {
  this.dialogData = bomModel;
  this.httpService.post<BomModel>(this.updateBillOfMaterial, bomModel).subscribe(data => {
    console.log(data);
    },
    (err: HttpErrorResponse) => {
      
  });
}

billOfMaterialDelete(bomNo: any): void {
  this.httpService.get(this.deleteBillOfMaterial+"?billOfMaterial="+bomNo).subscribe(data => {
    console.log(bomNo);
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
}

}
