import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TransferBean } from './transfer-model';
import { transferResultBean } from './transfer-result-bean';

@Injectable({
  providedIn: 'root'
})
export class TransferAssetService extends UnsubscribeOnDestroyAdapter {
 
  isTblLoading = true;
  dataChange: BehaviorSubject<TransferBean[]> = new BehaviorSubject<TransferBean[]>(
    []
  );
  dialogData:any;
  getAllcodeList: any;
  companyId: string;
  roleId: string;
  userName: any;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations,private token: TokenStorageService, private httpService:HttpServiceService) { 
  super();

  }
  private save = `${this.serverUrl.apiServerAddress}app/transfer/save`;
  public saveNew = `${this.serverUrl.apiServerAddress}app/transfer/saveNew`;
  public addCreditFiles = `${this.serverUrl.apiServerAddress}app/transfer/uploadFile`;
  public transferListUrl = `${this.serverUrl.apiServerAddress}app/transfer/gettrasferList`;
  public locationserviceUrl= `${this.serverUrl.apiServerAddress}app/transfer/getlocationList`;
  private getAlltransfer=`${this.serverUrl.apiServerAddress}app/transfer/getList`;
  public editTransfer =`${this.serverUrl.apiServerAddress}app/transfer/edit`;
  public updateTransfer =`${this.serverUrl.apiServerAddress}app/transfer/update`;
  public deleteTransfer =`${this.serverUrl.apiServerAddress}app/transfer/delete`;
  public updateStatus =`${this.serverUrl.apiServerAddress}app/transfer/updateStatus`;
  public codeserviceUrl=`${this.serverUrl.apiServerAddress}app/transfer/getcodeList`;
  public transferCodeAll = `${this.serverUrl.apiServerAddress}app/transfer/gettransferCodelist`;
  public getRequestDetails = `${this.serverUrl.apiServerAddress}app/transfer/getRequestDetails`;
  public checkRequestValidity = `${this.serverUrl.apiServerAddress}app/transfer/checkRequestValidity`;
  public getAlltransferNew=`${this.serverUrl.apiServerAddress}app/transfer/getListNew`;
  get data(): TransferBean[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
 
  getAllList(): void {
    this.subs.sink = this.httpService.get<transferResultBean>(this.getAlltransfer).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.transferDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}
getAllListNew(object): void {
  this.companyId=this.token.getCompanyId();
  this.roleId=this.token.getRoleId();
  this.userName=this.token.getUsername();

  console.log(this.companyId,this.roleId,this.userName)
  // this.subs.sink = this.httpService.get<transferResultBean>(this.getAlltransferNew+"?companyId="+this.companyId+"&roleId="+this.roleId+"&userName="+this.userName).subscribe(
    this.subs.sink = this.httpService.post<transferResultBean>(this.getAlltransferNew + "?companyId=" + this.companyId + "&roleId=" + this.roleId + "&userName=" + this.userName,object).subscribe(  
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data.transferDetails);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}
  addtransfer(traansferService:TransferBean): void {
    this.dialogData = traansferService;  
    this.httpService.post<TransferBean>(this.save,traansferService ).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  // addtransferNew(traansferService:TransferBean): Observable<any> {
  //   this.dialogData = traansferService;  
  //   this.httpService.post<TransferBean>(this.saveNew,traansferService ).subscribe(data => {
  //     console.log(data);
  //     },
  //     (err: HttpErrorResponse) => {
        
  //   });
  // }

  addtransferNew(traansferService: TransferBean): Observable<any> {
    return this.httpClient.post<TransferBean>(this.saveNew, traansferService);
  }

  transferUpdate(traansferService: TransferBean): void {
    this.dialogData = traansferService;
    this.httpService.post<TransferBean>(this.updateTransfer, traansferService).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  getAllCodeList(): void {
    this.subs.sink = this.httpService.get<transferResultBean>(this.transferCodeAll).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.transferDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}
}
