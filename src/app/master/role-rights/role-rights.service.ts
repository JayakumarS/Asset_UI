import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleRightsService extends UnsubscribeOnDestroyAdapter {
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations) {
    super();
  }

  public getRoleDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/getRoleDropdownList`;
  public getModuleDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/getModuleDropdownList`;
  public roleFormUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/getFormList`;
  public saveAndUpdateRoleRights = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/save`;

  roleRightsMasterAddUpdate(obj: any): Observable<any> {
    return  this.httpClient.post<any>(this.saveAndUpdateRoleRights, obj);
  }

}



