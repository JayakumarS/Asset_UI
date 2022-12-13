import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TraansferService } from './transfer-model';

@Injectable({
  providedIn: 'root'
})
export class TransferService extends UnsubscribeOnDestroyAdapter {
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
  isTblLoading = true;
  dataChange: BehaviorSubject<TraansferService[]> = new BehaviorSubject<TraansferService[]>(
    []
  );
  
  dialogData:any;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) { 
  super();

  }
  private save = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/save`;
  public addFiles = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/uploadFile`;
  public transferListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/transfer/gettrasferList`;
  public locationserviceUrl= `${this.serverUrl.apiServerAddress}api/auth/app/transfer/getlocationList`;



  get data(): TraansferService[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  addtransfer(traansferService:TraansferService): void {
    this.dialogData = traansferService;  
    this.httpService.post<TraansferService>(this.save,traansferService ).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
}
