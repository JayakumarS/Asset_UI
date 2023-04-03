import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Line } from './line-master.model';

@Injectable({
  providedIn: 'root'
})
export class LineMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: Line;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Line[]> = new BehaviorSubject<Line[]>(
    []
  );
  RoleId: string;
  companyId:String;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

  private getLineList = `${this.serverUrl.apiServerAddress}app/line/getLineList`;
  private saveLine = `${this.serverUrl.apiServerAddress}app/line/saveLine`;
  public editLineMaster = `${this.serverUrl.apiServerAddress}app/line/edit`;
  public updateLineMaster = `${this.serverUrl.apiServerAddress}app/line/update`;
  public saveMultiple = `${this.serverUrl.apiServerAddress}app/line/saveMultiple`;
  public multipleUpload = `${this.serverUrl.apiServerAddress}app/line/multipleUpload`;

  get data(): Line[] {
    return this.dataChange.value;
  }

  getAllList(){
    this.UserId=this.tokenStorage.getUserId();
    this.RoleId=this.tokenStorage.getRoleId();
    this.companyId= this.tokenStorage.getCompanyId(),
    this.subs.sink = this.httpService.get<Line>(this.getLineList+"?companyId="+this.companyId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.lineList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  addLine(lineMaster,router,notificationService) {
    this.dialogData = lineMaster;
    this.httpService.post<any>(this.saveLine, lineMaster).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("LineFrom")=="line"){
          window.sessionStorage.setItem("LineFrom","");
          router.navigate(['/master/company/addCompany/'+this.tokenStorage.getCompanyId()]);
          }else if(window.sessionStorage.getItem("LineFrom")=="normal"){
            window.sessionStorage.setItem("LineFrom","");
            router.navigate(['/master/line/listLine']);
          }
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Added!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  editLine(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editLineMaster, obj);
  }

  updateLine(lineMaster,router,notificationService) {
    this.dialogData = lineMaster;
    this.httpService.post<any>(this.updateLineMaster, lineMaster).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("LineFrom")=="line"){
          window.sessionStorage.setItem("LineFrom","");
          router.navigate(['/master/company/addCompany/'+this.tokenStorage.getCompanyId()]);
          }else if(window.sessionStorage.getItem("LineFrom")=="normal"){
            window.sessionStorage.setItem("LineFrom","");
            router.navigate(['/master/line/listLine']);
          }
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  addMultiple(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.saveMultiple, obj);
  }
}
