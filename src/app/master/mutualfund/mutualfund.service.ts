import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Fund } from './mutualfund-model';
import { FundResultBean } from './mutualfund-resultbean ';
@Injectable({
  providedIn: 'root'
})
export class MutualFundService  extends UnsubscribeOnDestroyAdapter{
  
  isTblLoading = true;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Fund[]> = new BehaviorSubject<Fund[]>(
    []
  );
  RoleId: string;
  companyId:String;
  
  dialogData:any;
  
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

   private save = `${this.serverUrl.apiServerAddress}app/mutualfund/save`;
   private getList= `${this.serverUrl.apiServerAddress}app/mutualfund/list`;
   private edit = `${this.serverUrl.apiServerAddress}app/mutualfund/edit`;
   private update= `${this.serverUrl.apiServerAddress}app/mutualfund/update`; 
   public deletefd= `${this.serverUrl.apiServerAddress}app/mutualfund/delete`; 

   get data(): Fund[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
   getfundList(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<FundResultBean>(this.getList+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.fundList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }
  savefund(fund,router,notificationService) {
    this.dialogData = fund;
    this.httpService.post<any>(this.save, fund).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/mutualfund/list-fund']);
        
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

  editfund(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }

  updatefund(fund,router,notificationService) {
    this.dialogData = fund;
    this.httpService.post<any>(this.update, fund).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/mutualfund/list-fund']);

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

  deletefund(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletefd, obj);
  }
}
  
  



