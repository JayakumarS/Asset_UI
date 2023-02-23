import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { StateMaster } from './state-model';
import { StateResultBean } from './state-resultbean';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService  extends UnsubscribeOnDestroyAdapter{
  
  dataChange: BehaviorSubject<StateMaster[]> = new BehaviorSubject<StateMaster[]>(
    []
  );
  isTblLoading = true;
  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }
   private saveState = `${this.serverUrl.apiServerAddress}app/state/save`;
   private getStateList = `${this.serverUrl.apiServerAddress}app/state/list`;
   public editStateMaster = `${this.serverUrl.apiServerAddress}app/state/edit`;
   public updateStateMaster = `${this.serverUrl.apiServerAddress}app/state/update`;
   public deletestate = `${this.serverUrl.apiServerAddress}app/state/delete`;
   public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;


   get data(): StateMaster[] {
    return this.dataChange.value;
  }

   addCompany(stateMaster,router): void {
    this.dialogData = stateMaster;
    this.httpService.post<any>(this.saveState, stateMaster).subscribe(data => {
      console.log(data);
    
     
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  getAllList(){
    let companyId=this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<StateResultBean>(this.getStateList+"?companyId="+companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.stateList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  editState(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editStateMaster, obj);
  }
  updateState(obj: any): Observable<any> {
      return this.httpClient.post<any>(this.updateStateMaster, obj);
    
  }
  deleteCustomer(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletestate, obj);
  }
  
}
