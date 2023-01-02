import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ManageAudit} from "./manage-audit.model";


@Injectable({
  providedIn: 'root'
})
export class ManageAuditServiceService extends UnsubscribeOnDestroyAdapter{

  DeleteauditComponent: string;
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  dataChange: BehaviorSubject<ManageAudit[]> = new BehaviorSubject<ManageAudit[]>([]);
  
  dialogData:any;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) { 
  super();

  }

  private getList = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/list`;
  public save = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/save`;
  public auditFieldListUrl= `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/auditFieldList`;
  public categoryUrl= `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/categoryList`;
  public locationUrl= `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/locationList`;
  public departmentUrl= `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/departmentList`; 
  public edit = `${this.serverUrl.apiServerAddress}api/auth/app/audit/manageaudit/edit`;
  private Deleteauditlist = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/delete`;
  private AuditUpdatelist = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/update`;
  public addAssetUploadFiles = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/auditUpload`;


  get data(): ManageAudit[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  saveaudit(addaudit:ManageAudit): void {
    this.dialogData = addaudit;  
    this.httpService.post<ManageAudit>(this.save,addaudit ).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  getAllList(): void {

    this.subs.sink = this.httpService.get<any>(this.getList).subscribe(
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

  DeleteAudit(id: any): void {
    this.httpService.get(this.Deleteauditlist+"?id="+id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  AuditUpdate(addaudit: ManageAudit): void {
    this.dialogData = addaudit;
    this.httpService.post<ManageAudit>(this.AuditUpdatelist, addaudit).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

}
