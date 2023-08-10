import { Injectable } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from "src/app/core/models/user";
import { Company } from '../master/company-employees/company-employees-model';
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const AUTHUSERID_KEY = 'AuthUserId';
const POPUPFLAG_KEY = 'PopUpFlag';
const AUTHCOMPANYID = 'AuthCompanyId';
const AUTHCOMPANYTEXT= 'AuthCompanyText';
const AUTHBRANCHTEXT= 'AuthBranchText';
const AUTHROLEID = 'AuthRoleId';
const AUTHROLETEXT= 'AuthRoleText';
const AUTHCOMPANIES = 'AuthCompanies';
const AUTHROLES = 'AuthRoles';
const AUTHBRANCHID = 'AuthBranchId';
const ACTIVECOMPANY_KEY = 'ActiveCompanyFlag';
const ACTIVESUBSCRIPTION_KEY = 'ActiveSubscriptionFlag';


const COMPANYLOGO_KEY = 'AuthCompanyLogo';
const AUTHCOMPANIESAUDITOR = 'AuthCompaniesAuditor';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor(private authService:AuthService) { }

  nullValue:any;
  signOut() {
    window.sessionStorage.clear();
    this.authService.currentUserSubject = new BehaviorSubject<User>(new User());
    this.authService.currentUser = new BehaviorSubject<User>(new User());
    window.sessionStorage.removeItem(USERNAME_KEY);
  }



  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

public saveUserId(userId: string) {
    window.sessionStorage.removeItem(AUTHUSERID_KEY);
    window.sessionStorage.setItem(AUTHUSERID_KEY, userId);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
public getUserId(): string {
    return sessionStorage.getItem(AUTHUSERID_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public savepopUpFlag(flag: string) {
    window.sessionStorage.removeItem(POPUPFLAG_KEY);
    window.sessionStorage.setItem(POPUPFLAG_KEY, flag);
  }

  public getSavepopUpFlag(): string {
    return sessionStorage.getItem(POPUPFLAG_KEY);
  }
  
  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: string) => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }

  public saveCompanyId(companyId) {

    window.sessionStorage.removeItem(AUTHCOMPANYID);
    window.sessionStorage.setItem(AUTHCOMPANYID, companyId);
  }


  public getCompanyId() {
    
    this.nullValue = sessionStorage.getItem(AUTHCOMPANYID)  

    if(this.nullValue != "null")
    {
      return sessionStorage.getItem(AUTHCOMPANYID);

    }
    else
    {
       sessionStorage.setItem("AuthCompanyId","0");
       return sessionStorage.getItem(AUTHCOMPANYID);

    }

  }
   
  
  public saveCompanyText(companyText) {
    window.sessionStorage.removeItem(AUTHCOMPANYTEXT);
    window.sessionStorage.setItem(AUTHCOMPANYTEXT, companyText);
  }
  public getCompanyText() {
    return sessionStorage.getItem(AUTHCOMPANYTEXT);
  }

  public getBranchText() {
    return sessionStorage.getItem(AUTHBRANCHTEXT);
  }

  public saveRoleId(roleId) {
    window.sessionStorage.removeItem(AUTHROLEID);
    window.sessionStorage.setItem(AUTHROLEID, roleId);
  }
  public getRoleId() {
    return sessionStorage.getItem(AUTHROLEID);
  }

  public saveRoleText(roleText) {
    window.sessionStorage.removeItem(AUTHROLETEXT);
    window.sessionStorage.setItem(AUTHROLETEXT, roleText);
  }
  public getRoleText() {
    return sessionStorage.getItem(AUTHROLETEXT);
  }

  public saveRoles(roles) {
    window.sessionStorage.removeItem(AUTHROLES);
    window.sessionStorage.setItem(AUTHROLES, JSON.stringify(roles));
  }

  public getRoles() {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      return sessionStorage.getItem(AUTHROLES);
    }
  }
  public saveCompanies(companies) {
    window.sessionStorage.removeItem(AUTHCOMPANIES);
    window.sessionStorage.setItem(AUTHCOMPANIES, JSON.stringify(companies));
  }

  public saveCompaniesAuditor(companies) {
    window.sessionStorage.removeItem(AUTHCOMPANIESAUDITOR);
    window.sessionStorage.setItem(AUTHCOMPANIESAUDITOR, JSON.stringify(companies));
  }

  public getCompanies() {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      return sessionStorage.getItem(AUTHCOMPANIES);
    }
  }

  public getCompaniesAuditor() {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      return sessionStorage.getItem(AUTHCOMPANIESAUDITOR);
    }
  }

  public saveBranchId(branchId) {
    window.sessionStorage.removeItem(AUTHBRANCHID);
    window.sessionStorage.setItem(AUTHBRANCHID, branchId);
  }
  public getBranchId() {
    return sessionStorage.getItem(AUTHBRANCHID);
  }
  
  public saveActiveCompanyFlag(flag: string) {
    window.sessionStorage.removeItem(ACTIVECOMPANY_KEY);
    window.sessionStorage.setItem(ACTIVECOMPANY_KEY, flag);
  }

  public saveActiveSubscriptionFlag(flag: string) {
    window.sessionStorage.removeItem(ACTIVESUBSCRIPTION_KEY);
    window.sessionStorage.setItem(ACTIVESUBSCRIPTION_KEY, flag);
  }

  public getActiveSubscriptionFlag(): string {
    return sessionStorage.getItem(ACTIVESUBSCRIPTION_KEY);
  }

  public getActiveCompanyFlag(): string {
    return sessionStorage.getItem(ACTIVECOMPANY_KEY);
  }

  public saveCompanyLogo(token: string) {
    window.sessionStorage.removeItem(COMPANYLOGO_KEY);
    window.sessionStorage.setItem(COMPANYLOGO_KEY, token);
  }

  public getCompanyLogo(): string {
    return sessionStorage.getItem(COMPANYLOGO_KEY);
  }
}
