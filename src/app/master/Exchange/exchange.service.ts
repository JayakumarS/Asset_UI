import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ExchangeMaster } from './exchange-model';
import { ExchangeResultBean } from './exchange-result-bean';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends UnsubscribeOnDestroyAdapter {
 
  isTblLoading = true;
  currencyList: [];
  dataChange: BehaviorSubject<ExchangeMaster[]> = new BehaviorSubject<ExchangeMaster[]>(
    []
  );
  dialogData: any;
  companyId: any;
  RoleId: string;



  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }

  private saveExchange = `${this.serverUrl.apiServerAddress}app/exchangeMaster/save`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/exchangeMaster/getList`;
  public updateExchangeMaster = `${this.serverUrl.apiServerAddress}app/exchangeMaster/update`;
  public editExchangeMaster = `${this.serverUrl.apiServerAddress}app/exchangeMaster/edit`;
  public DeleteExchangeMaster = `${this.serverUrl.apiServerAddress}app/exchangeMaster/delete`;
  public validateExchangeNameURL = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
  public validateExchangeCodeURL = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

  get data(): ExchangeMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<ExchangeResultBean>(this.getAllMasters+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.exchangeMastersList);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  addExchange(exchangeMaster: ExchangeMaster): Observable<any> {
    return this.httpClient.post<ExchangeMaster>(this.saveExchange, exchangeMaster);
  }

  exchangeMasterUpdate(exchangeMaster: ExchangeMaster): void {
    this.dialogData = exchangeMaster;
    this.httpService.post<ExchangeMaster>(this.updateExchangeMaster, exchangeMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  // DeleteexchangeMaster(id: any,router,notificationService): void {
  //   this.httpService.get<ExchangeMaster>(this.deleteexchangeMaster+"?id="+id).subscribe(data => {
  //     console.log(id);
  //     if(data.Success == true){
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Deleted Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //       router.navigate(['/master/Activity-master/list-activity']);
  //     }
  //     else if(data.Success == false){
  //       notificationService.showNotification(
  //         "snackbar-danger",
  //         "Not Deleted Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }

  //     },
  //     (err: HttpErrorResponse) => {
  //     }
  //   );
  // }


  DeleteExchange(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.DeleteExchangeMaster, obj);
  }

}
