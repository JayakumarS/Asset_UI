import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CustomerMaster } from './customer-model';
import { CustomerResultBean } from './customer-result-bean';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  currencyList: [];
  dataChange: BehaviorSubject<CustomerMaster[]> = new BehaviorSubject<CustomerMaster[]>(
    []
  );
  dialogData: any;
  companyId: any;
  RoleId: string;



  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }

  private saveCoustomer = `${this.serverUrl.apiServerAddress}app/customerMaster/save`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/customerMaster/getCustomerList`;
  public editcustomer = `${this.serverUrl.apiServerAddress}app/customerMaster/edit`;
  public updatecustomer = `${this.serverUrl.apiServerAddress}app/customerMaster/update`;
  public deletecustomer = `${this.serverUrl.apiServerAddress}app/customerMaster/delete`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
  public getLocationDropdown = `${this.serverUrl.apiServerAddress}app/customerMaster/getLocationDropdown`;
  public locationemailDdList = `${this.serverUrl.apiServerAddress}app/customerMaster/locationemailDdList`;
  public getAuditor = `${this.serverUrl.apiServerAddress}app/customerMaster/getAuditor`;
  public multipleEmployeeUploadFiles = `${this.serverUrl.apiServerAddress}app/customerMaster/multipleEmployeeuploadExefile`;
  public saveMulitple = `${this.serverUrl.apiServerAddress}app/customerMaster/multipleSave`;


  get data(): CustomerMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


item(customerMaster: CustomerMaster): Observable<any> {
  return this.httpClient.post<CustomerMaster>(this.saveCoustomer, customerMaster);
}

getAllList(): void {
  this.companyId=this.tokenStorage.getCompanyId();
  this.RoleId=this.tokenStorage.getRoleId();
    if(this.RoleId=="1")
    {
      this.companyId = "1";
    }
  this.subs.sink = this.httpService.get<CustomerResultBean>(this.getAllMasters+"?companyId="+this.companyId+"&RoleId="+this.RoleId).subscribe(
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.customerDetails);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );

}
editCustomer(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.editcustomer, obj);
}

// updateCustomer(customerMaster: CustomerMaster): void {
//   this.dialogData = customerMaster;
//   this.httpService.post<CustomerMaster>(this.updatecustomer, customerMaster).subscribe(data => {
//     console.log(data);

//   });
// }

updateCustomer(customerMaster: CustomerMaster): Observable<any> {
  return this.httpClient.post<CustomerMaster>(this.updatecustomer, customerMaster);
}
deleteCustomer(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.deletecustomer, obj);
}

addMultiple(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.saveMulitple, obj);
}




}




