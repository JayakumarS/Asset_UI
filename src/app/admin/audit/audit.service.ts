import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Auditresultbean } from "./audit-result-bean";
import { Addaudit, Aidaudit } from "./audit.model";

@Injectable({
    providedIn: 'root'
  })
  export class AuditService extends UnsubscribeOnDestroyAdapter{
    DeleteauditComponent: string;
    addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
      throw new Error('Method not implemented.');
    }
    isTblLoading = true;
    dataChange: BehaviorSubject<Addaudit[]> = new BehaviorSubject<Addaudit[]>(
      []
    );
    
    dialogData:any;
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) { 
    super();
  
    }
    private save = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/save`;
    // private auditfielslist = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/toppingList`;
    public activityserviceurl= `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/auditfield`;
    public categoryurl= `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/categoryfield`;
    public locationurl= `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/locationfield`;
    public depturl= `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/departmentfield`; 
    private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/getList`;
    public editDesignationMaster = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/edit`;
    private Deleteauditlist = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/delete`;
    private AuditUpdatelist = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/update`;
    public addAssetUploadFiles = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/auditUpload`;
    private saveAided = `${this.serverUrl.apiServerAddress}api/auth/app/manageaudit/saveAided`;
    get data(): Addaudit[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }

    saveauditAided(aidaudit:Aidaudit): void {
      this.dialogData = aidaudit;  
      this.httpService.post<Aidaudit>(this.saveAided,aidaudit ).subscribe(data => {
        console.log(data);
        //this.dialogData = employees;
        },
        (err: HttpErrorResponse) => {
          
      });
    } 

    saveaudit(addaudit:Addaudit): void {
      this.dialogData = addaudit;  
      this.httpService.post<Addaudit>(this.save,addaudit ).subscribe(data => {
        console.log(data);
        //this.dialogData = employees;
        },
        (err: HttpErrorResponse) => {
          
      });
    }
    getAllList(): void {

      this.subs.sink = this.httpService.get<Auditresultbean>(this.getAllMasters).subscribe(
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
    AuditUpdate(addaudit: Addaudit): void {
      this.dialogData = addaudit;
      this.httpService.post<Addaudit>(this.AuditUpdatelist, addaudit).subscribe(data => {
        console.log(data);
        //this.dialogData = employees;
        },
        (err: HttpErrorResponse) => {
          
      });
    }
  }