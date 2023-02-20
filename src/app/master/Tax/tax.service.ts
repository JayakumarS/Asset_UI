import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TaxMaster } from './tax-model';
import { TaxResultBean } from './tax-result-bean';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaxService extends UnsubscribeOnDestroyAdapter {
 
  isTblLoading = true;
  currencyList: [];
  dataChange: BehaviorSubject<TaxMaster[]> = new BehaviorSubject<TaxMaster[]>(
    []
  );
  dialogData: any;
  companyId: any;
  RoleId: string;



  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }

  private saveTax = `${this.serverUrl.apiServerAddress}app/taxMaster/save`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/taxMaster/getList`;
  public updateTaxMaster = `${this.serverUrl.apiServerAddress}app/taxMaster/update`;
  // private deleteTaxMaster = `${this.serverUrl.apiServerAddress}app/taxMaster/delete`;
  public editTaxMaster = `${this.serverUrl.apiServerAddress}app/taxMaster/edit`;
  public DeleteTaxMaster = `${this.serverUrl.apiServerAddress}app/taxMaster/delete`;
  public validateTaxNameURL = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
  public validateTaxCodeURL = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

  get data(): TaxMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<TaxResultBean>(this.getAllMasters+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.taxMastersList);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  addTax(statusMaster: TaxMaster): Observable<any> {
    return this.httpClient.post<TaxMaster>(this.saveTax, statusMaster);
  }

  taxMasterUpdate(taxMaster: TaxMaster): void {
    this.dialogData = taxMaster;
    this.httpService.post<TaxMaster>(this.updateTaxMaster, taxMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  // DeleteTaxMaster(id: any,router,notificationService): void {
  //   this.httpService.get<TaxMaster>(this.deleteTaxMaster+"?id="+id).subscribe(data => {
  //     console.log(id);
  //     if(data.Success == true){
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Deleted Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //       router.navigate(['/master/Activity-master/list-activity']);
  //     }
  //     else if(data.Success == false){
  //       notificationService.showNotification(
  //         "snackbar-danger",
  //         "Not Deleted Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }

  //     },
  //     (err: HttpErrorResponse) => {
  //     }
  //   );
  // }


  DeleteTax(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.DeleteTaxMaster, obj);
  }

}
