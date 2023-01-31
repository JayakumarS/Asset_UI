import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { DepartmentMaster } from "./department-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { DepartmentMasterResultBean } from './department-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentMasterService extends UnsubscribeOnDestroyAdapter {

  
  isTblLoading = true;
  dataChange: BehaviorSubject<DepartmentMaster[]> = new BehaviorSubject<DepartmentMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  companyId: string;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/department/getList`;
  private saveDepartment = `${this.serverUrl.apiServerAddress}api/auth/app/department/save`;
  public editDepartment = `${this.serverUrl.apiServerAddress}api/auth/app/department/edit`;
  public updateDepartment = `${this.serverUrl.apiServerAddress}api/auth/app/department/update`;
  public deleteDepartment = `${this.serverUrl.apiServerAddress}api/auth/app/department/delete`;
  public validateDepartmentCodeUrl = `${this.serverUrl.apiServerAddress}api/auth/app/department/validateUniqueDepartmentCode`;
   public getAdminDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/department/getAdminDropdown`;
 // public getAdminDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAdminDropdown`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
  public getBranchDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/department/getBranchDropdown`;

  public getCompanyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/department/getCompanyDropdown`;



  get data(): DepartmentMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    this.companyId=this.tokenStorage.getCompanyId();   
        this.subs.sink = this.httpService.get<DepartmentMasterResultBean>(this.getAllMasters+"?companyId="+this.companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.departmentMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  // For Save
  addDepartment(DepartmentMaster: DepartmentMaster): void {
    this.dialogData = DepartmentMaster;  
    this.httpService.post<DepartmentMaster>(this.saveDepartment, DepartmentMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  departmentUpdate(departmentMaster: DepartmentMaster): void {
    this.dialogData = departmentMaster;
    this.httpService.post<DepartmentMaster>(this.updateDepartment, departmentMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  // departmentDelete(deptCode: any): void {
  //   this.httpService.get(this.deleteDepartment+"?departmentMaster="+deptCode).subscribe(data => {
  //     console.log(deptCode);
  //     },
  //     (err: HttpErrorResponse) => {
  //        // error code here
  //     }
  //   );
  //   /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
  //     console.log(id);
  //     },
  //     (err: HttpErrorResponse) => {
  //        // error code here
  //     }
  //   );*/
  // }
 
}
