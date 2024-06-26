import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ScheduledAudit } from './scheduledaudits-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScheduledauditsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<ScheduledAudit[]> = new BehaviorSubject<ScheduledAudit[]>([]);

  dialogData: any;
  roleId: string;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/scheduledAudit/getList`;
  public saveScheduledAudit = `${this.serverUrl.apiServerAddress}api/auth/app/scheduledAudit/save`;
  public editScheduledAudit = `${this.serverUrl.apiServerAddress}api/auth/app/scheduledAudit/edit`;
  public exportAuditPDF = `${this.serverUrl.apiServerAddress}api/auth/app/scheduledAudit/auditExportPdf`;


  get data(): ScheduledAudit[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllLists(): void {
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
      roleId: this.tokenStorage.getRoleId(),
      user_id: this.tokenStorage.getUserId(),
    emailId: this.tokenStorage.getUsername(),}
    this.roleId=this.tokenStorage.getRoleId();
    this.subs.sink = this.httpService.post<any>(this.getAllMasters, obj).subscribe(
      (data) => {
        this.isTblLoading = false;
        // if(this.roleId=='2') {
        //   data.scheduleAuditList=[];
        // }
        this.dataChange.next(data.scheduleAuditList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  exportPDFAudit(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.exportAuditPDF, obj);
  }

  addAudit(scheduledAudit: ScheduledAudit): Observable<any> {
    return this.httpClient.post<ScheduledAudit>(this.saveScheduledAudit, scheduledAudit);
  }

  editAudit(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editScheduledAudit, obj);
  }
}
