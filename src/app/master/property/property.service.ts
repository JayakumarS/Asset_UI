import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PropertyResultBean } from './property-result-bean';
import { Property } from './property-model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  //dialogData: Property;
  Success:boolean;
  UserId: string;
  dialogData: Property;
  dataChange: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>(
    []
  // dataChange: BehaviorSubject<[Property]> = new BehaviorSubject<Property[]>(
  //   []
  );
  RoleId: string;
  companyId:String;
  static branch: any;
  static lineCode: any;
  static lineDescription: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }
   private getList = `${this.serverUrl.apiServerAddress}app/property/getList`;
   private save = `${this.serverUrl.apiServerAddress}app/property/addProperty`;
   public edit = `${this.serverUrl.apiServerAddress}app/property/edit`;
   public update= `${this.serverUrl.apiServerAddress}app/property/update`;
   public deletePropertyUrl= `${this.serverUrl.apiServerAddress}app/property/delete`;

   get data(): Property[] {
    return this.dataChange.value;
  }
  

  getAllList(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<PropertyResultBean>(this.getList+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.plist);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }
  editprop(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }

  
  updateprop(property,router,notificationService) {
    this.dialogData = property;
    this.httpService.post<any>(this.update, property).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("propFrom")=="prop"){
          window.sessionStorage.setItem("propFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("propFrom")=="normal"){
          window.sessionStorage.setItem("propFrom","");
          router.navigate(['/master/property/list-property']);
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
  saveprop(property,notificationService) {
    this.dialogData = property;
    this.httpService.post<any>(this.save, property).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        
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

  propertyDelete(property: any,router,notificationService): void {
    this.httpService.get<any>(this.deletePropertyUrl+"?property="+property).subscribe(data => {
      if(data.success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Deleted Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
      else if(data.success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Related Data exist ...!!!",
          "bottom",
          "center"
        );
      }
  
      // this.getAllList();
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    
  }
  
}
