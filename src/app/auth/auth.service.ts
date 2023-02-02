import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from "src/app/core/models/user";
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {serverLocations} from './serverLocations'
import { HttpServiceService } from 'src/app/auth/http-service.service';
import {NavItem} from 'src/app/layout/matdynamicmenu/nav-items';
import { map } from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;
  constructor(private http: HttpClient,public serverURL: serverLocations,public httpService: HttpServiceService,) {
      this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

 private userObj = new User();

  loginUrl = `${this.serverURL.apiServerAddress}api/auth/signin`;
  signupUrl = `${this.serverURL.apiServerAddress}api/auth/signup`;
  getUserName = `${this.serverURL.apiServerAddress}api/auth/getUserName`;
  getFormPropertyMenuUrl = `${this.serverURL.apiServerAddress}api/auth/formProperty/getFormProperty`;
  insertCusMaster = `${this.serverURL.apiServerAddress}api/customerMaster/save`;
  getSuccessUserLogData = `${this.serverURL.apiServerAddress}api/auth/app/userLog/login_data_success_user_log`;

  // insertSalesEntry = `${this.serverURL.apiServerAddress}api/salesCallEntry/save`;

  attemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return  this.http
      .post<JwtResponse>(this.loginUrl, credentials)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user)
          if(user.success){
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.userObj['username'] = user.email;
            this.userObj['token'] = user.accessToken;
            this.userObj['roles'] = user.userDetails.roles;
            this.userObj["img"] = "assets/images/user/admin.jpg";
            this.userObj['role'] = user.userDetails.role;
            this.userObj['roleId'] = user.userDetails.roleId;
            this.userObj['company'] = user.userDetails.company;
            this.userObj['companyId'] = user.userDetails.companyId;
            this.userObj['branchId'] = user.userDetails.branchId;
            this.userObj['companies'] = user.userDetails.companies;
            this.currentUserSubject.next(this.userObj);
          }
          
          return user;
        })
      );
    //return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  getUserName1(emailId : string){
       return this.httpService.get(this.getUserName + '?getUserName=' + emailId);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getFormPropertyMenu(userId: string){
   // return this.http.post<NavItem>(this.getFormPropertyMenuUrl, userInfo);
    return this.httpService.get<NavItem>(this.getFormPropertyMenuUrl + '?userId=' + userId);
  }

  //user_log
  getSuccessuserLog(obj: any) {
    return this.http.post(this.getSuccessUserLogData, obj);
  }
  cusMaster(cusMasterData : any){
    return this.http.post(this.insertCusMaster,cusMasterData, httpOptions);
  }

 

  // salesCallEntry(salesEntryData : any){
  //   return this.http.post(this.insertSalesEntry,salesEntryData, httpOptions);
  // }

}

