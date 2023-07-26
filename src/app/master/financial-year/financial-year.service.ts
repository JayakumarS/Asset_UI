import { Injectable } from '@angular/core';
import { FinancialYear } from './financial-year-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FinancialYearResultBean } from './financial-result.bean';

@Injectable({
  providedIn: 'root'
})
export class FinancialYearService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dialogData: FinancialYear;
  Success:boolean;
    dataChange: BehaviorSubject<FinancialYear[]> = new BehaviorSubject<FinancialYear[]>(
      []
    );
  financialYear:FinancialYear;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) {
    super();
   }
   public addfinancialyear = `${this.serverUrl.apiServerAddress}app/financialYear/save`;
   public FYList = `${this.serverUrl.apiServerAddress}app/financialYear/List`;
   public editFY = `${this.serverUrl.apiServerAddress}app/financialYear/edit`;
   public update = `${this.serverUrl.apiServerAddress}app/financialYear/update`;
   public delete = `${this.serverUrl.apiServerAddress}app/financialYear/delete`;
   public ValidateFinancialYr = `${this.serverUrl.apiServerAddress}app/financialYear/validateFY`;

  get data(): FinancialYear[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  addfinancialYear(financialYear,router,notificationService): void {
    this.dialogData = financialYear;  
    this.httpService.post<any>(this.addfinancialyear, financialYear).subscribe(data => {
    console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Added record successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['master/financial/listFinancial']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not ADDED, "+data.message,
          "bottom",
          "center"
        );
      }
    },
      (err: HttpErrorResponse) => {
        
    });
  }
  edit(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editFY, obj);
  }
  deletefY(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.delete, obj);
  }
 
  getlist(){
    
    this.subs.sink = this.httpService.get<FinancialYearResultBean>(this.FYList+"?companyId="+this.tokenStorage.getCompanyId()).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.listForFY);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }
 

  updateFY(financialYear,router,notificationService){
    this.dialogData = financialYear;
    this.httpService.post<any>(this.update, financialYear).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated record successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['master/financial/listFinancial']);

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
  
}
