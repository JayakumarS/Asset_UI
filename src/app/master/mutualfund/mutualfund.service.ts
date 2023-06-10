import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Fund } from './mutualfund-model';
import { FundResultBean } from './mutualfund-resultbean ';
@Injectable({
  providedIn: 'root'
})
export class MutualFundService  extends UnsubscribeOnDestroyAdapter{
  
  isTblLoading = true;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Fund[]> = new BehaviorSubject<Fund[]>(
    []
  );
  RoleId: string;
  companyId:String;
  
  dialogData:any;
  
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

   private save = `${this.serverUrl.apiServerAddress}app/mutualfund/save`;
   private getList= `${this.serverUrl.apiServerAddress}app/mutualfund/listNew`;
   private edit = `${this.serverUrl.apiServerAddress}app/mutualfund/edit`;
   private update= `${this.serverUrl.apiServerAddress}app/mutualfund/update`; 
   public deletefd= `${this.serverUrl.apiServerAddress}app/mutualfund/delete`; 
   private saveProfileAll = `${this.serverUrl.apiServerAddress}api/auth/app/individual/saveProfile`;
   public getProfileDetails = `${this.serverUrl.apiServerAddress}api/auth/app/individual/getProfile`;
   public getCompletionCount = `${this.serverUrl.apiServerAddress}api/auth/app/individual/getCompletionCount`;

   // For Vehicle Report
   public getvehicletypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getvehicletypeList`;
   public getfueltypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getfueltypeList`;
   public getbodytypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getbodytypeList`;
   public getownertypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getownertypeList`;
   public getinsurancetypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getinsurancetypeList`;
   public getvehiclewheelList = `${this.serverUrl.apiServerAddress}app/vehicle/getvehiclewheelList`;
   public getregisternoList = `${this.serverUrl.apiServerAddress}app/vehicle/getregisternoList`;
   public getenginenoList = `${this.serverUrl.apiServerAddress}app/vehicle/getenginenoList`;
   public VehicleListUrl = `${this.serverUrl.apiServerAddress}app/vehicle/getVehicleList`;
   public VehicleListExcelUrl = `${this.serverUrl.apiServerAddress}app/vehicle/excelExport`;

    // For FD Report 
    public fdHistoryListUrl = `${this.serverUrl.apiServerAddress}app/fixeddeposit/getfdHistoryList`;
    public fdHistoryListExcelUrl = `${this.serverUrl.apiServerAddress}app/fixeddeposit/excelExport`;
    public getautoRenewalList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/autoRenewalList`;
    public getinvestmentTermList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/investmentTermList`;
    public getfixeddeposittypeList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/fixeddeposittypeList`;
    public getcurrencyList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/currencyList`;
    public getfrequencyList = `${this.serverUrl.apiServerAddress}app/fixeddeposit/frequencyList`;

   get data(): Fund[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
   getfundList(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<FundResultBean>(this.getList+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.fundList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }
 
  savefund(fund,router,notificationService) {
    this.dialogData = fund;
    this.httpService.post<any>(this.save, fund).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );

        if(window.sessionStorage.getItem("mutualFrom")=="mutual"){
          window.sessionStorage.setItem("mutualFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("mutualFrom")=="normal"){
          window.sessionStorage.setItem("mutualFrom","");
          router.navigate(['/master/mutualfund/list-fund']);
        } else {
          router.navigate(['/master/mutualfund/list-fund']);
        }
       // router.navigate(['/master/mutualfund/list-fund']);
        
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

  saveProfile(profile,router,notificationService) {
    this.dialogData = profile;
    this.httpService.post<any>(this.saveProfileAll, profile).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
    var userId=this.tokenStorage.getCompanyId();
    window.sessionStorage.setItem("TabFromInd","");
    window.sessionStorage.setItem("propFrom", "");
    window.sessionStorage.setItem("vehicleFrom","");
    window.sessionStorage.setItem("jewelFrom","");
    window.sessionStorage.setItem("fixedFrom","");
    window.sessionStorage.setItem("mutualFrom","");
    window.sessionStorage.setItem("loanFrom","");
    window.sessionStorage.setItem("receivableFrom","");
    router.navigate(['master/multiple/allMaster/'+userId]);

       // router.navigate(['/master/mutualfund/list-fund']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }
  saveProfile1(profile,notificationService) {
    this.dialogData = profile;
    this.httpService.post<any>(this.saveProfileAll, profile).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
  
        location.reload()

      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }
  editfund(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }

  updatefund(fund,router,notificationService) {
    this.dialogData = fund;
    this.httpService.post<any>(this.update, fund).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );

        if(window.sessionStorage.getItem("mutualFrom")=="mutual"){
          window.sessionStorage.setItem("mutualFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("mutualFrom")=="normal"){
          window.sessionStorage.setItem("mutualFrom","");
          router.navigate(['/master/mutualfund/list-fund']);
        } else {
          router.navigate(['/master/mutualfund/list-fund']);
        }
        //router.navigate(['/master/mutualfund/list-fund']);

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

  deletefund(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletefd, obj);
  }
}
  
  



