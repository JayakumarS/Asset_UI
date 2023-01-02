import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Itsupport } from "./it-support.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class Itsupportservice extends UnsubscribeOnDestroyAdapter {
   
  
    isTblLoading = true;
    dataChange: BehaviorSubject<Itsupport[]> = new BehaviorSubject<Itsupport[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
    data: any;
    constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService) {
      super();
    }

    getItList(){
        
    }
}