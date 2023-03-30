import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CityMaster } from './city-model';
import { CityResultBean } from './cityresultBean';

@Injectable({
  providedIn: 'root'
})
export class CityService  extends  UnsubscribeOnDestroyAdapter{
  isTblLoading = true;

  dataChange: BehaviorSubject<CityMaster[]> = new BehaviorSubject<CityMaster[]>(
    []
  );
  dialogData: CityMaster;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

   private saveMaster = `${this.serverUrl.apiServerAddress}app/city/save`;
   private editMaster = `${this.serverUrl.apiServerAddress}app/city/edit`;
   private updateMaster = `${this.serverUrl.apiServerAddress}app/city/update`;
   public deletecity= `${this.serverUrl.apiServerAddress}app/city/delete`;
   public getCityList = `${this.serverUrl.apiServerAddress}app/city/list`;
   public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;



   get data(): CityMaster[] {
    return this.dataChange.value;
  }

  addCompany(cityMaster,router,notificationService): void {
    this.dialogData = cityMaster;
    this.httpService.post<any>(this.saveMaster, cityMaster).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/cityMaster/listCity']);
        window.location.reload();

      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not ADDED, "+data.message,
          "bottom",
          "center"
        );
      }
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  // getAllList(){
  //   this.subs.sink = this.httpService.get<CityResultBean>(this.getCityList).subscribe(
  //     (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data.cityList);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + " " + error.message);
  //     }
  //   );
    
  // }

   /** CRUD METHODS */
   getAllList(object): void {
    
    this.subs.sink = this.httpService.post<CityResultBean>(this.getCityList,object).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.cityList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}

  editState(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editMaster, obj);
  }
  updateState(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.updateMaster, obj);
  }
  deleteCity(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletecity, obj);
  }
}


