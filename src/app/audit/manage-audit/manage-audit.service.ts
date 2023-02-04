import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ManageAudit } from './manage-audit.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageAuditService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<ManageAudit[]> = new BehaviorSubject<ManageAudit[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService,
    private httpService: HttpServiceService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/getList`;
  public saveManageAuditMaster = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/save`;
  public editManageAuditMaster = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/edit`;
  public updateManageAuditMaster = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/update`;
  public deleteManageAuditMaster = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/delete`;
  
  get data(): ManageAudit[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllList(): void {
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }
    this.subs.sink = this.httpService.post<any>(this.getAllMasters,obj).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.manageAuditList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addManageAudit(ManageAudit: ManageAudit): Observable<any> {
    return this.httpClient.post<ManageAudit>(this.saveManageAuditMaster, ManageAudit);
  }

  editManageAudit(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editManageAuditMaster, obj);
  }

  updateManageAudit(ManageAudit: ManageAudit): Observable<any> {
    return this.httpClient.post<ManageAudit>(this.updateManageAuditMaster, ManageAudit);
  }

  deleteManageAudit(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteManageAuditMaster, obj);
  }

}
