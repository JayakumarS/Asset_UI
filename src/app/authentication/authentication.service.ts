import { Injectable } from '@angular/core';
import { Authentication } from './authentication-model';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { BehaviorSubject,Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { serverLocations } from '../auth/serverLocations';
import { HttpServiceService } from '../auth/http-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistrationPopupComponent } from './registration-popup/registration-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends UnsubscribeOnDestroyAdapter {

  

  isTblLoading = true;
  dataChange: BehaviorSubject<Authentication[]> = new BehaviorSubject<Authentication[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  UserId: string;
  RoleId: string;

  constructor(private httpClient: HttpClient,public dialog: MatDialog, private serverUrl: serverLocations,private snackBar:MatSnackBar,
    private httpService: HttpServiceService,private router: Router,private spinner: NgxSpinnerService,
    ) { 
    super();
  }

  public saveCompany = `${this.serverUrl.apiServerAddress}api/auth/app/company/saveCompanySignUp`;
  public saveIndividual = `${this.serverUrl.apiServerAddress}api/auth/app/individual/saveForm`;
  public saveAuditor = `${this.serverUrl.apiServerAddress}api/auth/app/individual/saveAuditorForm`;

  get data(): Authentication[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  addCompanySignUp(authentication,router): void {
    this.dialogData = authentication;
    this.spinner.show();
    this.httpService.post<any>(this.saveCompany, authentication).subscribe(data => {
      console.log(data);
      if(data.success){
        this.spinner.hide();

        // this.showNotification(
        //   "snackbar-success",
        //   "Company Registered Successfully. Your login credentials are sent to the provided email id.",
        //   "bottom",
        //   "center"
        // );
        const dialogRef = this.dialog.open(RegistrationPopupComponent, {
          height: "60%",
          width: "50%",
        });
        this.router.navigate(["/authentication/signin"]);
      }
      
     else{
      this.showNotification(
        "snackbar-danger",
        "Company Registration Unsuccessful!!!",
        "bottom",
        "center"
      );
    }
    
        // router.navigate(['/master/company/listCompany']);
     
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  addAuditorSignUp(authentication,router): void {
    this.dialogData = authentication;
    this.spinner.show();
    this.httpService.post<any>(this.saveAuditor, authentication).subscribe(data => {
      console.log(data);
      if(data.success){
        this.spinner.hide();

        // this.showNotification(
        //   "snackbar-success",
        //   "Auditor Registered Successfully. Your login credentials are sent to the provided email id.",
        //   "bottom",
        //   "center"
        // );
        const dialogRef = this.dialog.open(RegistrationPopupComponent, {
          height: "60%",
          width: "50%",
        });
        
        this.router.navigate(["/authentication/signin"]);
      }
      
     else{
      this.showNotification(
        "snackbar-danger",
        "Auditor Registration Unsuccessful!!!",
        "bottom",
        "center"
      );
    }
    
        // router.navigate(['/master/company/listCompany']);
     
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  addIndividualSignUp(authentication,router): void {
    this.dialogData = authentication;
    this.spinner.show();
    this.httpService.post<any>(this.saveIndividual, authentication).subscribe(data => {
      console.log(data);
      if(data.success){
        this.spinner.hide();

        // this.showNotification(
        //   "snackbar-success",
        //   "Individual Registered Successfully. Your login credentials are sent to the provided email id.",
        //   "bottom",
        //   "center"
        // );
        // this.router.navigate(["/authentication/signin"]);

        const dialogRef = this.dialog.open(RegistrationPopupComponent, {
          height: "60%",
          width: "50%",
        });
        this.router.navigate(["/authentication/signin"]);
      }
      
     else{
      this.showNotification(
        "snackbar-danger",
        "Individual Registration Unsuccessful!!!",
        "bottom",
        "center"
      );
    }
    
        // router.navigate(['/master/company/listCompany']);
     
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
