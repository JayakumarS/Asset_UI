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



   get data(): CityMaster[] {
    return this.dataChange.value;
  }

  addCompany(cityMaster,router): void {
    this.dialogData = cityMaster;
    this.httpService.post<any>(this.saveMaster, cityMaster).subscribe(data => {
      console.log(data);
    
        router.navigate(['']);
     
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  getAllList(){
    this.subs.sink = this.httpService.get<CityResultBean>(this.getCityList).subscribe(
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

