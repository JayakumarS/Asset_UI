import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Company } from "./company-employees-model";
import { CompanyEmployeeResultBean } from "./company-employees-result-bean";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class CompanyEmployeeService extends UnsubscribeOnDestroyAdapter {

    isTblLoading = true;
    dataChange: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>(
      []
    );
  
    // Temporarily stores data from dialogs
    dialogData: any;
    UserId: string;
    constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService,
      private httpService: HttpServiceService) {
      super();
    }
    public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
    public saveCompany = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/saveCompanyEmp`;
    public getlist = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/getlist`;
    public editcategory = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/edit`;
    public deletecategory = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/delete`;
    public updatecompanyEmp = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/update`;
    public companyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/userBasedCompanyList`;
    public fetchBranch = `${this.serverUrl.apiServerAddress}api/auth/app/CompanyEmployee/userBasedBranchList`;
    
    
    
    
    
    
    get data(): Company[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }
    addCompany(company: Company): void {
      this.dialogData = company;
      this.httpService.post<Company>(this.saveCompany, company).subscribe(data => {
        console.log(data);
        //this.dialogData = employees;
        },
        (err: HttpErrorResponse) => {
          
      });
    }
    
    getAllList(): void {
      this.subs.sink = this.httpService.get<CompanyEmployeeResultBean>(this.getlist).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.companyEmoloyeeDetails);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  }
  
  CompanyEmpUpdate(company: Company,router,): void {
    this.dialogData = company;
    this.httpService.post<Company>(this.updatecompanyEmp, company).subscribe(data => {
      console.log(data);
      if(data.Success == true){
        
        router.navigate(['/master/category/list-category']);
      }
      else if(data.Success == false){
      
      }
      },
      (err: HttpErrorResponse) => {
        
    });
    
  }


  }