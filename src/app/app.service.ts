import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from "src/app/core/models/user";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private name = new BehaviorSubject<string>('');
  public userRefId:string;
  constructor(private httpClient: HttpClient) { }
  

  SetName(name: string) {
    this.name.next(name);
  }

  SetUserRefId(userRefId: string){
    this.userRefId = userRefId;
  }
}
