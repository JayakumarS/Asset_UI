import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { VehicleMaster } from './vehicle-model';
import { VehicleResultBean } from './vehicle-resultbean'; 

@Injectable({
  providedIn: 'root'
})
export class VehicleService  extends UnsubscribeOnDestroyAdapter {
  isTblLoading: boolean;
  dialogData: any;
  UserId: string;
  dataChange:  BehaviorSubject<VehicleMaster[]> = new BehaviorSubject<VehicleMaster[]>(
    []
  );

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }

  private list = `${this.serverUrl.apiServerAddress}app/vehicle/getList`;
  private save = `${this.serverUrl.apiServerAddress}app/vehicle/save`;
  private edit = `${this.serverUrl.apiServerAddress}app/vehicle/edit`;
  private update = `${this.serverUrl.apiServerAddress}app/vehicle/update`;
  private delete = `${this.serverUrl.apiServerAddress}app/vehicle/delete`;



  get data(): VehicleMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
   /** CRUD METHODS */
   getAllList(): void {
    this.UserId=this.tokenStorage.getUserId();
        this.subs.sink = this.httpService.get<VehicleResultBean>(this.list+"?UserId="+this.UserId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.vList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}

savevehicle(vehicleMaster,router,notificationService){
  this.dialogData = vehicleMaster;
  this.httpService.post<any>(this.save, vehicleMaster).subscribe(data => {
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


updatevehicle(vehicleMaster,router,notificationService){
  this.dialogData = vehicleMaster;
  this.httpService.post<any>(this.update, vehicleMaster).subscribe(data => {
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
        "Not Added!!!",
        "bottom",
        "center"
      );
    }

    },
    (err: HttpErrorResponse) => {
      
  });
}

deletevehicle(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.delete, obj);
}
}
