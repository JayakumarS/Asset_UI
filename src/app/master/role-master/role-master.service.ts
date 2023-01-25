import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { RoleMaster } from './role-master.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { RoleMasterResultBean } from './role-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleMasterService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<RoleMaster[]> = new BehaviorSubject<RoleMaster[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/roleMaster/getList`;
  public saveRoleMaster = `${this.serverUrl.apiServerAddress}api/auth/app/roleMaster/save`;
  public editRoleMaster = `${this.serverUrl.apiServerAddress}api/auth/app/roleMaster/edit`;
  public updateRoleMaster = `${this.serverUrl.apiServerAddress}api/auth/app/roleMaster/update`;
  public deleteRoleMaster = `${this.serverUrl.apiServerAddress}api/auth/app/roleMaster/delete`;
  
  get data(): RoleMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllRoleMasters(): void {
    this.subs.sink = this.httpService.get<RoleMasterResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.roleMasterList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addRole(roleMaster: RoleMaster): Observable<any> {
    return this.httpClient.post<RoleMaster>(this.saveRoleMaster, roleMaster);
  }

  editRole(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editRoleMaster, obj);
  }

  updateRole(roleMaster: RoleMaster): Observable<any> {
    return this.httpClient.post<RoleMaster>(this.updateRoleMaster, roleMaster);
  }

  deleteRole(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteRoleMaster, obj);
  }

}
