import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ScheduleAudit } from './scheduledaudits-model';

@Injectable({
  providedIn: 'root'
})
export class ScheduledauditsService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<ScheduleAudit[]> = new BehaviorSubject<ScheduleAudit[]>([]);
  
  dialogData:any;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,private tokenStorage: TokenStorageService) { 
  super();

  }
  public getList = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/list`;
  public edit = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/edit`;
  public scheduleedit = `${this.serverUrl.apiServerAddress}api/auth/app/audit/scheduled/edit`;
  public save = `${this.serverUrl.apiServerAddress}api/auth/app/audit/scheduled/save`;
  public editAudit = `${this.serverUrl.apiServerAddress}api/auth/app/audit/scheduled/editAudit`;
  public draftsave = `${this.serverUrl.apiServerAddress}api/auth/app/audit/scheduled/draftsave`;



  get data(): ScheduleAudit[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllLists(): void {
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }
    this.subs.sink = this.httpService.post<any>(this.getList,obj).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.auditDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  editAsset(obj: any): Observable<any> {

    return this.httpClient.post<any>(this.editAudit, obj);

  }

}
