import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import {  Observable } from 'rxjs';
import { PrePlanCalendar } from './pre-plan-calendar.model';



@Injectable({
  providedIn: 'root'
})
export class PrePlanCalendarService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
    dialogData: PrePlanCalendar;
    Success:boolean;
    UserId: string;
    
    dataChange: BehaviorSubject<PrePlanCalendar[]> = new BehaviorSubject<PrePlanCalendar[]>(
      []
    );
  

  constructor(private httpClient:HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) { 
    super();
  }

  
  public getEventById = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/getEventById`;
  public editEventDetail = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/editEventDetail`;


  public getAllEvents = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/getpreplan`;
  public getEventId = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/getEventIdpreplan`;

  // public editdepMaster = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/editdep`;
  public savePrePlanCalendar = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/save`;
  public updatedprePlanCalendar = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/update`;
  public deleteprePlanCalendar = `${this.serverUrl.apiServerAddress}app/prePlanCalendar/deleteEventCal`;

  


  // editlist(obj: any): Observable<any> {
  //   return this.httpClient.post<any>(this.editdepMaster, obj);
  // }

  addPreplan(prePlanCalendar,router,notificationService){
    this.dialogData = prePlanCalendar;
    this.httpService.post<any>(this.savePrePlanCalendar, prePlanCalendar).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );

        if(window.sessionStorage.getItem("prePlanCalendar")=="loan"){
          window.sessionStorage.setItem("prePlanCalendar","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("prePlanCalendar")=="normal"){
          window.sessionStorage.setItem("prePlanCalendar","");
          router.navigate(['/master/prePlanCalendar/prePlanCalendar-list']);
        }

       // router.navigate(['/master/loan-otherdebits/list-otherdebits']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Added!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  updateprePlan(prePlanCalendar,router,notificationService) {
    this.dialogData = prePlanCalendar;
    this.httpService.post<any>(this.updatedprePlanCalendar, prePlanCalendar).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("prePlanCalendar")=="loan"){
          window.sessionStorage.setItem("prePlanCalendar","");
          router.navigate(['/master/prePlanCalendar/prePlanCalendar-list']);
        }else if(window.sessionStorage.getItem("prePlanCalendar")=="normal"){
          window.sessionStorage.setItem("prePlanCalendar","");
          router.navigate(['/master/prePlanCalendar/prePlanCalendar-list']);
        } else
        {
          router.navigate(['/master/prePlanCalendar/prePlanCalendar-list']);
        }
      //router.navigate(['/master/loan-otherdebits/list-otherdebits']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  deleteEvent(prePlanCalendar,router,notificationService) {
    this.dialogData = prePlanCalendar;
    this.httpService.post<any>(this.deleteprePlanCalendar, prePlanCalendar).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
    });
  }
}
