import { Injectable } from '@angular/core';
import { Deposit } from './fixed-deposit.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FixeddepositeResultBean } from './fixeddeposite-result-bean';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dialogData: Deposit;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Deposit[]> = new BehaviorSubject<Deposit[]>(
    []
  );
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
     private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }
   private getfdList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/getList`;
   public savedep = `${this.serverUrl.apiServerAddress}app/fixeddeposit/save`;
   public edit = `${this.serverUrl.apiServerAddress}app/fixeddeposit/edit`;
   public delete = `${this.serverUrl.apiServerAddress}app/fixeddeposit/delete`;
   public update=`${this.serverUrl.apiServerAddress}app/fixeddeposit/update`;
   
   get data(): Deposit[] {
     return this.dataChange.value;
   }

   getlist(){
    this.UserId=this.tokenStorage.getUserId();
    
    this.subs.sink = this.httpService.get<FixeddepositeResultBean>(this.getfdList+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.fdlist);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  
  savefd(lineMaster,router,notificationService) {
    this.dialogData = lineMaster;
    this.httpService.post<any>(this.savedep, lineMaster).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
      router.navigate(['/master/Fixed-deposit/list-fixed-deposit'])
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
  updateLine(Deposit,router,notificationService) {
    this.dialogData = Deposit;
    this.httpService.post<any>(this.update,Deposit).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/Fixed-deposit/list-fixed-deposit/'])
  
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  editfd(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }
  // delete(id: any): Observable<any> {
  //   return this.httpClient.post<any>(this.deletefd, id);
  // }

  deletefd(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.delete, obj);
  }
}
