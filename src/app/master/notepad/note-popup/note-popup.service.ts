import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { note } from '../notepad-model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class NotePopupService {

  isTblLoading = true;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<note[]> = new BehaviorSubject<note[]>(
    []
  );
  RoleId: string;
  companyId:String;
  
  dialogData:any;

  public save= `${this.serverUrl.apiServerAddress}app/notepad/save`;
  // public getList= `${this.serverUrl.apiServerAddress}app/notepad/getList`;
  // public update = `${this.serverUrl.apiServerAddress}app/notepad/update`;
  public delete = `${this.serverUrl.apiServerAddress}app/notepad/delete`;




  constructor(private httpService: HttpServiceService, private serverUrl: serverLocations) { }

  saveNote(note,router,notificationService,) {
    this.dialogData = note;
    this.httpService.post<any>(this.save, note).subscribe(data => {
      console.log(data);
      if(data.Success){
        notificationService.showNotification(
          "snackbar-success",
          "Note Added Successfully...!!!",
          "bottom",
          "center"
        );
        location.reload()
       // router.navigate(['/master/mutualfund/list-fund']);   
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
