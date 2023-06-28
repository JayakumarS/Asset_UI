import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Bday } from './birthday-reminder-model';

@Injectable({
  providedIn: 'root'
})
export class BirthdayReminderService extends UnsubscribeOnDestroyAdapter{
 UserId: string;
 dialogData:Bday;
 Success:boolean;
 dataChange: BehaviorSubject<Bday[]> = new BehaviorSubject<Bday[]>(
  []
  );
  isTblLoading = true;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) 
  {
    super();
  
  }
private save = `${this.serverUrl.apiServerAddress}app/birthday-reminder/save`;

get data():Bday[]{
  return this.dataChange.value;

}
savebday(bday,router,notificationService){
  this.dialogData = bday;
  this.httpService.post<any>(this.save, bday).subscribe(data => {
    console.log(data);
    if(data.success=true){
      notificationService.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
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
  
}
