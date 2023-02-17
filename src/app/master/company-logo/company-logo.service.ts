import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CompanyLogo } from './companyLogo.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyLogoService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<CompanyLogo[]> = new BehaviorSubject<CompanyLogo[]>(
    []
  );

  dialogData: any;

  constructor(private httpClient: HttpClient,
              private serverUrl: serverLocations,
              private httpService: HttpServiceService,
              private router: Router) {
    super();
  }
  public addLogoFiles = `${this.serverUrl.apiServerAddress}app/companyLogo/uploadFile`;
  public addBgFiles = `${this.serverUrl.apiServerAddress}app/companyLogo/uploadFile`;
  public saveCompany = `${this.serverUrl.apiServerAddress}app/companyLogo/save`;
  public companyList = `${this.serverUrl.apiServerAddress}api/auth/getCompany`;


  addCompany(companyLogo: CompanyLogo, notificationService: NotificationService): void {
    this.dialogData = companyLogo;
    this.httpService.post<CompanyLogo>(this.saveCompany, companyLogo).subscribe(data => {
      console.log(data);
      if (data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        this.router.navigate(["/admin/dashboard/main"]);
        notificationService.showNotification(
          "snackbar-danger",
          "Please Logout and Login In Again !!!",
          "bottom",
          "center"
        );
      }
      else if (data.success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Error in Save... Please try again !!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {

    });
  }
}
