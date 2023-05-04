import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Vehicle } from './vehicle-model';
import { VehicleResultBean } from './vehicle-resultbean';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dialogData: Vehicle;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>(
    []
  );
  RoleId: string;
  companyId:String;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

  private getList = `${this.serverUrl.apiServerAddress}app/vehicle/getList`;
  private save = `${this.serverUrl.apiServerAddress}app/vehicle/save`;
  public edit= `${this.serverUrl.apiServerAddress}app/vehicle/edit`;
  public update = `${this.serverUrl.apiServerAddress}app/vehicle/update`;
  public deletev = `${this.serverUrl.apiServerAddress}app/vehicle/delete`;
  public saveMultiple = `${this.serverUrl.apiServerAddress}app/vehicle/saveMultiple`;
  public multipleUpload = `${this.serverUrl.apiServerAddress}app/vehicle/multipleUpload`;
  

  get data(): Vehicle[] {
    return this.dataChange.value;
  }

  getAllList(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<VehicleResultBean>(this.getList+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.vList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  addLine(lineMaster,router,notificationService) {
    this.dialogData = lineMaster;
    this.httpService.post<any>(this.save, lineMaster).subscribe(data => {
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

  savevehicle(vehicle,router,notificationService) {
    this.dialogData = vehicle;
    this.httpService.post<any>(this.save, vehicle).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/vehicle/list-vehicle']);
        
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

  editvehicle(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }

  updatevehicle(vehicle,router,notificationService) {
    this.dialogData = vehicle;
    this.httpService.post<any>(this.update, vehicle).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/vehicle/list-vehicle']);
       
        
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
  
  deletevehicle(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletev, obj);
  }
}



