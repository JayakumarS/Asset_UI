import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Company } from './company-model';
import { CompanyResultBean } from './company-result-bean';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  UserId: string;
  RoleId: string;
  CompanyId: string;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private tokenStorage: TokenStorageService,
    private httpService: HttpServiceService,public notificationService :NotificationService ) {
      super();
     }

  private saveCompany = `${this.serverUrl.apiServerAddress}api/auth/app/company/save`;
  public deleteCompany = `${this.serverUrl.apiServerAddress}api/auth/app/company/delete`;
  //private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/company/getList`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/company/getNewList`;

  public updateCompany = `${this.serverUrl.apiServerAddress}api/auth/app/company/update`;
  //public editCompany = `${this.serverUrl.apiServerAddress}api/auth/app/company/edit`;

  public userBasedCompanyDDList = `${this.serverUrl.apiServerAddress}api/auth/app/company/userBasedCompanyDDList`;
  
  public fetchCompanyList= `${this.serverUrl.apiServerAddress}api/auth/app/company/fetchCompanyList`;
  // public editCompany = `${this.serverUrl.apiServerAddress}api/auth/app/company/edit`;
  public editCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/company/edit`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/company/validateUnique`;
  public uniqueValidateEmail = `${this.serverUrl.apiServerAddress}api/auth/app/company/validateUniqueEmail`;
  
  public getCompanyEnployee= `${this.serverUrl.apiServerAddress}api/auth/app/company/getcompanyEmployee`;

  public getPersonIncharge= `${this.serverUrl.apiServerAddress}api/auth/app/company/personIncharge`;


  get data(): Company[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  // addCompany(company,router): void {
  //   this.dialogData = company;
  //   this.httpService.post<any>(this.saveCompany, company).subscribe(data => {
  //     console.log(data);
  //       router.navigate(['/master/company/listCompany']);
  //          },
  //     (err: HttpErrorResponse) => {
        
  //   });
  // }

  addCompany(company: Company,router,notificationService): void {
    this.dialogData = company;
    this.httpService.post<Company>(this.saveCompany, company).subscribe((data:any) => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/company/listCompany']);
      }
      else if(data.Success=false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Added Successfully...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
    });
  }
  UpdateOrder(company: Company,router,notificationService,logoPathUrl): void {
    this.dialogData = company;
  this.httpService.post<Company>(this.updateCompany, company).subscribe(data => {
    console.log(data);
    if(data.Success=true){
      notificationService.showNotification(
        "snackbar-success",
        "Updated record successfully...!!!",
        "bottom",
        "center"
      );
      if (logoPathUrl != undefined && logoPathUrl != null && logoPathUrl != '') {
        if(this.tokenStorage.getRoleId()=='2'){
          this.tokenStorage.saveCompanyLogo(this.serverUrl.apiServerAddress+"asset_upload/"+logoPathUrl);
        }
        
      }
      window.history.back();
    }
    else if(data.Success=false){
      notificationService.showNotification(
        "snackbar-danger",
        "Not Updated...!!!",
        "bottom",
        "center"
      );
    }
    },
    (err: HttpErrorResponse) => {
      
  });
  }













//   getAllList(): void {
//     this.UserId=this.tokenStorage.getUserId();
//     this.RoleId=this.tokenStorage.getRoleId();


//     // this.subs.sink = this.httpService.get<CompanyResultBean>(this.getAllMasters+
//     //   "&UserId="+this.UserId+"&RoleId="+this.RoleId).subscribe(
//     //     (res:any) => {

//    this.subs.sink = this.httpService.get<CompanyResultBean>(this.getAllMasters+
//     "?UserId="+this.UserId+"&RoleId="+this.RoleId).subscribe(
//       (data) => {
//         this.isTblLoading = false;
//         this.dataChange.next(data.companyMasterDetails);
//       },
//       (error: HttpErrorResponse) => {
//         this.isTblLoading = false;
//         console.log(error.name + " " + error.message);
//       }
//     );
// }

getAllList(): void {
  this.CompanyId=this.tokenStorage.getCompanyId();
  this.RoleId=this.tokenStorage.getRoleId();
  this.UserId=this.tokenStorage.getUserId();

      this.subs.sink = this.httpService.get<CompanyResultBean>(this.getAllMasters
        +"?UserId="+this.UserId +"&RoleId="+this.RoleId +"&CompanyId="+this.CompanyId).subscribe(
        (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.companyMasterDetails);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}
editCompany(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.editCompanyMaster, obj);
}



}
