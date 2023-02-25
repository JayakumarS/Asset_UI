import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserGroupResultBean } from './user-resultbean';
import { UserGroupMaster } from './usergroup-model';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<UserGroupMaster[]> = new BehaviorSubject<UserGroupMaster[]>(
    []
  );
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, 
    private httpService: HttpServiceService) {
      super();
     }
     userId:string;
     companyId:String;

 public save = `${this.serverUrl.apiServerAddress}/app/userGroupMaster/save`;
  public editCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/company/edit`;
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/userGroupMaster/getList`;
  public editUserMaster = `${this.serverUrl.apiServerAddress}api/auth/app/userGroupMaster/edit`;
  public updateUserGroup = `${this.serverUrl.apiServerAddress}app/userGroupMaster/update`;
  public deleteUserGroup = `${this.serverUrl.apiServerAddress}app/userGroupMaster/delete`;
  public branchDropdown = `${this.serverUrl.apiServerAddress}app/userGroupMaster/getDropdown`;
  public getCompanyDropdown = `${this.serverUrl.apiServerAddress}app/userGroupMaster/getCompanyDropdown`;
  public getUserDropdown = `${this.serverUrl.apiServerAddress}app/userGroupMaster/getUserDropdown`;
  public getRoleDropdown = `${this.serverUrl.apiServerAddress}app/userGroupMaster/getRoleDropdown`;
  public userIdDropdown = `${this.serverUrl.apiServerAddress}app/userGroupMaster/userIdDropdown`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;


  get data(): UserGroupMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  editCompany(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editUserMaster, obj);
  }

  

getAllList():void{
   this.companyId=this.tokenStorage.getCompanyId();
   this.userId=this.tokenStorage.getUserId(),
    this.subs.sink = this.httpService.get<any>(this.getAllMasters+"?companyId="+this.companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.userGroupList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  update(userGroupMaster: UserGroupMaster): Observable<any> {
    return this.httpClient.post<UserGroupMaster>(this.updateUserGroup, userGroupMaster);
  }

  deleteusergroup(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteUserGroup, obj);
  }

  company(){

  }
  
}
