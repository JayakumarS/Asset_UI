import { Injectable } from '@angular/core';
import { DiscardAsset } from './discard-asset-model';

import { BehaviorSubject,Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiscardAssetService  extends UnsubscribeOnDestroyAdapter  {


  isTblLoading = true;
  dataChange: BehaviorSubject<DiscardAsset[]> = new BehaviorSubject<DiscardAsset[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  discardAsset : DiscardAsset;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, 
    private httpService: HttpServiceService) { 
      super();
    }

// private saveDiscard = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/saveAsset`; 

private saveDiscard = `${this.serverUrl.apiServerAddress}api/auth/app/discardAsset/save`;

// addDiscard(discardAsset: DiscardAsset): Observable<any> {
//   return this.httpClient.post<DiscardAsset>(this.saveDiscard, discardAsset);
// }

addDiscard(discardAsset: DiscardAsset): void {
  this.dialogData = discardAsset;  
  this.httpService.post<DiscardAsset>(this.saveDiscard, discardAsset).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
}


}
