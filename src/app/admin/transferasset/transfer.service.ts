import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TraansferService } from './transfer-model';
import { transferResultBean } from './transfer-result-bean';

@Injectable({
  providedIn: 'root'
})
export class TransferService extends UnsubscribeOnDestroyAdapter {
 
  isTblLoading = true;
  dataChange: BehaviorSubject<TraansferService[]> = new BehaviorSubject<TraansferService[]>(
    []
  );
  dialogData:any;
  getAllcodeList: any;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) { 
  super();

  }
  private save = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/save`;
  public addCreditFiles = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/uploadFile`;
  public transferListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/gettrasferList`;
  public locationserviceUrl= `${this.serverUrl.apiServerAddress}api/auth/app/transfer/getlocationList`;
  private getAlltransfer=`${this.serverUrl.apiServerAddress}api/auth/app/transfer/getList`;
  public editTransfer =`${this.serverUrl.apiServerAddress}api/auth/app/transfer/edit`;
  public updateTransfer =`${this.serverUrl.apiServerAddress}api/auth/app/transfer/update`;
  public deleteTransfer =`${this.serverUrl.apiServerAddress}api/auth/app/transfer/delete`;
  public codeserviceUrl=`${this.serverUrl.apiServerAddress}api/auth/app/transfer/getcodeList`;
  public transferCodeAll = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/gettransferCodelist`;

  get data(): TraansferService[] {
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
  addtransfer(traansferService:TraansferService): void {
    this.dialogData = traansferService;  
    this.httpService.post<TraansferService>(this.save,traansferService ).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  transferUpdate(traansferService: TraansferService): void {
    this.dialogData = traansferService;
    this.httpService.post<TraansferService>(this.updateTransfer, traansferService).subscribe(data => {
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
