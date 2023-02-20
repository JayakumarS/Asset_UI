import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuditLogMasterResultBean } from './audit-log-result-bean';
import { AuditLogMaster } from './audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<AuditLogMaster[]> = new BehaviorSubject<AuditLogMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    ) {
    super();
  }
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/getList`;
  public userNameList = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/getUserName`;
  public formNameList = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/getFormName`;
  public getDetails = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/viewAudit`;
 


  get data(): AuditLogMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(object): void {
    
        this.subs.sink = this.httpService.post<AuditLogMasterResultBean>(this.getAllMasters,object).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.auditLogDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
}
