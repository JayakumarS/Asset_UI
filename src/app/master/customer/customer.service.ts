import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
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



  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private saveCoustomer = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/save`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/getCustomerList`;
  public editcustomer = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/edit`;
  public updatecustomer = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/update`;
  public deletecustomer = `${this.serverUrl.apiServerAddress}api/auth/app/customerMaster/delete`;
  // public saveContact = `${this.serverUrl.apiServerAddress}api/auth/customerMaster/save`;




  get data(): CustomerMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }




//   addCustomer(customerMaster:CustomerMaster): void{
//   this.dialogData = customerMaster;
//   this.httpService.post<CustomerMaster>(this.saveCoustomer, customerMaster).subscribe(data => {
//     console.log(data);
//     // this.dialogData = employees;
//   },
//     (err: HttpErrorResponse) => {

//     });
// }

// tslint:disable-next-line:no-shadowed-variable
addCustomer(customerMaster: CustomerMaster): Observable<any> {
  return this.httpClient.post<CustomerMaster>(this.saveCoustomer, customerMaster);
}

getAllList(): void {
  this.subs.sink = this.httpService.get<CustomerResultBean>(this.getAllMasters).subscribe(
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

updateCustomer(customerMaster: CustomerMaster): void {
  this.dialogData = customerMaster;
  this.httpService.post<CustomerMaster>(this.updatecustomer, customerMaster).subscribe(data => {
    console.log(data);

  });
}
deleteCustomer(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.deletecustomer, obj);
}




}




