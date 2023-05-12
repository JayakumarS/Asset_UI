import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Loan } from './loan-receivables.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { loanreceivablesResultBean } from './loan-receivables-result-bean';

@Injectable({
  providedIn: 'root'
})
export class LoanReceivablesService extends UnsubscribeOnDestroyAdapter{
  
  editState(obj: { editId: any; }) {
    throw new Error('Method not implemented.');
  }

  isTblLoading = true;
  dialogData: Loan;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Loan[]> = new BehaviorSubject<Loan[]>(
    []
  );

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) { 
    super();
  }

  public savereceive = `${this.serverUrl.apiServerAddress}app/loanreceivables/save`; 
  public list = `${this.serverUrl.apiServerAddress}app/loanreceivables/getList`;
  public edit = `${this.serverUrl.apiServerAddress}app/loanreceivables/editlist`;
  public update = `${this.serverUrl.apiServerAddress}app/loanreceivables/update`;
  public delete = `${this.serverUrl.apiServerAddress}app/loanreceivables/delete`;
  public getJewelleryList = `${this.serverUrl.apiServerAddress}app/loanreceivables/jewelleryList`;
  public getVehicleList = `${this.serverUrl.apiServerAddress}app/loanreceivables/vehicleList`;
  get data(): Loan[] {
    return this.dataChange.value;
  }
  
  getList(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<loanreceivablesResultBean>(this.list+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.loanList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }
  
  // DeleteReceivables(obj: any): Observable<any> {
  //   return this.httpClient.post<any>(this.delete, obj);
  // }

  editlist(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }

  saveReceivble(loan,router,notificationService){
    this.dialogData = loan;
    this.httpService.post<any>(this.savereceive, loan).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("receivableFrom")=="receivable"){
          window.sessionStorage.setItem("receivableFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("receivableFrom")=="normal"){
          window.sessionStorage.setItem("receivableFrom","");
          router.navigate(['/master/loan-receivables/list-receivables']);
        }
       // router.navigate(['/master/loan-receivables/list-receivables']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Added!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  updateReceivble(loan,router,notificationService){
    this.dialogData = loan;
    this.httpService.post<any>(this.update, loan).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );

        if(window.sessionStorage.getItem("receivableFrom")=="receivable"){
          window.sessionStorage.setItem("receivableFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("receivableFrom")=="normal"){
          window.sessionStorage.setItem("receivableFrom","");
          router.navigate(['/master/loan-receivables/list-receivables']);
        }
        //router.navigate(['/master/loan-receivables/list-receivables']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Added!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  DeleteReceivables(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.delete, obj);
  }

}
