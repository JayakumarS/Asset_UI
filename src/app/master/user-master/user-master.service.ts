import { Injectable } from '@angular/core';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UserMaster } from "./user-master.model";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { BehaviorSubject, Observable } from "rxjs";
import { UserMasterResultBean } from './user-master-resultbean';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from 'src/app/auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserMasterService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<UserMaster[]> = new BehaviorSubject<UserMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  edit: string;
  update: string;
  userId:any;
  companyId:any
  get data(): UserMaster[] {
    return this.dataChange.value;
  }

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService)
  {
    super();
  }
  private getUserList = `${this.serverUrl.apiServerAddress}app/userMaster/getList`;
  private saveUserMaster = `${this.serverUrl.apiServerAddress}app/userMaster/save`;
  public editUserMaster = `${this.serverUrl.apiServerAddress}app/userMaster/edit`;
  public updateUserMaster = `${this.serverUrl.apiServerAddress}app/userMaster/update`;
  public deleteUserMaster = `${this.serverUrl.apiServerAddress}app/userMaster/delete`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/validateUnique`;
  public roleListUrl = `${this.serverUrl.apiServerAddress}app/userMaster/getRoleListDropdown`;
  public roleListAuditUrl = `${this.serverUrl.apiServerAddress}app/userMaster/getRoleListDropdownForAudit`;
  public companyListUrl = `${this.serverUrl.apiServerAddress}app/userMaster/userBasedCompanyList`;
  public fetchBranch = `${this.serverUrl.apiServerAddress}app/userMaster/userBasedBranchList`;
  public departmentListUrl = `${this.serverUrl.apiServerAddress}app/userMaster/getdepartmentListDropdown`;
  public departmentListAuditUrl = `${this.serverUrl.apiServerAddress}app/userMaster/getdepartmentListDropdownForAudit`;
  public reportingManUrl = `${this.serverUrl.apiServerAddress}app/userMaster/getReportingManList`;
  public primaryLocUrl = `${this.serverUrl.apiServerAddress}app/userMaster/getPrimaryLocList`;
  public locationDropdown = `${this.serverUrl.apiServerAddress}app/userMaster/locationDropdown`;
  public multipleUserUploadFiles = `${this.serverUrl.apiServerAddress}app/userMaster/multipleUseruploadExefile`;

  



  getAllList(userId:any): void {
    console.log();
    this.userId=this.tokenStorage.getUserId();
    this.companyId= this.tokenStorage.getCompanyId(),
    this.subs.sink = this.httpService.get<UserMasterResultBean>(this.getUserList + "?userId=" + userId+"&companyId="+this.companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.userMasterDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}
  editUser(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editUserMaster, obj);
  }
  // tslint:disable-next-line:no-shadowed-variable
  addUser(UserMaster: UserMaster): Observable<any> {
    return this.httpClient.post<UserMaster>(this.saveUserMaster, UserMaster);
  }

  updateUser(userMaster: UserMaster): Observable<any> {
    return this.httpClient.post<UserMaster>(this.updateUserMaster, userMaster);
  }
  userdelete(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteUserMaster, obj);
 }
}
