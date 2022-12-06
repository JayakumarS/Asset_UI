import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CustomerMaster } from "./customer-master.model";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { CustomerMasterResultBean }  from './customer-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerMasterService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<CustomerMaster[]> = new BehaviorSubject<CustomerMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/getList`;
  private saveCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/save`;
  public editCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/edit`;
  public updateCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/update`;
  private deleteCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/delete`;


  get data(): CustomerMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<CustomerMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.customerMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addCustomerMaster(customerMaster: CustomerMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<CustomerMaster>(this.saveCustomermaster, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  customerMasterUpdate(customerMaster: CustomerMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<CustomerMaster>(this.updateCustomermaster, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  customerMasterDelete(cusCode: any): void {
    this.httpService.get(this.deleteCustomermaster+"?customer="+cusCode).subscribe(data => {
      console.log(cusCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}
